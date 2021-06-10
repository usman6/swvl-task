const axios = require('axios');
const asyncRedis = require('async-redis');
const { ConsumerGroup, KafkaClient, Producer } = require('kafka-node');
const { Logger } = require('./core');
const { CONSTANTS } = require('./common/utils');

const {
    KAFKA_CLUSTER,
    KAFKA_GROUP_ID,
    API_URL,
    CACHE_REFRESH_INTERVAL,
    REDIS_SERVER_NAME,
    REDIS_SERVER_PORT,
    KAFKA_RAW_NOTIFICATIONS_TOPIC,
    KAFKA_EMAIL_NOTIFICATIONS_TOPIC,
    KAFKA_SMS_NOTIFICATIONS_TOPIC,
    KAFKA_PUSH_NOTIFICATIONS_TOPIC } = require('./config/environment');

const healthUrl = API_URL + '/status/health';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

getServicesHealth();

const redisClient = asyncRedis.createClient(REDIS_SERVER_PORT, REDIS_SERVER_NAME);

redisClient.on('error', (err) => {
    Logger.error("Error " + err);
    process.exit(1);
});

redisClient.on('connect', (message) => {
    Logger.log("Redis Client: Connected");
});


function options() {

    let opt = {
        kafkaHost: KAFKA_CLUSTER,
        groupId: KAFKA_GROUP_ID,
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        fromOffset: 'latest'
    };

    return opt;
}

const kClient = new KafkaClient({ kafkaHost: KAFKA_CLUSTER });
const consumerGroup = new ConsumerGroup(options(), KAFKA_RAW_NOTIFICATIONS_TOPIC);
const producer = new Producer(kClient);

producer.on('error', (err) => {
    Logger.error(`[Kafka:${err.message}]`);
    process.exit(1);
});

consumerGroup.on('error', (err) => {
    Logger.error(`[Kafka:${err.message}]`);
    process.exit(1);
});

consumerGroup.on('connect', (message) => {
    Logger.log(`Kafka:Connected`);
});


consumerGroup.on('message', (message) => {
    applyMessage(message.value);
});

function applyMessage(data) {
    let message = JSON.parse(data);
    if (message.notificationType.code == CONSTANTS.NOTIFICATIONS.TYPES.CODE.GROUP) {
        processGroupNotification(message);
    }
    else if (message.notificationType.code == CONSTANTS.NOTIFICATIONS.TYPES.CODE.PERSONAL) {
        processPersonalNotification(message);
    }

}

async function processGroupNotification(message) {
    let customers = await getGroupCustomers(message.groupId);
    let translation = await getNotificationTranslations(message.notificationId);
    let notifications = [];
    customers.forEach((customer) => {
        let notificationTranslation = translation.translations.find(obj => {
            return obj.languageId === customer.languageId
        });

        notifications.push(JSON.stringify({
            name: customer.name, contact: customer.contact, email: customer.email,
            notificationText: notificationTranslation.notificationText
        }));
    });

    if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.SMS) {
        await sendToSmsNotificationTopic(notifications);
    }
    else if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.EMAIL) {
        await sendToEmailNotificationTopic(notifications);
    }
    else if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.PUSH) {
        await sendToPushNotificationTopic(notifications);
    }
}

async function processPersonalNotification(message) {
    let translation = await getNotificationTranslations(message.notificationId);
    let notifications = [];
    let customer = message.customer;
    let notificationTranslation = translation.translations.find(obj => {
        return obj.languageId === customer.languageId
    });

    notifications.push(JSON.stringify({
        name: customer.name, contact: customer.contact, email: customer.email,
        notificationText: notificationTranslation.notificationText
    }));

    if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.SMS) {
        await sendToSmsNotificationTopic(notifications);
    }
    else if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.EMAIL) {
        await sendToEmailNotificationTopic(notifications);
    }
    else if (message.category.code === CONSTANTS.NOTIFICATIONS.CATEGORY.CODE.PUSH) {
        await sendToPushNotificationTopic(notifications);
    }
}


//get users by groupId
async function getGroupCustomers(groupId) {
    let key = `groupId:${groupId}:users`;

    let customersString = await redisClient.get(key);

    if (!customersString) {
        let result = await getCustomersByGroupId(groupId);
        await redisClient.set(key, JSON.stringify(result));
        await redisClient.expire(key, CACHE_REFRESH_INTERVAL);
        return result;
    }
    return JSON.parse(customersString);

}

async function getCustomersByGroupId(groupId) {
    try {
        const res = await axios.get(API_URL + '/api/v1/group/' + groupId + '/customer');
        return res.data;
    }
    catch (e) {
        Logger.error(e);
    }
}

async function getNotificationTranslations(notificationId) {
    try {
        const res = await axios.get(API_URL + '/api/v1/notification/' + notificationId + '/translations');
        return res.data;
    }
    catch (e) {
        Logger.error(e);
    }
}

async function getServicesHealth() {
    try {
        const res = await axios.get(healthUrl);
        if (res.status == 200) {
            Logger.log('Services Available...');
        }
        else {
            Logger.error('Services Not Available...')
        }
    }
    catch (e) {
        Logger.error('Services Not Available...')
    }
}

async function sendToEmailNotificationTopic(notifications) {
    producer.send([{ 'topic': KAFKA_EMAIL_NOTIFICATIONS_TOPIC, messages: notifications }], function (err, data) {
        Logger.error(err);
    });
}

async function sendToPushNotificationTopic(notifications) {
    producer.send([{ 'topic': KAFKA_PUSH_NOTIFICATIONS_TOPIC, messages: notifications }], function (err, data) {
        Logger.error(err);
    });
}

async function sendToSmsNotificationTopic(notifications) {
    producer.send([{ 'topic': KAFKA_SMS_NOTIFICATIONS_TOPIC, messages: notifications }], function (err, data) {
        Logger.error(err);
    });
}

