require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/AdminUser');
const secretKey = process.env.JWT;

class AdminController {
    static adminRegister(req, res) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        res.render('adminSignupPage', { notification });
    }

    static async adminRegisterPost(req, res) {
        try {
            const { name, email, occupation, newsletter, hash, role } = req.body;

            const hashedPassword = await bcrypt.hash(hash, 10); // Hashing a senha
            const user = await AdminUser.create({
                name,
                email,
                occupation,
                newsletter: newsletter === 'on',
                hash: hashedPassword,
                role,
            });

            req.session.userId = user.id;
            req.session.save(() => {
                const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
                res.status(303).redirect(`/?showToast=true&message=${encodeURIComponent(notification.message)}`);
            });
        } catch (error) {
            console.error('Erro ao cadastrar dados:', error);

            const notification = { showToast: true, message: 'Erro ao realizar cadastro' };
            res.status(303).redirect(`/v2/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static adminLogin(req, res) {
        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;
        res.render('adminLoginPage', { notification });
    }

    static async adminLoginPost(req, res) {
        try {
            const { email, hash } = req.body;

            const user = await AdminUser.findOne({ where: { email } });

            if (!user) {
                const notification = { showToast: true, message: 'Usuário incorreto, tente novamente' };
                return res.status(401).redirect(`/?showToast=true&message=${encodeURIComponent(notification.message)}`);
            }

            const isPasswordValid = await bcrypt.compare(hash, user.hash);

            if (!isPasswordValid) {
                const notification = { showToast: true, message: 'Senha incorreta, tente novamente' };
                return res.status(401).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
            res.cookie("token", token, {
                httpOnly: true,
                path: "/",
            });

            req.session.userId = user.id;
            req.session.save(() => {
                const notification = { showToast: true, message: 'Login realizado com sucesso!' };
                return res.status(303).redirect(`/?showToast=true&message=${encodeURIComponent(notification.message)}`);
            });
        } catch (error) {
            console.error('Erro ao realizar login:', error);

            const notification = { showToast: true, message: 'Erro ao realizar login' };
            return res.status(500).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }
    }

    static adminLogout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
}

module.exports = AdminController;
