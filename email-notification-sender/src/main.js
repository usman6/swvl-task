const { ConsumerGroup } = require('kafka-node');
const { Logger } = require('./core');

const {
    KAFKA_CLUSTER,
    KAFKA_GROUP_ID,
    KAFKA_EMAIL_NOTIFICATIONS_TOPIC,
    PER_MINUTE_NOTIFICATION_RATE } = require('./config/environment');

var perMinuteNotificationRate = 0;


let recurrenceRateReset = setInterval(refreshRate, 60000);

var Mutex = function () {
    this.queue = [];
    this.locked = false;
};

Mutex.prototype.enqueue = function (task) {
    this.queue.push(task);
    if (!this.locked) {
        this.dequeue();
    }
};

Mutex.prototype.dequeue = function () {
    this.locked = true;
    const task = this.queue.shift();
    if (task) {
        this.execute(task);
    } else {
        this.locked = false;
    }
};

Mutex.prototype.execute = async function (task) {
    try { await task(); } catch (err) { }
    this.dequeue();
}

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
const consumerGroup = new ConsumerGroup(options(), KAFKA_EMAIL_NOTIFICATIONS_TOPIC);

consumerGroup.on('error', (err) => {
    Logger.error(`[Kafka:${err.message}]`);
    process.exit(1);
});

consumerGroup.on('connect', (message) => {
    Logger.log(`Kafka:Connected`);
});


var mutex = new Mutex();
consumerGroup.on('message', message => mutex.enqueue(function () { return applyMessage(message); }));

async function applyMessage(message) {
    sendNotification(message.value);
    perMinuteNotificationRate++;
    //wait till more emails could be sent
    while (perMinuteNotificationRate == PER_MINUTE_NOTIFICATION_RATE) {
        await waitforme(5);
    }
}


function sendNotification(notification) {
    try {
        //send notification via email
        console.log(notification);
    }
    catch (e) {
        //resend notification to topic so that it could be sent again.
    }
}

function waitforme(ms) {
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

async function refreshRate() {
    clearInterval(recurrenceRateReset);
    perMinuteNotificationRate = 0;
    recurrenceCacheRefresh = setInterval(refreshRate, 60 * 1000);
}
