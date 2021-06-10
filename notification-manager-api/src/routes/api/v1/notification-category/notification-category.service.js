const Joi = require('@hapi/joi');
const {
    NotificationCategoryRepository
} = require('../../../../common/repository');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class NotificationCategoryService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.notificationCategoryRepository = new NotificationCategoryRepository();
    }

    async findAll({ pageNo, pageSize }) {

        let result = await this.notificationCategoryRepository.findAll({
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

        let result = await this.notificationCategoryRepository.findAll(value);

        return result;
    }


}

module.exports = NotificationCategoryService;