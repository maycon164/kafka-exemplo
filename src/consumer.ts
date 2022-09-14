import config from './config/config';
import { Kafka } from 'kafkajs';

const clientId = config.clientId;
const brokers = config.broker; //port on kafka is running!
const topic = config.topic;
const kafka = new Kafka({ clientId, brokers });

const consumer = kafka.consumer({ groupId: clientId });

async function readMessages() {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(`receive message: ${message.value}, key: ${message.key}`);
        }
    })
}
readMessages();