const _ = require('lodash');
const User = require('../models/User');

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
            res.status(201).json({message: 'User created successfully'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new AuthController();