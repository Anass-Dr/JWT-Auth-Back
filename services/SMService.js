const AWS = require('../config/AWS');
const sns = new AWS.SNS();

const send = async (phone, message) => {
    const params = {
        Message: message,
        PhoneNumber: phone
    };
    return await sns.publish(params).promise();
}

module.exports = {
    send
};