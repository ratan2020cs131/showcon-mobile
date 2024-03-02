import Cinema from '../database/models/Cinema.js';
import Movie from '../database/models/Movie.js';

const getCityMovies = async (req, res) => {
    try {
        const { zipcode } = req.query;
        if (!zipcode) throw new Error("Please provide a zipcode")
        const result = await Cinema.aggregate([
            { $match: { 'address.zipcode': zipcode } },
            { $unwind: '$screen' },
            { $unwind: '$screen.slots' },
            { $group: { _id: '$screen.slots.booking.movie', movies: { $addToSet: '$screen.slots.booking.movie' } } },
            { $project: { _id: 0, movies: 1 } }
        ]);
        const uniqueMovieIds = result.map(item => item.movies).flat();
        const movies = await Movie.find({ _id: { $in: uniqueMovieIds } });
        res.json(movies);
    } catch (err) {
        console.log('get city movies error: ', err.message);
        res.status(500).send({ message: err.message })
    }
}

const getDateTimeMovie = async (req, res) => {
    try {
        const { date, from, to } = req.query;
        const result = await Cinema.aggregate([
            { $unwind: "$screen" }, // Deconstruct the 'screen' array
            { $unwind: "$screen.slots" }, // Deconstruct the 'slots' array
            { $match: { "screen.slots.booking.dates": date } }, // Match documents where 'dates' field matches the specified date
            { $match: { "screen.slots.time": { $gte: from, $lte: to } } }, // Match documents where 'dates' field matches the specified date
            { $group: { _id: '$screen.slots.booking.movie', movies: { $addToSet: '$screen.slots.booking.movie' } } },
            { $project: { _id: 0, movies: 1 } }
        ]);
        res.send(result);

        // const uniqueMovieIds = result.map(item => item.movies).flat();
        // const movies = await Movie.find({ _id: { $in: uniqueMovieIds } });
        // res.json(movies);
    } catch (err) {
        console.log('get time movies error: ', err.message);
        res.status(500).send({ message: err.message })
    }
}

export default {
    getCityMovies,
    getDateTimeMovie
}