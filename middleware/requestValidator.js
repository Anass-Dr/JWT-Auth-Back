const Validator = require('../validation/inputValidate');

async function validateRequest(req, res, next) {
    let reqValidation;
    switch (req.path) {
        case "/api/auth/register":
            reqValidation = await Validator.register(req.body);
            break;
        case "/api/auth/login":
            reqValidation = await Validator.login(req.body);
            break;
        default:
            reqValidation = {isValid: true};
    }
    if (!reqValidation.isValid) return res.status(400).json({message: reqValidation.msg});
    next();
}

module.exports = validateRequest;