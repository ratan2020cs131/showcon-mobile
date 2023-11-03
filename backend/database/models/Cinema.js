const mongo = require('mongoose');

const cinema = new mongo.Schema({
    title: {
        type: String,
        required: true
    },
    seats: [{
        row: {
            type: String,
            required: true,
        },
        seat: [{
            type: Number,
            required: true
        }]
    }]
});

const Cinema = mongo.model('cinemas', cinema);

module.exports = Cinema;