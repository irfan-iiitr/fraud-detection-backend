const { pushTransaction, getTransactions } = require('../redis');

async function storeTransaction(userId, transaction) {
    await pushTransaction(userId, transaction);
    console.log(`💾 Stored transaction for user ${userId}`);
}

async function fetchUserHistory(userId) {
    const history = await getTransactions(userId);
    console.log(`📜 User ${userId} history:`, history);
    return history;
}

module.exports = { storeTransaction, fetchUserHistory };
