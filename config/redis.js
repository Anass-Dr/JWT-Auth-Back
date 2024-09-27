const { createClient } = require('redis');

let instance = null;

const getRedisClient = async () => {
    if (!instance) {
        instance = createClient();

        instance.on('error', (err) => {
            console.log('Redis Client Error', err);
        });

        await instance.connect();
    }

    return instance;
};

module.exports = getRedisClient;
