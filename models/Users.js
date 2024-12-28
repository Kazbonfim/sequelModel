const { DataTypes } = require('sequelize');

const db = require('../db/connection');

// name, email, occupation, newsletter

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    occupation: {
        type: DataTypes.STRING
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = User;