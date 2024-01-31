const mongo = require('mongoose');
const jwt = require('jsonwebtoken');


// const movie = new mongo.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     banner: {
//         type: String,
//         required: true
//     },
//     cinema: [{
//         id: {
//             type: String,
//             required: true
//         },
//         name:{
//             type: String,
//             required: false
//         },
//         schedule: [{
//             date: {
//                 type: String,
//                 required: true
//             },
//             time: {
//                 type: String,
//                 required: true
//             }
//         }],
//     }],
//     cast: [{
//         img: {
//             type: String,
//             required: true
//         },
//         name: {
//             type: String,
//             required: true
//         }
//     }],
//     description:{
//         type:String,
//         required:true
//     }
// });

const movie = new mongo.Schema({
    title: {
        type: String,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    release: {
        type: String,
        required: true
    },
    duration: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    casts: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'actors'
    }],
    primaryPoster:{
        type:String,
        required:true
    },
    secondaryPoster:[{
        type:String,
        required:false
    }]
})

const Movie = mongo.model('movies', movie);
module.exports = Movie;


// title: '',
// genre: [],
// primaryPoster: null,
// secondaryPoster: [],
// duration: [],
// description: '',
// casts: [],
// release:null