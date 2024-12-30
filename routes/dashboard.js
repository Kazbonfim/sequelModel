var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Exibir página de usuários 🫡
router.get('/', async (req, res, next) => {

    const { showToast, message } = req.query;

    const notification = showToast === 'true' ? { showToast, message } : null;

    // Pegando e exibindo dados salvos no SQL
    const users = await User.findAll({ raw: true });

    const qtdAtivos = await User.count();

    console.log(`Usuários ativos no momento? ${qtdAtivos}`);

    res.render('dashboard', { users: users, notification, qtdAtivos });

});

module.exports = router;