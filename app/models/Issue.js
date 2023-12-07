const db = require('../db'); // Путь к вашему модулю подключения к базе данных
const Sequelize = require('sequelize');

const Issue = db.define('issue', {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assignedTo: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM('pending', 'assigned', 'resolved'),
        defaultValue: 'pending'
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Issue;
