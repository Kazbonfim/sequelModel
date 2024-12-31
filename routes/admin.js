var express = require('express');
var router = express.Router();
const Permission = require('../models/Permissions');
const Role = require('../models/Roles');
const User = require('../models/Users');
const Task = require('../models/Tasks');
const bcrypt = require('bcrypt');

router.get('/register', (req, res, next) => {
    res.render('admin-register');
});

module.exports = router;