const Sequelize = require('sequelize');

const db = new Sequelize('support_app', 'root', 'Сoizhiv123!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
