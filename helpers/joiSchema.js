const Joi = require('joi');

const schemas = {
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .lowercase()
        .required(),
    email: Joi
        .string()
        .email()
        .required()
        .messages({'string.pattern.base': 'Email must be a valid email', 'string.empty': 'Email is not allowed to be empty'}),
    password: Joi
        .string()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number',
            'string.empty': 'Password is not allowed to be empty'
        }),
    phone: Joi
        .string()
        .pattern(new RegExp('^\\+\\d{1,3}\\d{4,14}$'))
        .required()
        .messages({
        'string.pattern.base': 'Phone number must be in international format',
    }),
    address: Joi.string().required(),
    method: Joi.string().valid('email', 'sms').required().messages({
        'any.only': 'Method must be either email or phone'
    }),
};

module.exports = (...fields) => {
    const genSchema = {};
    fields.forEach(field => genSchema[field] = schemas[field]);
    return Joi.object(genSchema);
}
