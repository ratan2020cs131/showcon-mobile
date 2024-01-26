const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const {FavouriteController, getFavouriteController, DelFavouriteController} = require('../controller/FavouriteController.js')

route.post("/", AuthMiddleWare, FavouriteController);
route.delete("/", AuthMiddleWare, DelFavouriteController);
route.get("/", AuthMiddleWare, getFavouriteController);

module.exports = route;