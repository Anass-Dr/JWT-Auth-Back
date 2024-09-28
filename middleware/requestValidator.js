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
        case "/auth/forgetpassword":
            reqValidation = await inputValidate(req.body, ['email']);
            break;
        case "/auth/resetpassword/:token":
            reqValidation = await inputValidate(req.body, ['password']);
            break;
        default:
            reqValidation = {isValid: true};
    }
    if (!reqValidation.isValid) return res.status(400).json({message: reqValidation.msg});
    next();
}

module.exports = validateRequest;