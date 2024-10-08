const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function send(email, subject, view, data) {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: subject,
            html: await ejs.renderFile(view, data),
        });
        return {error: null};
    } catch (error) {
        return {error};
    }
}

module.exports = {send};