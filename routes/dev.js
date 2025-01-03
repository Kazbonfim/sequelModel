var express = require('express');
var router = express.Router();
const connection = require('../db/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/dev', (req, res, next) => {
  res.render('devEnvPage');
});

// Essa rota vai testar todos os formulários; direcione o formulário pra cá, e ele vai exibir os dados recebidos em seus respectivos campos contendo o atributo 'name=""'
router.post('/rota-x', (req, res) => {
  const campos = req.body;
  console.log('Campos recebidos:', campos);
  res.json({ mensagem: 'Campos recebidos com sucesso', dados: campos });
  res.status(200).redirect('/')
});


module.exports = router;