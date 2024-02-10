const express = require('express');
const route = express.Router();
const LocationController = require("../controller/LocationController");

route.get('/address', LocationController.getAddress);

module.exports = route;