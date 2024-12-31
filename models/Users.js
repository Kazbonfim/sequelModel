const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const Role = require('./Roles');

// Definição do modelo User
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Validação: o nome não pode ser nulo
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Validação: o email não pode ser nulo
        unique: true, // Garantir que o email seja único
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true, // O campo occupation não é obrigatório
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // O campo newsletter não é obrigatório
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false, // Validação: a senha (hash) não pode ser nula
    }
}, {
    hooks: {
        // Antes de criar o usuário, geramos o hash da senha
        beforeCreate: async (user) => {
            if (user.hash) {
                const salt = await bcrypt.genSalt(10); // Salting
                user.hash = await bcrypt.hash(user.hash, salt); // Criando o hash
            }
        },

        // Antes de atualizar o usuário, verificamos se a senha foi alterada e, se sim, geramos um novo hash
        beforeUpdate: async (user) => {
            if (user.changed('hash')) {  // Verifica se o campo 'hash' foi alterado
                const salt = await bcrypt.genSalt(10); // Salting
                user.hash = await bcrypt.hash(user.hash, salt); // Criando o hash
            }
        }
    }
});

// Relacionamento entre User e Role
User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
