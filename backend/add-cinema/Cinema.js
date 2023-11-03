const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
require('../database/Connect');
const cinema = require('./cinema.json');
const Cinema = require('../database/models/Cinema');

(async function() {
    try{
        const res=await Cinema.create(cinema);
        console.log("saved: ",res);
    }
    catch(err) {
        console.log("Cinema error: ", err);
    }
})();