const { DataTypes } = require('sequelize');
const db = require('../db/connection'); // Conexão com o banco de dados

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('Pendente', 'Em progresso', 'Concluído'),
        defaultValue: 'Pendente'
    },
    userId: { // Adicionando a chave estrangeira
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // Nome do modelo referenciado
            key: 'id'
        }
    },
    adminUserId: { // Adicionando a chave estrangeira
        type: DataTypes.INTEGER,
        references: {
            model: 'AdminUser', // Nome do modelo referenciado
            key: 'id'
        }
    }
});

module.exports = Task;
