const BaseRepository = require('./base.repository');

const { NotificationCategory } = require('../models');

class NotificationCategoryRepository extends BaseRepository {

    constructor() {
        super(NotificationCategory);
    }



}

module.exports = NotificationCategoryRepository;