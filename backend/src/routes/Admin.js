import express from 'express'
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js'
import AdminController from '../controller/AdminController.js'
const route = express.Router();

route.get('/cast', AuthMiddleWare, AdminController.getAllActors);
route.post('/cast', AuthMiddleWare, AdminController.addCast);
route.get('/movies-count', AuthMiddleWare, AdminController.getTotalMovieCount)
route.get('/cinemas-count', AuthMiddleWare, AdminController.getTotalCinema)
route.post('/movie', AuthMiddleWare, AdminController.addMovie);
route.get('/latest-movies', AuthMiddleWare, AdminController.getLatestMovies)
route.get('/unapprove-cinema', AuthMiddleWare, AdminController.getUnapproveCinema)
route.put('/approve-cinema', AuthMiddleWare, AdminController.approveCinema)

export default route;
