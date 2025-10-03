require('dotenv').config();
const createServer = require('./server');

const { connectConsumer } = require('./kafka');

const PORT = process.env.PORT || 4000;
const app = createServer();

async function start() {
    // Start HTTP server
    app.listen(PORT, () => {
        console.log(`Fraud Service running on http://localhost:${PORT}`);
    });

    // Connect to Kafka Consumer
    await connectConsumer("transactions", (data) => {
        console.log("Fraud Service got transaction:", data);
    });
}

start();