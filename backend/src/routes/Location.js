import express from 'express';
import LocationController from "../controller/LocationController.js";
const route = express.Router();

route.get('/address', LocationController.getAddress);

export default route;