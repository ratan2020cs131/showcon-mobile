const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const MovieController = require('../controller/MovieController.js');


// route.get('/:id', getAll);
route.get('/search', MovieController.searchMovie);

module.exports = route;