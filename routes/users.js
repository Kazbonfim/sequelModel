var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./users');

router.get('/register', userController.register); //OK

router.post('/register', userController.registerPost); //OK

router.get('/info/:id', userController.userInfo); //OK

router.get('/edit/:id', userController.userEdit); //OK

router.post('/delete/:id', userController.userDelete); //OK

router.post('/update/:id', userController.userUpdate); //OK


module.exports = router;