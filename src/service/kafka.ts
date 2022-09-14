import config from '../config/config'
import { Kafka } from 'kafkajs';
import { Product } from '../controller/product.controller';


const kafka = new Kafka({ clientId: config.clientId, brokers: config.broker });
const admin = kafka.admin();
const producer = kafka.producer();

async function sendProduct(product: Product) {
    const topic = product.category;

    try {
        // check if this topic exists
        await admin.fetchTopicMetadata({ topics: [topic] });
    } catch (err) {

        await admin.createTopics({
            topics: [
                {
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1
                }
            ]
        });

        console.log(`${topic} topic created`);
    }

    await producer.connect();

    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(product) }]
    });

    return true;
}

export default {
    sendProduct
}