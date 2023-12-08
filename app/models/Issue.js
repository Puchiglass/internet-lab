const db = require('../db');
const { DataTypes } = require('sequelize');

const Issue = db.define('Issue', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assignedTo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'assigned', 'resolved'),
        defaultValue: 'pending',
        allowNull: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

// Автоматически создаст таблицу, если её нет
Issue.sync()
    .then(() => console.log('Таблица успешно создана'))
    .catch(error => console.error('Ошибка создания таблицы:', error));

module.exports = Issue;
