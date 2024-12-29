const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// name, email, occupation, newsletter, hash
const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    occupation: {
        type: DataTypes.STRING
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    },
    hash: {
        type: DataTypes.STRING
    }
});

// Gerar o hash antes de criar ou atualizar o usuário
User.beforeCreate(async (user) => {
    if (user.hash) {
        const salt = await bcrypt.genSalt(10); // Salting
        user.hash = await bcrypt.hash(user.hash, salt); // Criando o hash
    }
});

User.beforeUpdate(async (user) => {
    if (user.hash) {
        const salt = await bcrypt.genSalt(10); // Salting
        user.hash = await bcrypt.hash(user.hash, salt); // Criando o hash
    }
});

module.exports = User;