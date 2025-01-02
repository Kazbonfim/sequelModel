const User = require('../models/Users');
const Role = require('../models/Users');
const bcrypt = require('bcrypt');

async function registerUser(name, email, occupation, newsletter, password, role) {
    try {
        // Verifica se o papel (role) existe no banco de dados ou cria um novo
        const [userRole, created] = await Role.findOrCreate({
            where: { role: role || 'User' } // Se não passar um role, o padrão será 'User'
        });

        // Criação do usuário com a associação do Role
        const newUser = await User.create({
            name,
            email,
            occupation,
            newsletter,
            hash: password, // A senha será criptografada pelo hook antes de ser salva
            roleId: userRole.id // Associando o Role ao usuário
        });

        console.log('Usuário registrado com sucesso:', newUser);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
    }
}

// Exemplo de uso da função de registro
registerUser(
    'Lucas Bonfim',
    'lucas@example.com',
    'Developer',
    true,
    '123456', // Senha do usuário
    'Dev' // Role desejado
);
