import express from 'express'
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js';
import MovieController from '../controller/MovieController.js';
const route = express.Router();


// route.get('/:id', getAll);
route.get('/search', MovieController.searchMovie);

export default route;