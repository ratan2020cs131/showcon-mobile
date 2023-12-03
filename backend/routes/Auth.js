const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const {
    Signin,
    Register,
    Verify,
    ProfileData,
    Logout,
    ProfileUpdate,
    History
} = require('../controller/AuthController');

route.get('/signin/:mobileNo', Signin);
route.post('/verify', Verify);
route.post('/register', Register);
route.get('/profile', AuthMiddleWare, ProfileData);
route.put('/profile', AuthMiddleWare, ProfileUpdate);
route.get('/logout', AuthMiddleWare, Logout);
route.get('/history', AuthMiddleWare, History);

module.exports = route;