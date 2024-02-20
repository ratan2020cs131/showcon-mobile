import Movie from '../database/models/Movie.js'
import Cinema from '../database/models/Cinema.js'


//GET ALL MOVIES
const getAll = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Movie.find({});

        for (const movie of result) {
            for (const item of movie.cinema) {
                const cinema = await Cinema.findById(item.id);
                item.name = cinema.title;
            }
        }

        res.json(result);
    }
    catch (err) {
        console.log("Get Movie Error: ", err);
    }
}

//GET CINEMA
const getCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cinema.findById({ _id: id });
        if (!result) {
            throw ("Cinema not found")
        } else {
            res.send(result);
        }
    }
    catch (error) {
        console.log("Get Cinema Error: ", error);
        res.status(404).send({ error });
    }
}

const searchMovie = async (req, res) => {
    try {
        const search = req.query.title;
        const movies = await Movie.find({ title: { $regex: ".*" + search + ".*", $options:'i' } });
        res.send(movies);
    } catch (err) {
        console.log("Search movie error: ", err.message);
        res.status(500).send({ message: err.message });
    }
}

export default {
    getAll,
    getCinema,
    searchMovie
}