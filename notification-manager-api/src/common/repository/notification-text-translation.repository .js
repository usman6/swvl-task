const BaseRepository = require('./base.repository');

const { NotificationTextTranslation } = require('../models');

class NotificationTextTranslationRepository extends BaseRepository {

    constructor() {
        super(NotificationTextTranslation);
    }

    async bulkCreate(notificationTextTranslations) {
        let result = await this.model.bulkCreate(notificationTextTranslations);
        return this.getDataValues(result);
    }

}

module.exports = NotificationTextTranslationRepository;