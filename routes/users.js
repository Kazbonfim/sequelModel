var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Exibir página de cadastros
router.get('/register', function (req, res, next) {

  // Notificação de criação de usuários
  const { showToast, message } = req.query;
  const notification = showToast === 'true' ? { showToast, message } : null;

  res.render('register', { notification }); // Renderizar página de cadastros
});

// Exibir página de usuários 🫡
router.get('/dashboard', async (req, res, next) => {

  const { showToast, message } = req.query;

  const notification = showToast === 'true' ? { showToast, message } : null;

  // Pegando e exibindo dados salvos no SQL
  const users = await User.findAll({ raw: true });

  const qtdAtivos = await User.count();

  console.log(`Usuários ativos no momento? ${qtdAtivos}`);

  res.render('dashboard', { users: users, notification, qtdAtivos });

});

// Exibir página de informações de
router.get('/info/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    // Log para verificar o ID recebido
    console.log(`Buscando usuário com ID: ${id}`);

    const user = await User.findOne({ raw: true, where: { id: id } });

    // Log para verificar o resultado da busca
    console.log(`Usuário encontrado:`, user);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.render('user-info', { user });

  } catch (error) {
    console.error('Erro na rota /info/:id:' + error.message);
    next(error);
  }
});

// Exibir página de atualização 🫡
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

    res.render('user-update', { user, notification });

  } catch (error) {
    console.error('Erro na rota /update/:id' + error.message);
    next(error);
  }
});

// Cadastro
router.post('/register', async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter; //Por default 'on'
    const hash = req.body.hash; //Por default 'on'

    if (newsletter === 'on') {
      newsletter = true; //1
    } else {
      newsletter = false; //0
    };

    // Criptografia de senhas
    if (hash) {
      // Gerar o hash da senha (caso tenha sido fornecida)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(hash, salt); // Gerando o hash da senha
      // Criar o usuário com o hash da senha gerado
      await User.create({ name, email, occupation, newsletter, hash: hashedPassword });
    } else {
      // Caso o hash (senha) não tenha sido fornecido, criar o usuário sem senha
      await User.create({ name, email, occupation, newsletter });
    }

    console.log(req.body);

    // Redirecionamento com parâmetros para notificação
    const notification = {
      showToast: true,
      message: 'Usuário cadastrado com sucesso!'
    };

    // Envia a notificação como queryparams
    res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
    console.log('Usuário cadastrado com sucesso!') // Log

  } catch (error) {

    const notification = {
      showToast: true,
      message: 'Erro ao realizar cadastro'
    };

    // Envia a notificação como queryparams
    res.status(303).redirect(`/v1/users/register?showToast=true&message=${encodeURIComponent(notification.message)}`);
    console.log('Erro ao realizar cadastro' + error.message); // Log
  }
});

// Exclusão
router.post('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({ where: { id } });

    if (user === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    // Redirecionamento com parâmetros para notificação
    const notification = {
      showToast: true,
      message: 'Usuário deletado com sucesso!'
    };

    res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
    console.log('Usuário deletado com sucesso'); // Log

  } catch (error) {

    const notification = {
      showToast: true,
      message: 'Erro ao deletar o usuário!'
    };

    res.status(303).redirect(`/v1/users/dashboard?showToast=true&message=${encodeURIComponent(notification.message)}`);
    console.log('Erro ao deletar o usuário' + error.message); // Log
  }
});

// Atualização 🫡
router.post('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, occupation, hash } = req.body;
    let { newsletter } = req.body;

    if (newsletter === 'true') {
      newsletter = true;
    } else {
      newsletter = false;
    }

    const [updatedRows] = await User.update(
      { name, email, occupation, newsletter, hash },
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