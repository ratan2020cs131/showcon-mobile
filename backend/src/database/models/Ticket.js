import mongo from 'mongoose';

const ticket = new mongo.Schema({
    movieId: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
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
    total: {
        type: Number,
        required: true
    },
    seats: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: true
    }
});

const Ticket = mongo.model('tickets', ticket);

export default Ticket;