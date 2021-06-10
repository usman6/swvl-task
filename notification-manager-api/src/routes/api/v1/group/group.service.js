const Joi = require('@hapi/joi');
const {
    GroupRepository
} = require('../../../../common/repository');

const {
    RestQueryBuilder,
    BadInputError,
    UnauthorizedError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError } = require('../../../../core');

class GroupService {

    constructor() {
        this.restQueryBuilder = new RestQueryBuilder();
        this.groupRepository = new GroupRepository();
    }

    async findAll({ pageNo, pageSize }) {

        let result = await this.groupRepository.findAll({
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

        let result = await this.groupRepository.findAll(value);

        return result;
    }

    async findAllCustomers(id) {
        let result = await this.groupRepository.findCustomersByGroupId(id);
        return result.customers;
    }


}

module.exports = GroupService;