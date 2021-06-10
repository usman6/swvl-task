const env = require('./default.json');

module.exports = {
    NODE_ENV: process.env.NODE_ENV || env['nodeEnv'],

    API_URL: process.env.API_URL || env['apiUrl'],

    REDIS_SERVER_NAME: process.env.REDIS_SERVER_NAME || env['redisHost'],
    REDIS_SERVER_PORT: process.env.REDIS_SERVER_PORT || env['redisPort'],

    CACHE_REFRESH_INTERVAL: process.env.CACHE_REFRESH_INTERVAL || env['cacheRefreshInterval'],

    KAFKA_CLUSTER: process.env.KAFKA_CLUSTER || env['kafkaCluster'],
    KAFKA_GROUP_ID: process.env.GROUP_ID || env['kafkaGroupId'],
    KAFKA_RAW_NOTIFICATIONS_TOPIC: process.env.KAFKA_RAW_NOTIFICATIONS_TOPIC || env['kafkaRawNotificationsTopic'],
    KAFKA_EMAIL_NOTIFICATIONS_TOPIC: process.env.KAFKA_EMAIL_NOTIFICATIONS_TOPIC || env['kafkaEmailNotificationsTopic'],
    KAFKA_PUSH_NOTIFICATIONS_TOPIC: process.env.KAFKA_PUSH_NOTIFICATIONS_TOPIC || env['kafkaPushNotificationsTopic'],
    KAFKA_SMS_NOTIFICATIONS_TOPIC: process.env.KAFKA_SMS_NOTIFICATIONS_TOPIC || env['kafkaSmsNotificationsTopic'],

};