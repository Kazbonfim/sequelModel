var express = require('express');
var router = express.Router();
const connection = require('../db/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  
});



module.exports = router;