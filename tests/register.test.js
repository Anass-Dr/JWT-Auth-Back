const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

describe('POST /auth/register', () => {
    beforeAll(async () => {
        await mongoose.connect( process.env.TEST_DB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should return 201 OK', async () => {
        const userData = {
            username: "anass",
            email: "anass@gmail.com",
            password: "Anass@2000",
            phone: "+212600000000",
            address: "California, USA"
        };
        const response = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(201);
    });
});
describe('POST /auth/register', () => {
    it('should return 400 with username is required message', async () => {
        const res = await request(app).post('/api/auth/register');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual("\"username\" is required")
    })
})
describe('POST /auth/register', () => {
    it('should return 400 with email is required message', async () => {
        const userData = {
            username: "anass"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"email\" is required")
    })
})
describe('POST /auth/register', () => {
    it('should return 400 with email is not valid', async () => {
        const userData = {
            username: "anass",
            email: "anass"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"email\" must be a valid email")
    })
})
describe('POST /auth/register', () => {
    it('should return 400 with password is required message', async () => {
        const userData = {
            username: "anass",
            email: "a@a.com"
        }
        const res = await request(app).post('/api/auth/register').send(userData).set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("\"password\" is required")
    })
})
describe('POST /auth/register', () => {
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
