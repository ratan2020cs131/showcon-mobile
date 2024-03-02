import express from 'express';
import { AuthMiddleWare } from '../middleware/AuthMiddleware.js';
import ticketController from '../controller/TicketController.js';
const route = express.Router();


route.post('/', AuthMiddleWare, ticketController.createTicket);

export default route;