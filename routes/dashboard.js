var express = require('express');
var router = express.Router();
const User = require('../models/Users');

// Rota para exibir o dashboard
router.get('/', async (req, res, next) => {
    try {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        const users = await User.findAll({ raw: true });
        const qtdAtivos = await User.count();
        res.render('dashboard', { users, notification, qtdAtivos });
    } catch (error) {
        console.error('Erro ao carregar o dashboard: ' + error.message);
        next(error);
    }
});

module.exports = router;
