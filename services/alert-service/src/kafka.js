const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'alert-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'alert-group' });

async function connectConsumer(topic, callback) {
    await consumer.connect();
    console.log("Alert Service connected to Kafka Consumer");
    
    await consumer.subscribe({ topic, fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString());
            console.log("🚨 Alert Service received alert:", data);
            callback(data);
        }
    });
}

module.exports = { connectConsumer };
