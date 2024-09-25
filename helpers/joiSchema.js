const Joi = require('joi');

const schemas = {
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email().required(),
    password: Joi
        .string()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number',
        }),
    phone: Joi
        .string()
        .pattern(new RegExp('^[0-9]{10}$'))
        .required()
        .messages({
        'string.pattern.base': 'Phone number must be 10 digits long',
    }),
    address: Joi.string().required(),
};

module.exports = (...fields) => {
    const genSchema = {};
    fields.forEach(field => genSchema[field] = schemas[field]);
    return Joi.object(genSchema);
}
