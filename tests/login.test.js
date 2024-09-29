const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");
const User = require('../models/User');

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

describe('POST /auth/login', () => {
    it('should return 401 with Unauthorized device or location', async () => {
        const userData = {
            email: "anass@gmail.com",
            password: "Anass@2000"
        };
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("Unauthorized device or location");
    });

    it('should return 400 with empty email message', async () => {
        const userData = {
            email: ""
        }
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Email is not allowed to be empty");
    });

    it('should return 404 with email not found', async () => {
        const userData = {
            email: "a@gmail.com",
            password: "Jass1234"
        }
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("email not found");
    });

    it('should return 400 with invalid password', async () => {
        const userData = {
            email: "anass@gmail.com",
            password: "Jass1234"
        }
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Invalid password");
    });

    it('should return 200 with access token', async () => {
        const x = {
            fingerprint: '2189ee076a3c22450cc09dde1cc47402acc52b32f111da5411d80cdb419458f2',
            location: 'undefined, undefined',
        }
        await User.updateOne(
            {email: "anass@gmail.com"},
            { $set: { loginHistory: {
                history: {fingerprint: x.fingerprint, location: x.location}
            } } }
        );

        const userData = {
            email: "anass@gmail.com",
            password: "Anass@2000",
        }
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    });
});
