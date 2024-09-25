const Validator = require('../validation/inputValidate');

async function validateRequest(req, res, next) {
    let error = '';
    switch (req.path) {
        case "/api/auth/register":
            const validation = await Validator.register(req.body);
            if (validation.isValid) return next();
            else error = validation.msg;
    }
    res.status(500).json({message: error});
}

module.exports = validateRequest;