const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = require('./Users');

// id, title, description, status
const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.ENUM('pendente', 'em progresso', 'concluído', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    }
})

Task.belongsTo(User); //Informando que, este conjunto de dados pertence ao modelo User

module.exports = Task;