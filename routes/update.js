var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Exibir página de atualização
router.get('/edit/:id', async (req, res, next) => {
    try {

        // Notificação de criação de usuários
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;

        const id = req.params.id;

        const user = await User.findOne({ raw: true, where: { id: id } });

        console.log(`Área de edição para: ${user}`);

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        user.newsletter = Boolean(user.newsletter);

        res.render('user-update', { user, notification });

    } catch (error) {
        console.error('Erro na rota /update/:id' + error.message);
        next(error);
    }
});

// Atualização
router.post('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, occupation, hash } = req.body;
        let { newsletter } = req.body;

        if (newsletter === 'true') {
            newsletter = true;
        } else if (newsletter === 'false') {
            newsletter = false;
        }

        const [updatedRows] = await User.update(
            { name, email, occupation, newsletter },
            { where: { id: id } }
        );

        // Verifica se o usuário foi encontrado e atualizado
        if (updatedRows === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Redirecionamento com parâmetros para notificação
        const notification = {
            showToast: true,
            message: 'Usuário atualizado com sucesso!'
        };

        res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
    } catch (error) {

        const notification = {
            showToast: true,
            message: 'Erro ao atualizar o usuário!'
        };

        res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        console.log('Erro ao deletar o usuário' + error.message); // Log
    }
});

module.exports = router;