const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware');
const AdminController = require('../controller/AdminController');

route.get('/cast', AuthMiddleWare, AdminController.getAllActors);
route.post('/cast', AuthMiddleWare, AdminController.addCast);
route.get('/movies-count', AuthMiddleWare, AdminController.getTotalMovieCount)
route.get('/cinemas-count', AuthMiddleWare, AdminController.getTotalCinema)
route.post('/movie', AuthMiddleWare, AdminController.addMovie);
route.get('/latest-movies', AuthMiddleWare, AdminController.getLatestMovies)

module.exports = route;
