const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Role = require('./Roles');
const User = require('./Users');

// id, roleId, userId
const Permission = db.define('Permission', {
    roleId: {
        type: DataTypes.INTEGER, //
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
});

//Informando que, este conjunto de dados pertence ao modelo User
Permission.belongsTo(Role, { foreignKey: 'roleId' });
Permission.belongsTo(User, { foreignKey: 'userId' });

module.exports = Permission;