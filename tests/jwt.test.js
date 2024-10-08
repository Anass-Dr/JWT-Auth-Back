require('dotenv').config();
const jwtService = require("../services/jwtService");

describe('JWT Service', () => {
    let token = '';
    it('should generate a token', () => {
        token = jwtService.generateToken(1, 30 * 60);
        expect(token).toBeDefined();
    });

    it('should verify a token', () => {
        const decoded = jwtService.verifyToken(token);
        expect(decoded.id).toBe(1);
    });
});