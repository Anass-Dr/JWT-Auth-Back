const express = require("express");
const router = express.Router();
const jwtToken = require("../middleware/jwtToken");
const AuthController = require("../controllers/AuthController");

router.post("/auth/register", AuthController.register);
router.get("/auth/verify", jwtToken.validateQuery, AuthController.verify);
router.post("/auth/login", AuthController.login);
router.post("/auth/otp-method", AuthController.sendOtp);
router.post("/auth/verify-otp", AuthController.verifyOtp);
router.post("/auth/forgetpassword", AuthController.forgetPassword);
router.get("/auth/resetpassword/verify", jwtToken.validateQuery, AuthController.verifyResetPassword);
router.post("/auth/resetpassword/:token", jwtToken.validateParams, AuthController.resetPassword);

module.exports = router;
