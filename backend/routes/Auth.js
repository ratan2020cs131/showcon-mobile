const express = require('express');
const route = express.Router();
const {
    Signin,
    Register,
    Verify,
    ProfileData
} = require('../controller/AuthController');
const {AuthMiddleWare} = require('../middleware/AuthMiddleware.js')

route.get('/signin/:mobileNo',Signin);
route.post('/verify',Verify);
route.post('/register',Register);
route.get('/profile', AuthMiddleWare, ProfileData);

module.exports = route;