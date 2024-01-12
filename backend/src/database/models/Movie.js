const mongo = require('mongoose');
const jwt = require('jsonwebtoken');


const movie = new mongo.Schema({
    title: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    cinema: [{
        id: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: false
        },
        schedule: [{
            date: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }],
    }],
    cast: [{
        img: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    description:{
        type:String,
        required:true
    }
});

const Movie = mongo.model('movies', movie);

module.exports = Movie;