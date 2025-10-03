require('dotenv').config();
const createServer = require('./server');

const { connectProducer } = require('./kafka');

const PORT = process.env.PORT || 3000;
const app = createServer();

async function start() {
    await connectProducer(); // connect to Kafka producer

    app.listen(PORT, () => {
        console.log(`Transaction Service running on http://localhost:${PORT}`);
    });
}

start();
