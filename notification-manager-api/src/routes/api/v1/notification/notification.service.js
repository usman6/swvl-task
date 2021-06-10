const Joi = require('@hapi/joi');
const {
    NotificationRepository,
    NotificationTextTranslationRepository,
    NotificationCategoryRepository,
    NotificationTypeRepository,
    GroupRepository,
    CustomerRepository
} = require('../../../../common/repository');


const { CONSTANTS } = require('../../../../common/utils')

const producer = require('../../../../common/kafka/kafka-notification-producer');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class NotificationService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.groupRepository = new GroupRepository();
        this.notificationRepository = new NotificationRepository();
        this.notificationTextTranslationRepository = new NotificationTextTranslationRepository();
        this.notificationCategoryRepository = new NotificationCategoryRepository();
        this.notificationTypeRepository = new NotificationTypeRepository();
        this.customerRepository = new CustomerRepository();
    }

    async findByIdAndTransltaions(id) {
        let result = await this.notificationRepository.findNotificationAndTranslations(id);
        return result;
    }

    async create(notification) {

        let { error, value } = validateNotification(notification);

        if (error) {
            throw new BadInputError(null, error);
        }

        let translations = value.notificationTranslations;

        let result = await this.notificationRepository.create(notification);;

        for (let i = 0; i < translations.length; i++) {
            translations[i].notificationId = result.id;
        }

        translations = await this.notificationTextTranslationRepository.bulkCreate(translations);
        return result;
    }

    async sendToCustomer(body) {

        let { error, value } = validateSendRequestIndividual(body);

        if (error) {
            throw new BadInputError(null, error);
        }

        let notificaionType = await this.notificationTypeRepository.findByCode(CONSTANTS.NOTIFICATIONS.NOTIFICATION_TYPES.CODE.PERSONAL);
        value.notificationType = notificaionType;

        let customer = await this.customerRepository.findById(value.customerId);

        if (!customer) {
            throw new ResourceNotFoundError(`[customerId:${value.customerId}] does not exist`);
        }

        let notification = await this.notificationRepository.findById(value.notificationId);

        if (!notification) {
            throw new ResourceNotFoundError(`[notificaionId:${value.notificaionId}] does not exist`);
        }

        let notificationCategory = await this.notificationCategoryRepository.findById(value.notificationCategoryId);

        if (!notificationCategory) {
            throw new ResourceNotFoundError(`[notificaionId:${value.notificaionCategoryId}] does not exist`);
        }

        value.category = notificationCategory;

        value.customer = customer;

        let res = await producer(JSON.stringify(value));
        if (res) {
            return res;
        }
        return value;
    }


    async sendToGroup(body) {
        let { error, value } = validateSendRequestGroup(body);

        if (error) {
            throw new BadInputError(null, error);
        }

        let notificaionType = await this.notificationTypeRepository.findByCode(CONSTANTS.NOTIFICATIONS.NOTIFICATION_TYPES.CODE.GROUP);
        value.notificationType = notificaionType;

        let group = await this.groupRepository.findById(value.groupId);

        if (!group) {
            throw new ResourceNotFoundError(`[groupId:${value.groupId}] does not exist`);
        }

        let notification = await this.notificationRepository.findById(value.notificationId);

        if (!notification) {
            throw new ResourceNotFoundError(`[notificaionId:${value.notificaionId}] does not exist`);
        }

        let notificationCategory = await this.notificationCategoryRepository.findById(value.notificationCategoryId);

        if (!notificationCategory) {
            throw new ResourceNotFoundError(`[notificaionId:${value.notificaionCategoryId}] does not exist`);
        }

        value.category = notificationCategory;

        value.group = group;
        value.notificaion = notification;
        let res = await producer(JSON.stringify(value));
        if (res) {
            return res;
        }
        return value;
    }


}

function validateSendRequestIndividual(req) {
    let schema = Joi.object({
        notificationId: Joi.number().integer().required(),
        notificationCategoryId: Joi.number().integer().required(),
        customerId: Joi.number().integer().required()
    })

    return schema.validate(req);
}

function validateSendRequestGroup(req) {
    let schema = Joi.object({
        notificationId: Joi.number().integer().required(),
        notificationCategoryId: Joi.number().integer().required(),
        groupId: Joi.number().integer().required()
    })

    return schema.validate(req);
}

function validateNotification(notification) {
    let schema = Joi.object({
        code: Joi.string().trim().max(255).required(),
        displayName: Joi.string().trim().max(255).allow('', null),
        description: Joi.string().trim().max(255).allow('', null),
        notificationTranslations: Joi.array().items({
            notificationText: Joi.string().required(),
            languageId: Joi.number().integer().required()
        }).required()
    });

    return schema.validate(notification);
}

module.exports = NotificationService;