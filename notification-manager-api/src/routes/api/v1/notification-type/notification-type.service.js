const Joi = require('@hapi/joi');
const {
    NotificationTypeRepository
} = require('../../../../common/repository');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class NotificationTypeService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.notificationTypeRepository = new NotificationTypeRepository();
    }

    async findAll({ pageNo, pageSize }) {

        let result = await this.notificationTypeRepository.findAll({
            pageNo: pageNo,
            pageSize: pageSize,
        });

        return result;
    }

    async findAllByQuery(query) {

        let { error, value } = this.restQueryBuilder.build(query);

        if (error) {
            throw new BadInputError(null, error);
        }

        let result = await this.notificationTypeRepository.findAll(value);

        return result;
    }


}

module.exports = NotificationTypeService;