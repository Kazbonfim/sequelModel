var express = require('express');
var router = express.Router();
const User = require('../models/Users');

// Cadastro
router.get('/register', function (req, res, next) {
  res.render('register'); // Renderizar página de cadastros
});

router.post('/register', async (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter; //Por default 'on'

  if (newsletter === 'on') {
    newsletter = true; //1
  } else {
    newsletter = false; //0
  };

  console.log(req.body);

  // name, email, occupation, newsletter
  await User.create({ name, email, occupation, newsletter });

  res.redirect('/');

});
// Exibição
router.get('/dashboard', async (req, res, next) => {
  // Armazenando todos os dados salvos no sql
  const users = await User.findAll({ raw: true });

  console.log(users);

  res.render('dashboard', { users: users });
});
// Detalhamentos
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
    console.error('Erro na rota /info/:id:', error);
    next(error);
  }
});

// Exclusão
router.post('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    // Log para verificar o ID recebido
    console.log(`Buscando usuário com ID: ${id}`);

    const user = await User.destroy({ where: { id: id } });

    // Log para verificar o resultado da busca
    console.log(`Usuário encontrado:`, user);

    // Se não encontrar nenhum usuário, retornar um erro avisando
    if (user === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.redirect('/users/dashboard');

  } catch (error) {
    console.error('Erro na rota /info/:id:', error);
    next(error);
  }
});


module.exports = router;
