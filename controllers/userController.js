const User = require('../models/Users');
const Task = require('../models/Tasks');
const Role = require('../models/Roles');
const Permission = require('../models/Permissions');
const bcrypt = require('bcrypt');

// Controlador de cadastros
module.exports = class userController {

    static register(req, res, next) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;

        res.render('register', { notification });
    }

    static async userInfo(req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ raw: true, where: { id: id } });
            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }
            res.render('user-info', { user });
        } catch (error) {
            console.error('Erro na rota /info/:id:' + error.message);
            next(error);
        }
    }

    static async userEdit(req, res, next) {
        try {
            const { showToast, message } = req.query;
            const notification = showToast === 'true' ? { showToast, message } : null;
            const id = req.params.id;
            const user = await User.findOne({ raw: true, where: { id: id } });
            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }
            res.render('user-update', { user, notification });
        } catch (error) {
            console.error('Erro na rota /update/:id' + error.message);
            next(error);
        }
    }

    static async registerPost(req, res, next) {
        try {
            console.log('🎲', req.body)
            const { name, email, occupation, newsletter, hash } = req.body;

            await User.create({
                name,
                email,
                occupation,
                newsletter: newsletter === 'on',
                hash,
            });

            const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
            res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);

        } catch (error) {
            console.log('Erro ao salvar dados: ' + error.message);
            console.log('Detalhes: ' + error);

            const notification = { showToast: true, message: 'Erro ao realizar cadastro' };
            res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static async userDelete(req, res, next) {
        try {
            const id = req.params.id;
            await User.destroy({ where: { id } });
            const notification = { showToast: true, message: 'Usuário deletado com sucesso!' };
            res.status(303).redirect(`/v1/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        } catch (error) {
            const notification = { showToast: true, message: 'Erro ao deletar o usuário!' };
            res.status(303).redirect(`/v1/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }
    
    static async userUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, occupation, hash } = req.body;
            const newsletter = req.body.newsletter === 'true';
            const [updatedRows] = await User.update({ name, email, occupation, newsletter, hash }, { where: { id } });
            if (updatedRows === 0) {
                return res.status(404).send('Usuário não encontrado');
            }
            const notification = { showToast: true, message: 'Usuário atualizado com sucesso!' };
            res.status(303).redirect(`/v1/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        } catch (error) {
            const notification = { showToast: true, message: 'Erro ao atualizar o usuário!' };
            res.status(303).redirect(`/v1/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }
}