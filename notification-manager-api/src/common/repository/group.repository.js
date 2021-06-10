const BaseRepository = require('./base.repository');
const { Group, Customer, Language } = require('../models');
const { Op } = require('sequelize');

class GroupRepository extends BaseRepository {

    constructor() {
        super(Group);
    }


    async findCustomersByGroupId(id) {
        let result = await this.model.findOne({
            where: {
                id: id
            },
            include: [{ model: Customer, as: 'customers', through: { attributes: [] }, include: [{ model: Language, as: 'language' }] }]
        });

        return this.getDataValues(result);
    }

}

module.exports = GroupRepository;