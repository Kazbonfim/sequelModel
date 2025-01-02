module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
            defaultValue: 'User'
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Task, { foreignKey: 'userId' });
    };

    return User;
};