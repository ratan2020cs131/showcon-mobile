const express = require('express');
const route = express.Router();
const {
    Signin,
    Register,
    Verify
} = require('../controller/AuthController');

route.get('/signin/:mobileNo',Signin);
route.post('/verify',Verify);
route.post('/register',Register);

module.exports = route;