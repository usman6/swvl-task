const Sequelize = require('sequelize');
const context = require('../database/context');
const Customer = require('./customer.model');

const Group = context.define('groups', {
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

Customer.belongsToMany(Group, { as: 'groups', through: { model: 'customers_groups', unique: false }, foreignKey: 'customerId', timestamps: true });
Group.belongsToMany(Customer, { as: 'customers', through: { model: 'customers_groups', unique: false }, foreignKey: 'groupId', timestamps: true });


module.exports = Group;