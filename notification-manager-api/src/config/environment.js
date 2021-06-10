const env = require('./default.json');

module.exports = {
    // Server Environment Variables
    NODE_ENV: process.env.NODE_ENV || env['nodeEnv'],
    HOST: process.env.HOST || env['host'],
    PORT: parseInt(process.env.PORT) || env['port'],

    // Database Configuration
    DATABASE_URL: process.env.DATABASE_URL || env['databaseUrl'],

    // Base Application URL
    BASE_URL: process.env.BASE_URL || env['baseUrl'],

    //Kafka Configs
    KAFKA_CLUSTER: process.env.KAFKA_CLUSTER || env['kafkaCluster'],
    KAFKA_TOPIC_NOTIFICATIONS_RAW: process.env.KAFKA_TOPIC_NOTIFICATIONS_RAW || env['kafkaTopicNotificationsRaw']


};