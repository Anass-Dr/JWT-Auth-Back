const _ = require('lodash');
const path = require('path');
const User = require('../models/User');
const mailService = require('../services/mailService');

class AuthController {
    async register(req, res) {
        try {
            // Check for unique email and username
            const emailExists = await User.findOne({
                $or: [{email: req.body.email}, {username: req.body.username}]
            });
            if (emailExists) return res.status(400).json({message: 'Email or username already exists'});

            // Create new user
            await User.create(_.pick(req.body, ['username', 'email', 'password', 'phone', 'address']));

            // Send email verification
            const link = `${process.env.APP_HOST}/api/auth/verify?token=`;
            const emailSent = await mailService.send(
                req.body.email,
                'Email Verification',
                path.join(__dirname, '../views/mail/verify-email.ejs'),
                link);
            if (emailSent.error) return res.status(500).json({message: emailSent.error});
            res.status(201).json({message: 'User created successfully. Check your email for verification'});
        } catch (error) {
            res.status(500).json({message: error.message});
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

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new AuthController();