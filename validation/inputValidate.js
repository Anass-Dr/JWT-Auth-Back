const joiSchema = require('../helpers/joiSchema');

class Validator {
    register(reqBody) {
        const schema = joiSchema('username', 'email', 'password', 'phone', 'address');
        const { error } = schema.validate(reqBody);
        if (error) return {isValid: false, msg: error.details[0].message};
        return {isValid: true};
    }
}

module.exports = new Validator();