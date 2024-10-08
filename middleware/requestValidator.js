const inputValidate = require('../validation/inputValidate');

async function validateRequest(req, res, next) {
    let reqValidation;
    switch (req.path) {
        case "/api/auth/register":
            reqValidation = await inputValidate(req.body, ['username', 'email', 'password', 'phone', 'address']);
            break;
        case "/api/auth/login":
            reqValidation = await inputValidate(req.body, ['email', 'password']);
            break;
        case "/api/auth/forgetpassword":
            reqValidation = await inputValidate(req.body, ['email']);
            break;
        case "/api/auth/resetpassword/:token":
            reqValidation = await inputValidate(req.body, ['password']);
            break;
        case "/api/auth/otp-method":
            reqValidation = await inputValidate(req.body, ['email', 'method']);
            break;
        case "/api/auth/send-email-verification":
            reqValidation = await inputValidate(req.body, ['email']);
            break;
        default:
            reqValidation = {isValid: true};
    }
    if (!reqValidation.isValid) return res.status(400).json({message: reqValidation.msg});
    next();
}

module.exports = validateRequest;