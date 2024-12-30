var express = require('express');
var router = express.Router();
const User = require('../models/Users');

// Exibir página de atualização
router.get('/edit/:id', async (req, res, next) => {
    try {
        // Obtém parâmetros da query string para a notificação
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;

        // Obtém o ID do usuário a ser editado
        const id = req.params.id;
        const user = await User.findOne({ raw: true, where: { id } });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Converte o campo de newsletter para booleano
        user.newsletter = Boolean(user.newsletter);

        // Renderiza a página de edição com os dados do usuário
        res.render('user-update', { user, notification });

    } catch (error) {
        console.error('Erro na rota /edit/:id', error.message);
        next(error);
    }
});

// Atualização de dados do usuário
router.post('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, occupation } = req.body;
        let { newsletter } = req.body;

        // Converte o campo de newsletter para booleano
        newsletter = newsletter === 'true';

        // Atualiza os dados do usuário no banco
        const [updatedRows] = await User.update(
            { name, email, occupation, newsletter },
            { where: { id } }
        );

        // Verifica se o usuário foi encontrado e atualizado
        if (updatedRows === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Redireciona para o dashboard com a mensagem de sucesso
        const notification = {
            showToast: true,
            message: 'Usuário atualizado com sucesso!'
        };

        res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);

    } catch (error) {
        // Mensagem de erro caso algo dê errado
        const notification = {
            showToast: true,
            message: 'Erro ao atualizar o usuário!'
        };

        res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        console.error('Erro ao atualizar o usuário', error.message);
    }
});

module.exports = router;
