const joiSchema = require('../helpers/joiSchema');

class Validator {
    async register(reqBody) {
        const schema = joiSchema('username', 'email', 'password', 'phone', 'address');
        const { error } = await schema.validate(reqBody);
        if (error) return {isValid: false, msg: error.details[0].message};
        return {isValid: true};
    }

    async login(reqBody) {
        const schema = joiSchema('email', 'password');
        const { error } = await schema.validate(reqBody);
        if (error) return {isValid: false, msg: error.details[0].message};
        return {isValid: true};
    }
}

module.exports = new Validator();