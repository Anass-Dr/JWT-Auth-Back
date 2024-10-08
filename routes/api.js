const express = require("express");
const router = express.Router();
const jwtToken = require("../middleware/jwtToken");
const AuthController = require("../controllers/AuthController");

router.post("/auth/register", AuthController.register);
router.get("/auth/verify", jwtToken.validateQuery, AuthController.verify);
router.post("/auth/send-email-verification", AuthController.sendEmailVerification);
router.post("/auth/login", AuthController.login);
router.post("/auth/otp-method", AuthController.sendOtp);
router.post("/auth/verify-otp", AuthController.verifyOtp);
router.post("/auth/forgot-password", AuthController.forgotPassword);
router.get("/auth/reset-password/verify", jwtToken.validateQuery, AuthController.verifyResetPassword);
router.post("/auth/reset-password/:token", jwtToken.validateParams, AuthController.resetPassword);
router.get("/auth/refresh-token", jwtToken.validateRefreshToken, AuthController.refreshToken);
router.get("/auth/logout", jwtToken.validateRefreshToken, AuthController.logout);

module.exports = router;
