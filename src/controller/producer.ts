import config from '../config/config'
import { Kafka } from 'kafkajs';

const clientId = config.clientId;
const brokers = config.broker //port on kafka is running!
const topic = config.topic;

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

async function sendMessages() {
    //load producer 
    await producer.connect();
    let i = 0;
    setInterval(async () => {

        await producer.send({
            topic,
            messages: [
                {
                    key: String(i),
                    value: "This Is My Message: " + i
                }
            ]
        });
        i++
        console.log("message sended");
    }, 2000);
}

sendMessages();