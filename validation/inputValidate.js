const joiSchema = require('../helpers/joiSchema');

async function validator(reqBody, inputs) {
    const schema = joiSchema(...inputs);
    const { error } = await schema.validate(reqBody);
    if (error) return {isValid: false, msg: error.details[0].message};
    return {isValid: true};
}

module.exports = validator;