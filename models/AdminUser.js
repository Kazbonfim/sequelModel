// AdminUser.js
module.exports = (sequelize, DataTypes) => {
    const AdminUser = sequelize.define('AdminUser', {
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

    AdminUser.associate = (models) => {
        AdminUser.hasMany(models.Task, { foreignKey: 'userId' });
    };

    return AdminUser;
};