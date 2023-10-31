const express = require('express');
const route = express.Router();
const {
    Signin,
    Register
} = require('../controller/AuthController');

route.get('/signin/:mobileNo',Signin);
route.post('/register',Register);

module.exports = route;