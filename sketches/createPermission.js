const Permission = require('../models/Permissions');
const Role = require('../models/Role');
const User = require('../models/User');

// Exemplo de como criar uma permissão

async function assignPermissionToUser(userId, roleId) {
    const permission = await Permission.create({
        userId,
        roleId
    });

    console.log(`Permissão criada: userId: ${userId}, roleId: ${roleId}`);
}; // Fim da func.