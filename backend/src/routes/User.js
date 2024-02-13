const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const userController = require('../controller/UserController.js')


route.get('/get-city-movies', userController.getCityMovies);
route.get('/get-date-time-movies', userController.getDateTimeMovie);

module.exports = route;
