const jwtService = require("../services/jwtService");
const mailService = require("../services/mailService");
const path = require("path");

async function sendEmailVerification(id, email) {
    const token = jwtService.generateToken(id, Math.floor(Date.now() / 1000) + (30 * 60)); // exp in 30 min
    const link = `${process.env.APP_HOST}/api/auth/verify?token=${token}`;
    return await mailService.send(
        email,
        'Email Verification',
        path.join(__dirname, '../views/mail/verify-email.ejs'),
        {link}
    );
}

module.exports = sendEmailVerification;