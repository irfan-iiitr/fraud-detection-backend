const { sendMessage } = require('../kafka');

async function createTransaction(req, res) {
    try {
        const { userId, amount, location } = req.body;

        if (!userId || !amount || !location) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const transaction = {
            userId,
            amount,
            location,
            timestamp: Date.now()
        };

        // Send to Kafka "transactions" topic
        await sendMessage("transactions", transaction);

        return res.status(201).json({
            message: "Transaction created successfully",
            transaction
        });
    } catch (err) {
        console.error("Error creating transaction:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { createTransaction };
