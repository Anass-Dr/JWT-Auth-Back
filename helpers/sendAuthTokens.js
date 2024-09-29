const jwtService = require("../services/jwtService");

module.exports = async function sendAuthTokens(res, userId) {
    const accessToken = jwtService.generateToken(userId, 30 * 60);
    const refreshToken = jwtService.generateToken(userId, 24 * 60 * 60 * 7);
    res.cookie('refreshToken', refreshToken, {httpOnly: true});
    res.status(200).json({accessToken});
}