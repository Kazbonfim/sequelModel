module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
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
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.AdminUser, { foreignKey: 'userId', as: 'adminUser' });
        Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Task;
};