const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'transaction-service',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
    console.log("Transaction Service connected to Kafka Producer");
}

async function sendMessage(topic, message) {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
    });
    console.log(`📤 Sent message to ${topic}`, message);
}

module.exports = { connectProducer, sendMessage };
