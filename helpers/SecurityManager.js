const crypto = require('crypto');
const axios = require('axios');
const UAParser = require('ua-parser-js');
const User = require('../models/User');

class SecurityManager {
    static generateDeviceFingerprint(req) {
        const ua = new UAParser(req.headers['user-agent']);
        const browserName = ua.getBrowser().name;
        const osName = ua.getOS().name;
        const deviceVendor = ua.getDevice().vendor;
        const ipAddress = req.ip;

        const fingerprint = `${browserName}|${osName}|${deviceVendor}|${ipAddress}`;
        return crypto.createHash('sha256').update(fingerprint).digest('hex');
    }

    static async getLocationFromIp(ipAddress) {
        try {
            const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
            const data = response.data;
            return `${data.city}, ${data.country_name}`;
        } catch (error) {
            console.error('Error fetching location:', error);
            return 'Unknown';
        }
    }

    static async isNewDeviceOrLocation(userId, req) {
        const user = await User.findById(userId);
        const fingerprint = this.generateDeviceFingerprint(req);
        const location = await this.getLocationFromIp(req.ip);

        return !user.loginHistory.history.some(
            login => login.fingerprint === fingerprint && login.location === location
        );
    }

    static async updateLoginHistory(userId, req) {
        const user = await User.findById(userId);
        const fingerprint = this.generateDeviceFingerprint(req);
        const location = await this.getLocationFromIp(req.ip);

        user.loginHistory.history.push({
            fingerprint,
            location,
            timestamp: new Date()
        });
        await user.save();
    }
}

module.exports = SecurityManager;