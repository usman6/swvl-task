const BaseRepository = require('./base.repository');

const { NotificationType } = require('../models');

class NotificationTypeRepository extends BaseRepository {

    constructor() {
        super(NotificationType);
    }

    async findByCode(code) {
        let result = await this.model.findOne({
            where: {
                code: code
            }
        });

        return this.getDataValues(result);
    }

}

module.exports = NotificationTypeRepository;