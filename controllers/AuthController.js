const _ = require('lodash');
const path = require('path');
const User = require('../models/User');
const mailService = require('../services/mailService');
const jwtService = require("../services/jwtService");
const sendEmailVerification = require('../helpers/sendEmailVerification');
const getRedisClient = require('../config/redis');
const SMService = require('../services/SMService');

class AuthController {
    async register(req, res) {
        try {
            // Check for unique email and username
            const emailExists = await User.findOne({
                $or: [{email: req.body.email}, {username: req.body.username}]
            });
            if (emailExists) return res.status(400).json({message: 'Email or username already exists'});

            // Create new user
            const user = await User.create(_.pick(req.body, ['username', 'email', 'password', 'phone', 'address']));

            // Send email verification
            const emailSent = await sendEmailVerification(user._id, user.email);
            if (emailSent.error) return res.status(500).json({message: emailSent.error});
            res.status(201).json({message: 'User created successfully. Check your email for verification'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async verify (req, res) {
        try {
            const decoded = req.decoded;

            // Update user status
            const user = await User.findByIdAndUpdate(decoded.id, {isVerified: true}, {new: true});
            if (!user) return res.status(404).json({message: 'User not found'});
            res.status(200).json({message: 'Email verified successfully'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async login(req, res) {
        try {
            // Check if user exists
            const user = await User.findOne({email: req.body.email});
            if (!user) return res.status(404).json({message: 'email not found'});

            // Check if password is correct
            const validPassword = await user.comparePassword(req.body.password);
            if (!validPassword) return res.status(400).json({message: 'Invalid password'});

            // Check if user is verified
            if (!user.isVerified) {
                const emailSent = await sendEmailVerification(user._id, user.email);
                if (emailSent.error) return res.status(500).json({error: emailSent.error});
                return res.status(201).json({message: 'User not verified. Check your email for verification'});
            }
            res.status(200).json({message: "Login successful, choose a method to verify your account"});

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async sendOtp(req, res) {
        try {
            // ******** User email should added with JWT middleware
            const user = await User.findOne({email: req.body.email});
            if (!user) return res.status(404).json({message: 'User not found'});
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            const redis = await getRedisClient();
            await redis.set(otp, user._id.toString(), 'EX', 60 * 5); // 5 minutes

            if (req.body.method === 'email') {
                const emailSent = await mailService.send(
                    user.email,
                    'OTP Verification',
                    path.join(__dirname, '../views/mail/verify-otp.ejs'),
                    {otp}
                );
                if (emailSent.error) return res.status(500).json({error: emailSent.error});
            } else {
                const smsSent = await SMService.send("+212610089595", `Your OTP is ${otp}`);
            }
            res.status(200).json({message: 'OTP sent successfully'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async verifyOtp(req, res) {
        try {
            const redis = await getRedisClient();
            const userId = await redis.get(req.body.otp);
            if (!userId) return res.status(400).json({message: 'Invalid or expired OTP'});
            await redis.del(req.body.otp);
            const token = jwtService.generateToken(userId, Math.floor(Date.now() / 1000) + (60 * 60));
            res.status(200).json({token});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new AuthController();