const env = require('./default.json');

module.exports = {
    NODE_ENV: process.env.NODE_ENV || env['nodeEnv'],


    PER_MINUTE_NOTIFICATION_RATE: process.env.PER_MINUTE_NOTIFICATION_RATE || env['perMinuteNotificationRate'],

    KAFKA_CLUSTER: process.env.KAFKA_CLUSTER || env['kafkaCluster'],
    KAFKA_GROUP_ID: process.env.GROUP_ID || env['kafkaGroupId'],
    KAFKA_EMAIL_NOTIFICATIONS_TOPIC: process.env.KAFKA_EMAIL_NOTIFICATIONS_TOPIC || env['kafkaEmailNotificationsTopic'],

};