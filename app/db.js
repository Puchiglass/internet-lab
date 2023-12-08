const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Сoizhiv123!',
    database: 'support_app',
});

module.exports = db;
