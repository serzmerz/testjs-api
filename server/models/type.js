const pg = require('../lib/db');
const Sequelize = require('sequelize');

const TypeModel = pg.define('s', {
    id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}, { timestamps: false, tableName: 'type' }
);

/* need to create or replace table */
TypeModel.sync({ force: true }).then(() => {
    return [ TypeModel.create({ name: 'Wholesale' }),
        TypeModel.create({ name: 'Retail' }) ];
});

module.exports = TypeModel;
