const express = require('express');
const bodyParser = require('body-parser');

function createServer() {
    const app = express();

    // Middleware
    app.use(bodyParser.json());

    // Test route
    app.get('/', (req, res) => {
        res.send('Fraud Service Running!');
    });

    return app;
}

module.exports = createServer;
