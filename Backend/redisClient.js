const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

module.exports = client;
