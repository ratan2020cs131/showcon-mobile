const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const { getCinema } = require('../controller/MovieController.js');


route.get('/:id', getCinema);

module.exports = route;