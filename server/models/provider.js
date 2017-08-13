const pg = require('../lib/db');
const Sequelize = require('sequelize');

const Provider = pg.define('s', {
    name: {
        type: Sequelize.STRING
    }
}, { timestamps: false, tableName: 'Provider' });

/* need to create or replace table */
Provider.sync({ force: true }).then(() => {
    // Table created
    return [ Provider.create({ name: 'Chocolate' }),
        Provider.create({ name: 'Some Provider' }),
        Provider.create({ name: 'Hollywood undead' })
    ];
});
module.exports = Provider;
