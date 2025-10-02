const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'fraud-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'fraud-group' });

async function connectConsumer(topic, callback) {
    await consumer.connect();
    console.log("Fraud Service connected to Kafka Consumer");
    
    await consumer.subscribe({ topic, fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString());
            console.log("📥 Fraud Service received:", data);
            callback(data);
        }
    });
}

module.exports = { connectConsumer };
