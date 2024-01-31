const Actor = require('../database/models/Actor');
const Movie = require('../database/models/Movie');
const Cinema = require('../database/models/Cinema')

//ADD NEW ACTOR
const addCast = async (req, res) => {
    try {
        const { name, image } = req.body;
        const actor = new Actor({ name, image });
        const result = await actor.save();
        if (!result) {
            throw new Error("Error saving data in mongoDB")
        } else {
            res.send({ message: 'Actor saved successfully', result });
        }
    } catch (err) {
        console.log("Add new actor error: ", err.message);
        res.status(500).send({ message: err.message });
    }
}

//GET ALL ACTORS
const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        if (actors) {
            res.send(actors)
        } else {
            throw new Error("Error in fetching actors from mongoDB");
        }
    } catch (err) {
        console.log({ 'Get all actors error: ': err.message });
    }
}


const addMovie = async (req, res) => {
    try {
        const { title, genre, primaryPoster, secondaryPoster, duration, description, casts, release } = req.body;
        const movie = new Movie({ title, genre, primaryPoster, secondaryPoster, duration, description, casts, release });
        const result = await movie.save();
        if (result) {
            res.send(result);
        } else {
            throw new Error("Error in saving movie in mongoDB")
        }
    } catch (err) {
        console.log({ 'Add new movie error: ': err.message });
        res.status(500).send({ message: err.message })
    }
}


const getLatestMovies = async (req, res) => {
    try {
        if (req.query.limit > 100) {
            res.status(400).send({ message: "Only 100 movies at a time" });
        }
        else {
            const result = await Movie.find().sort({ _id: -1 }).limit(req.query.limit || 1).populate('casts', 'name image')
            res.send(result);
        }
    } catch (err) {
        console.log("Get latest movie error: ", err.message);
        res.status(500).send({ message: err.messge });
    }
}

const getTotalMovieCount = async (req, res) => {
    try {
        const count = await Movie.countDocuments({});
        if(count){
            res.send({count:count})
        }else{
            throw new Error("Error in fetching data from mongoDB");
        }
    } catch (err) {
        console.log("Get total movie count error: ", err.message);
    }
}


const getTotalCinema = async (req, res) => {
    try {
        const count = await Cinema.countDocuments({});
        if(count){
            res.send({count:count})
        }else{
            throw new Error("Error in fetching data from mongoDB");
        }
    } catch (err) {
        console.log("Get total cinema count error: ", err.message);
    }
}


module.exports = {
    addCast,
    getAllActors,
    addMovie,
    getLatestMovies,
    getTotalMovieCount,
    getTotalCinema,
}