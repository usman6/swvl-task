const Sequelize = require('sequelize');
const context = require('../database/context');
const Notification = require('./notification.model');
const Language = require('./language.model');

const NotificationTextTranslation = context.define('notification_text_translations', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notificationText: {
        field: 'notification_text',
        type: Sequelize.STRING
    },
    languageId: {
        field: 'language_id',
        type: Sequelize.INTEGER
    },
    notificationId: {
        field: 'notification_id',
        type: Sequelize.INTEGER
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
    }
}, {
    timestamps: true,
    underscored: true
});

Language.hasMany(NotificationTextTranslation);
Notification.hasMany(NotificationTextTranslation, {as: 'translations'});
NotificationTextTranslation.belongsTo(Language);
NotificationTextTranslation.belongsTo(Notification);


module.exports = NotificationTextTranslation;