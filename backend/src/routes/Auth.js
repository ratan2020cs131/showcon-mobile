const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const authController = require('../controller/AuthController');

route.get('/signin/:mobileNo', authController.Signin);
route.post('/verify', authController.Verify);
route.post('/register', authController.Register);
route.get('/profile', AuthMiddleWare, authController.ProfileData);
route.put('/profile', AuthMiddleWare, authController.ProfileUpdate);
route.get('/logout', AuthMiddleWare, authController.Logout);
route.get('/history', AuthMiddleWare, authController.History);

module.exports = route;