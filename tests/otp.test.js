const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");
const User = require('../models/User');
const getRedisClient = require("../config/redis");

beforeEach(async () => {
    await mongoose.connect( process.env.TEST_DB_URI);
    await User.deleteMany({});
    const user = new User({
        username: "anass",
        email: "anass@gmail.com",
        password: "Anass@2000",
        phone: "+212600000000",
        address: "California, USA",
        isVerified: true
    });
    await user.save();
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /auth/otp-method', () => {
    it('should send OTP to user email', async () => {
        const userData = {
            email: "anass@gmail.com",
            method: "email"
        }
        const response = await request(app)
            .post('/api/auth/otp-method')
            .send(userData);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('OTP sent successfully');
    });

    it('should send OTP to user phone', async () => {
        const userData = {
            email: "anass@gmail.com",
            method: "phone"
        }
        const response = await request(app)
            .post('/api/auth/otp-method')
            .send(userData);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('OTP sent successfully');
    });

    it('should return 200 with access token', async () => {
        const user = await User.findOne({email: "anass@gmail.com"});
        const otp = '123456';
        const redis = await getRedisClient();
        await redis.set(otp, user._id.toString(), 'EX', 60);
       const response = await request(app)
           .post('/api/auth/verify-otp')
           .send({otp});
         expect(response.status).toBe(200);
         expect(response.body.accessToken).toBeDefined();
    });
});