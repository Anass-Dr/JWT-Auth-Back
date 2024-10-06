const jwtService = require("../services/jwtService");

module.exports = async function sendAuthTokens(res, userId) {
  const accessToken = jwtService.generateToken(userId, 30 * 60);
  const refreshToken = jwtService.generateToken(userId, 7 * 24 * 60 * 60);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ accessToken });
};
