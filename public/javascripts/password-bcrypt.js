const bcrypt = require('bcryptjs');

// Função para verificar a senha
async function verificarSenha(senhaDigitada, hashArmazenado) {
    const senhaValida = await bcrypt.compare(senhaDigitada, hashArmazenado);
    if (senhaValida) {
        console.log('Senha válida');
        // Prosseguir com o login ou outras ações
    } else {
        console.log('Senha inválida');
        // Retornar erro de senha incorreta
    }
}

module.exports = verificarSenha;