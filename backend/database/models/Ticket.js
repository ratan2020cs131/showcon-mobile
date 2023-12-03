const mongo = require('mongoose');

const ticket = new mongo.Schema({
    movie: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    seats: [{
        type: String,
        required: true
    }],
    price:{
        type:Number,
        required:true
    }
});

const Ticket = mongo.model('tickets', ticket);

module.exports = Ticket;