const BaseRepository = require('./base.repository');

const { Notification, NotificationTextTranslation } = require('../models');

class NotificationRepository extends BaseRepository {

    constructor() {
        super(Notification);
    }

    async findNotificationAndTranslations(id) {
        let result = await this.model.findOne({
            where: {
                id: id
            },
            include: [{ model: NotificationTextTranslation, as: 'translations' }]
        })

        return this.getDataValues(result);
    }

}

module.exports = NotificationRepository;