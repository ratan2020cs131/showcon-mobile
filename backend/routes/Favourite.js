const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const {FavouriteController, getFavouriteController} = require('../controller/FavouriteController.js')

route.post("/", AuthMiddleWare, FavouriteController);
route.get("/", AuthMiddleWare, getFavouriteController);

module.exports = route;