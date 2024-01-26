const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
require('../database/Connect');
const movie = require('./movie.json');
const Movie = require('../database/models/Movie');

(async function() {
    try{
        const res = await Movie.create(movie);
        console.log("saved: ",res);
    }
    catch(err) {
        console.log("Movie error: ", err);
    }
})();