// Inicializando conexão do banco de dados e aplicação usando ORM
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', '1234', {
    host: 'localhost', 
    dialect: 'mysql', 
})

// try {
//     sequelize.authenticate()
//     console.log('Conectado com sucesso ao banco de dados');
// } catch (error) {
//     console.log(error);
// }

module.exports = sequelize;
