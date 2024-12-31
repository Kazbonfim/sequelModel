const crypto = require('crypto');

// Gerar uma chave secreta aleatória
const secretKey = crypto.randomBytes(64).toString('hex');

console.log('Chave secreta gerada:', secretKey);