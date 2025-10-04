require('dotenv').config();
const createServer = require('./server');
const { connectConsumer } = require('./kafka');
const { connectRedis } = require('./redis');
const { storeTransaction, fetchUserHistory } = require('./services/transactionHistoryService');

const PORT = process.env.PORT || 4000;
const app = createServer();

async function start() {
    // Start HTTP server
    app.listen(PORT, () => {
        console.log(`Fraud Service running on http://localhost:${PORT}`);
    });

    // Connect to Redis
    await connectRedis();

    // Connect Kafka Consumer
    await connectConsumer("transactions", async (data) => {
        console.log("👀 Fraud Service got transaction:", data);

        // Store transaction in Redis
        await storeTransaction(data.userId, data);

        // Fetch and log history (for debugging now)
        await fetchUserHistory(data.userId);
    });
}

start();
