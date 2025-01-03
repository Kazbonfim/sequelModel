const Task = require('./Task');
const User = require('./User');
const AdminUser = require('./AdminUser');

// Definindo os relacionamentos
AdminUser.hasMany(Task, { foreignKey: 'adminUserId' });  // AdminUser tem muitas Tasks
AdminUser.hasMany(User, { foreignKey: 'adminUserId' });  // AdminUser pode criar muitos Users
User.hasMany(Task, { foreignKey: 'userId' });  // User tem muitas Tasks
User.belongsTo(AdminUser, { foreignKey: 'adminUserId' });  // User pertence a AdminUser
Task.belongsTo(AdminUser, { foreignKey: 'adminUserId' });  // Task pertence a AdminUser
Task.belongsTo(User, { foreignKey: 'userId' });  // Task pertence a User

module.exports = {
    Task,
    User,
    AdminUser
};