const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');

function createServer() {
    const app = express();

    // Middleware
    app.use(bodyParser.json());

    app.use('/api', transactionRoutes);

    // Test route
    app.get('/', (req, res) => {
        res.send('Transaction Service Running!');
    });

    return app;
}

module.exports = createServer;
