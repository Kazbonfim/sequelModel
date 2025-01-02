require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Task = require('../models/Tasks');
const Roles = require('../models/Roles');
const Permission = require('../models/Permissions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT;

module.exports = class {
    static adminRegister(req, res, next) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        res.render('adminSignupPage', { notification });
    }

    static async adminRegisterPost(req, res, next) {
        try {
            const { name, email, occupation, newsletter, hash } = req.body;

            const user = await User.create({ name, email, occupation, newsletter: newsletter === 'on', hash });

            req.session.userId = user.id;
            req.session.save(() => {
                // res.redirect('/');
                const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
                res.status(303).redirect(`/v2/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
            })

        } catch (error) {
            console.log('0.Debug de Sessão: ' + req.session.userId)
            console.log('1.Erro ao cadastrar dados: ' + error.message);
            console.log('2.Erro ao cadastrar dados: ', error);

            const notification = { showToast: true, message: 'Erro ao realizar cadastro' };
            res.status(303).redirect(`/v2/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static adminLogin(req, res, next) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        res.render('adminLoginPage', { notification });
    }

    static async adminLoginPost(req, res, next) {
        try {
            const { email, hash } = req.body;

            // Buscando o usuário no banco de dados
            const user = await User.findOne({ where: { email } });

            if (!user) {
                const notification = { showToast: true, message: 'Usuário incorreto, tente novamente' };
                return res.status(401).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
            }

            // Verificando a senha fornecida com o hash armazenado no banco
            const isPasswordValid = await bcrypt.compare(hash, user.hash);

            if (!isPasswordValid) {
                const notification = { showToast: true, message: 'Senha incorreto, tente novamente' };
                return res.status(401).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
            }

            // Isso será uma implementação futura, mas deixarei os primeiros passos aqui
            // Gerando o JWT com o id e o email do usuário
            const token = jwt.sign(
                { id: user.id, email: user.email },
                secretKey,
                { expiresIn: '1h' }
            );
            // Salvando nos Cookies do navegador
            res.cookie("token", token, {
                httpOnly: false,
                path: "/",
            })
            //res.send(token) // Debug, pra saber se está dando tudo certo

            req.session.userId = user.id;
            req.session.save(() => {
                // res.redirect('/');
                const notification = { showToast: true, message: 'Login realizado com sucesso!' };
                return res.status(303).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
            })

        } catch (error) {
            const notification = { showToast: true, message: 'Erro ao realizar login' };
            return res.status(500).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static async adminLogout(req, res, next) {
        console.log('Destruindo sessão...')
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }

}