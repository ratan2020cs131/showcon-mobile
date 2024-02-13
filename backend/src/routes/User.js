import express from 'express'
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js'
import userController from '../controller/UserController.js'
const route = express.Router();


route.get('/get-city-movies', userController.getCityMovies);
route.get('/get-date-time-movies', userController.getDateTimeMovie);

export default route;
