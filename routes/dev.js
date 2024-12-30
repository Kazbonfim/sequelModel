var express = require('express');
var router = express.Router();
const connection = require('../db/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/dev', (req, res, next)=>{
  res.render('dev-env');
})



module.exports = router;