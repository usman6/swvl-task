const { KAFKA_CLUSTER, KAFKA_TOPIC_NOTIFICATIONS_RAW } = require('../../config/environment');
const { KafkaClient, Producer } = require('kafka-node');
const { Logger } = require('../../core');



const kClient = new KafkaClient({ kafkaHost: KAFKA_CLUSTER });
const producer = new Producer(kClient);

producer.on('error', (err) => {
    Logger.error(`[Kafka:${err.message}]`);
});

async function produce(notification) {
    producer.send([{ 'topic': KAFKA_TOPIC_NOTIFICATIONS_RAW, messages: [notification] }], function (err, data) {
        if (err) {
            return err;
        }
        return data;
    });
}
module.exports = produce;

