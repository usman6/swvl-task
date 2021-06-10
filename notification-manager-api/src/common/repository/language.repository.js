const BaseRepository = require('./base.repository');
const { Op } = require('sequelize');

const { Language } = require('../models');

class LanguageRepository extends BaseRepository {

    constructor() {
        super(Language);
    }

    async isUniqueByCode(code, id = null) {

        if (id) {

            let result = await this.model.count({
                where: {
                    code: code,
                    id: {
                        [Op.ne]: id
                    }
                }
            });

            return result < 1;

        } else {

            let result = await this.model.count({
                where: {
                    code: code
                }
            });

            return result < 1;
        }

    }

}

module.exports = LanguageRepository;