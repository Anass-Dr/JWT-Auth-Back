const jwtService = require("../services/jwtService");
const mailService = require("../services/mailService");
const path = require("path");

async function sendEmailVerification(id, email) {
    const token = jwtService.generateToken(id, 600);
    const link = `${process.env.APP_HOST}/api/auth/verify?token=${token}`;
    return await mailService.send(
        email,
        'Email Verification',
        path.join(__dirname, '../views/mail/verify-email.ejs'),
        {link}
    );
}

module.exports = sendEmailVerification;