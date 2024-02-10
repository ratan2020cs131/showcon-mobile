const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const { getCinema } = require('../controller/MovieController.js');
const CinemaController = require('../controller/CinemaController.js');


route.get('/:id', getCinema);
route.post('/register', AuthMiddleWare, CinemaController.registerCinema);
route.get('/', AuthMiddleWare, CinemaController.getCinema);

module.exports = route;