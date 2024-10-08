const request = require('supertest');
const app = require('../app');
const getRedisClient = require('../config/redis');

describe('POST /auth/otp-method', () => {
    it('should return 400 with email required', async () => {
        const response = await request(app)
            .post('/api/auth/otp-method')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('\"email\" is required');
    });

    it('should 400 with method not valid', async () => {
        const userData = {
            email: "anass@gmail.com",
            method: ""
        }
        const response = await request(app)
            .post('/api/auth/otp-method')
            .send(userData)
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Method must be either email or phone');
    });
});