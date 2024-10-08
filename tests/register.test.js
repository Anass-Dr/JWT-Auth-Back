const request = require('supertest');
const app = require('../app');

describe('POST /auth/register', () => {
    it('should return 400 with username is required message', async () => {
        const res = await request(app).post('/api/auth/register');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual("\"username\" is required")
    })

    it('should return 400 with email is required message', async () => {
        const userData = {
            username: "anass"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"email\" is required")
    })

    it('should return 400 with email is not valid', async () => {
        const userData = {
            username: "anass",
            email: "anass"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"email\" must be a valid email")
    })

    it('should return 400 with password is required message', async () => {
        const userData = {
            username: "anass",
            email: "a@a.com"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"password\" is required")
    })

    it('should return 400 with password is not valid', async () => {
        const userData = {
            username: "anass",
            email: "a@a.com",
            password: "anass"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number")
    })
})
