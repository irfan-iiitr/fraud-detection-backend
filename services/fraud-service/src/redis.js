const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

async function connectRedis() {
    client.on('error', (err) => console.error('❌ Redis Error:', err));
    await client.connect();
    console.log("✅ Fraud Service connected to Redis");
}

async function pushTransaction(userId, transaction) {
    // Store transaction in a Redis LIST
    await client.lPush(`transactions:${userId}`, JSON.stringify(transaction));

    // Optional: limit history to last 10 transactions
    await client.lTrim(`transactions:${userId}`, 0, 9);
}

async function getTransactions(userId) {
    const data = await client.lRange(`transactions:${userId}`, 0, 9);
    return data.map(item => JSON.parse(item));
}

module.exports = { connectRedis, pushTransaction, getTransactions };
