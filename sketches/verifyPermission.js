const Permission = require('./models/Permission');

async function getPermissionsForUser(userId) {
    const permissions = await Permission.findAll({
        where: { userId },
        include: [Role, User], // Incluir as informações de Role e User
    });
    return permissions;
}; // Fim

// Exemplo de uso:
getPermissionsForUser(1).then((permissions) => {
    console.log(permissions);
});
