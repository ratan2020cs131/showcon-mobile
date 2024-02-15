import express from 'express';
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js';
// import { getCinema } from '../controller/MovieController.js';
import CinemaController from '../controller/CinemaController.js';
const route = express.Router();


// route.get('/:id', getCinema);
route.post('/register', AuthMiddleWare, CinemaController.registerCinema);
route.get('/', AuthMiddleWare, CinemaController.getCinema);
route.post('/create-show', AuthMiddleWare, CinemaController.createShow);

export default route;