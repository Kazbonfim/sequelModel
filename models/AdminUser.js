const { DataTypes } = require('sequelize');
const db = require('../db/connection'); // Conexão com o banco de dados

const AdminUser = db.define('AdminUser', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    occupation: {
        type: DataTypes.STRING
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Dev', 'User'),
        defaultValue: 'Admin'
    }
});

module.exports = AdminUser;
