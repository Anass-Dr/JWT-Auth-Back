const request = require('supertest');
const app = require('../app');

describe('POST /auth/login', () => {
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
    it('should return 400 with empty password message', async () => {
        const userData = {
            email: "a@a.com",
            password: ""
        }
        const response = await request(app)
            .post('/api/auth/login')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Password is not allowed to be empty");
    });
});
