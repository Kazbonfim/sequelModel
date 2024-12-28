const app = require('./app'); // Inicia o app.js
const sequelize = require('./db/connection'); // Inicia a conexão com DB
const model = require('./models/Users'); // Depois inicializa os modelos do DB

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Banco sincronizado com sucesso!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        })
    })
    .catch((error) => {
        console.log(error);
    });