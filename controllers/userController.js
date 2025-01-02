const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        res.render('userSignupPage', { notification });
    }

    static async userInfo(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ raw: true, where: { id } });

            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('userProfilePage', { user });
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error.message);
            next(error);
        }
    }

    static async userEdit(req, res, next) {
        try {
            const { id } = req.params;
            const { showToast, message } = req.query;
            const notification = showToast === 'true' ? { showToast, message } : null;

            const user = await User.findOne({ raw: true, where: { id } });

            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('userEditPage', { user, notification });
        } catch (error) {
            console.error('Erro ao carregar página de edição:', error.message);
            next(error);
        }
    }

    static async registerPost(req, res, next) {
        try {
            const { name, email, occupation, newsletter, hash } = req.body;

            const hashedPassword = await bcrypt.hash(hash, 10); // Hashing a senha
            await User.create({
                name,
                email,
                occupation,
                newsletter: newsletter === 'on',
                hash: hashedPassword,
            });

            const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
            res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);

            const notification = { showToast: true, message: 'Erro ao realizar cadastro' };
            res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static async userDelete(req, res, next) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });

            const notification = { showToast: true, message: 'Usuário deletado com sucesso!' };
            res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.message);

            const notification = { showToast: true, message: 'Erro ao deletar o usuário!' };
            res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static async userUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, occupation, hash } = req.body;
            const newsletter = req.body.newsletter === 'true';

            const hashedPassword = await bcrypt.hash(hash, 10); // Atualizar com hash se fornecido
            const [updatedRows] = await User.update(
                { name, email, occupation, newsletter, hash: hashedPassword },
                { where: { id } }
            );

            if (updatedRows === 0) {
                return res.status(404).send('Usuário não encontrado');
            }

            const notification = { showToast: true, message: 'Usuário atualizado com sucesso!' };
            res.status(303).redirect(`/v1/users/info/${id}?showToast=true&message=${encodeURIComponent(notification.message)}`);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error.message);

            const notification = { showToast: true, message: 'Erro ao atualizar o usuário!' };
            res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static async loadDashboard(req, res, next) {
        try {
            const { showToast, message } = req.query;
            const notification = showToast === 'true' ? { showToast, message } : null;

            const users = await User.findAll({ raw: true });
            const qtdAtivos = await User.count();

            res.render('adminDashboard', { user: req.user, users, notification, qtdAtivos });
        } catch (error) {
            console.error('Erro ao carregar o dashboard:', error.message);
            next(error);
        }
    }
}

module.exports = UserController;
