var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')


router.get('/register', adminController.adminRegister); //OK

router.post('/register', adminController.adminRegisterPost); //OK

router.get('/login', adminController.adminLogin); //OK

router.post('/login', adminController.adminLoginPost); //OK

router.get('/logout', adminController.adminLogout);


module.exports = router;