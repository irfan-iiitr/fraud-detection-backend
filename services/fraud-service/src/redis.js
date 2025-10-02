const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

async function connectRedis() {
    client.on('error', (err) => console.error('Redis Error:', err));
    await client.connect();
    console.log("Fraud Service connected to Redis");
}

async function setUserHistory(userId, data) {
    await client.set(userId, JSON.stringify(data));
}

async function getUserHistory(userId) {
    const data = await client.get(userId);
    return data ? JSON.parse(data) : null;
}

module.exports = { connectRedis, setUserHistory, getUserHistory };
