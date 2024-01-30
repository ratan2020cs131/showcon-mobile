const express = require('express');
const route = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminController = require('../controller/AdminController');

route.get('/cast', AdminController.getAllActors);
route.post('/cast', AdminController.addCast);

module.exports = route;