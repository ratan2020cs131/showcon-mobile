const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const { getAll } = require('../controller/MovieController.js');


route.get('/:id', getAll);

module.exports = route;