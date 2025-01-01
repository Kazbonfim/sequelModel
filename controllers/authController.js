const User = require('../models/Users');
const bcrypt = require('bcrypt');



module.exports = class authController {
    static login(req, res, next) {

        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;

        res.render('auth/admin-login', { notification });
    }

    static async loginPost(req, res, next) {
        // Lógica
    }

    static register(req, res, next) {

        const { showToast, message } = req.query;
        const notification = showToast === 'true' ? { showToast, message } : null;

        res.render('auth/admin-register', { notification });
    }

    static async registerPost(req, res, next) {
        const { name, email, occupation, newsletter, hash } = req.body;

        const checkIfUserExists = User.findOne({ where: { email: email } });
        if (checkIfUserExists) {
            console.log('Esses dados já existem em nosso sistema');
            res.render('/dev/register');
            return
        }   

        // Criando um objeto usuário, para enviar pro db
        const user = {
            name, 
            email, 
            occupation, 
            role,
            hash, // A senha será criptografada desde o model, não se preocupe mais com isso.
        }

        try {
            await User.create(user);
            // Notificação
            const notification = { showToast: true, message: 'Usuário cadastrado com sucesso!' };
            res.status(302).redirect(`/?showToast=true&message=${encodeURIComponent(notification.message)}`);

        } catch (error) {
            console.error('Ocorreu algum erro antes de enviar os dados para o db: ' + error);
        }
    }
};