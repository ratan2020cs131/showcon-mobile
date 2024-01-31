const express = require('express');
const route = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminController = require('../controller/AdminController');

route.get('/cast', AdminController.getAllActors);
route.post('/cast', AdminController.addCast);
route.get('/movies-count', AdminController.getTotalMovieCount)
route.get('/cinemas-count', AdminController.getTotalCinema)
route.post('/movie', AdminController.addMovie);
route.get('/latest-movies', AdminController.getLatestMovies)

module.exports = route;
