const { DataTypes } = require('sequelize');
const db = require('../db/connection');

// Definindo o modelo Role
const Role = db.define('Role', {
    role: {
        type: DataTypes.ENUM('Dev', 'Admin', 'User'),
        allowNull: false,
        defaultValue: 'User',
    }
});

// Exportando o modelo Role
module.exports = Role;