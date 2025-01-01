require('dotenv').config();
var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT;

// Rota para mostrar a página de registro
router.get('/register', (req, res, next) => {
    const { showToast, message } = req.query;
    const notification = showToast === 'true' ? { showToast, message } : null;
    res.render('admin-register', { notification });
});

// Rota para realizar o cadastro
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, occupation, newsletter, hash } = req.body;
        await User.create({ name, email, occupation, newsletter: newsletter === 'on', hash });

        const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
        res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
    } catch (error) {
        console.log('Erro ao cadastrar dados: ' + error.message);
        console.log('Erro ao cadastrar dados: ' + error);
        
        const notification = { showToast: true, message: 'Erro ao realizar cadastro' };
        res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
    }
});


// Rota para mostrar a página de login
router.get('/login', (req, res, next) => {
    const { showToast, message } = req.query;
    const notification = showToast === 'true' ? { showToast, message } : null;
    res.render('admin-login', { notification });
});

// Rota para processar o login do usuário
router.post('/login', async (req, res, next) => {
    try {
        const { email, hash } = req.body;

        // Buscando o usuário no banco de dados
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const notification = { showToast: true, message: 'Ops!  Algo deu errado' };
            return res.status(401).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }

        // Verificando a senha fornecida com o hash armazenado no banco
        const isPasswordValid = await bcrypt.compare(hash, user.hash);

        if (!isPasswordValid) {
            const notification = { showToast: true, message: 'Ops!  Algo deu errado' };
            return res.status(401).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
        }

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

        //res.send(token) // Envia o token como resposta na tela, não usar fora do debug, está sendo salvo nos cookies, como acima

        const notification = { showToast: true, message: 'Login realizado com sucesso!' };
        return res.status(200).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);

    } catch (error) {
        const notification = { showToast: true, message: 'Erro ao realizar login' };
        return res.status(500).redirect(`/v2/login?showToast=true&message=${encodeURIComponent(notification.message)}`);
    }
});

module.exports = router;