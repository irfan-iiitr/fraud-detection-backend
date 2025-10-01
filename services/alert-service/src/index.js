require('dotenv').config();
const createServer = require('./server');

const PORT = process.env.PORT || 5000;
const app = createServer();

app.listen(PORT, () => {
    console.log(`Alert Service running on http://localhost:${PORT}`);
});
