const express = require('express');
const route = express.Router();
const {AuthMiddleWare} = require('../middleware/AuthMiddleware.js')
const {
    Signin,
    Register,
    Verify,
    ProfileData
} = require('../controller/AuthController');

route.get('/signin/:mobileNo',Signin);
route.post('/verify',Verify);
route.post('/register',Register);
route.get('/profile', AuthMiddleWare, ProfileData);

module.exports = route;