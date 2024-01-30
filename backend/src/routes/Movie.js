const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const movieController = require('../controller/MovieController.js');


// route.get('/:id', movieController.getAll);
route.get('/search', movieController.searchMovie);

module.exports = route;