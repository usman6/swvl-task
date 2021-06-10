const Sequelize  = require('sequelize');
const context = require('../database/context');

const Language = context.define('languages', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        field: 'code',
        type: Sequelize.STRING
    },
    displayName: {
        field: 'display_name',
        type: Sequelize.STRING
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


module.exports = Language;