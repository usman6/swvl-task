const { Op, Sequelize } = require('sequelize');

const BaseRepository = require('./base.repository');

const { Customer } = require('../models');

class CustomerRepository extends BaseRepository {

    constructor() {
        super(Customer);
    }

    async isUniqueByEmail(email, id = null) {

        if (id) {

            let result = await this.model.count({
                where: {
                    email: email,
                    id: {
                        [Op.ne]: id
                    }
                }
            });

            return result < 1;

        } else {

            let result = await this.model.count({
                where: {
                    email: email
                }
            });

            return result < 1;
        }

    }

    async isUniqueByContact(contact, id = null) {

        if (id) {

            let result = await this.model.count({
                where: {
                    contact: contact,
                    id: {
                        [Op.ne]: id
                    }
                }
            });

            return result < 1;

        } else {

            let result = await this.model.count({
                where: {
                    contact: contact
                }
            });

            return result < 1;
        }

    }

}

module.exports = CustomerRepository;