const Sequelize  = require('sequelize');
const context = require('../database/context');
const Language = require('./language.model');

const Customer = context.define('customers', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING
    },
    contact: {
        field: 'contact',
        type: Sequelize.STRING
    },
    languageId: {
        field: 'language_id',
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

Language.hasOne(Customer);
Customer.belongsTo(Language);

module.exports = Customer;