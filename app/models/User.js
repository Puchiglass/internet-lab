const db = require('../db'); // Путь к модулю подключения к базе данных
const Sequelize = require('sequelize');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = User;
