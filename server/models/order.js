const pg = require('../lib/db');
const Sequelize = require('sequelize');

const OrderModel = pg.define('s', {
    id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    customerFistName: {
        type: Sequelize.STRING
    },
    customerSecondName: {
        type: Sequelize.STRING
    },
    customerEmail: {
        type: Sequelize.STRING
    },
    customerPhone: {
        type: Sequelize.STRING
    },
    orderType: {
        type: Sequelize.STRING
    },
    orderProvider: {
        type: Sequelize.STRING
    },
    orderDate: {
        type: Sequelize.BIGINT
    },
    orderDatePerformance: {
        type: Sequelize.BIGINT
    },
    orderNumber: {
        type: Sequelize.STRING
    },
    orderTranscription: {
        type: Sequelize.STRING
    },
    orderStatus: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false, tableName: 'order' });

/* need to create or replace table */
OrderModel.sync({ force: true }).then(() => {
});
module.exports = OrderModel;
