const express = require('express');
const route = express.Router();
const { AuthMiddleWare } = require('../middleware/AuthMiddleware.js')
const { createTicket } = require('../controller/TicketController.js');


route.post('/',AuthMiddleWare, createTicket);

module.exports = route;