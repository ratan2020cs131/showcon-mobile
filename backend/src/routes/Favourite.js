import express from 'express';
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js';
import favController from '../controller/FavouriteController.js';
const route = express.Router();

route.post("/", AuthMiddleWare, favController.addFav);
route.delete("/", AuthMiddleWare, favController.delFav);
route.get("/", AuthMiddleWare, favController.getFav);

export default route;