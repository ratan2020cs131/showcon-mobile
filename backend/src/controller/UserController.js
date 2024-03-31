import Cinema from '../database/models/Cinema.js';
import Movie from '../database/models/Movie.js';
import mongoose from 'mongoose';

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
        const movies = await Movie.find({ _id: { $in: uniqueMovieIds } }).populate('casts');
        res.json(movies);
    } catch (err) {
        console.log('get city movies error: ', err.message);
        res.status(500).send({ message: err.message })
    }
}

const getDateTimeMovie = async (req, res) => {
    try {
        const { date, from, to, zipcode } = req.query;
        const result = await Cinema.aggregate([
            { $match: { "address.zipcode": zipcode } },
            { $unwind: "$screen" },
            { $unwind: "$screen.slots" },
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $gte: [
                                    {
                                        $toDate: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$$NOW" } },
                                                "T",
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $substr: ["$screen.slots.time", 6, 2] }, "AM"] },
                                                        then: { $substr: ["$screen.slots.time", 0, 5] },
                                                        else: {
                                                            $concat: [
                                                                {
                                                                    $toString: {
                                                                        $cond: {
                                                                            if: { $eq: [{ $add: [{ $toInt: { $substr: ["$screen.slots.time", 0, 2] } }, 12] }, 24] },
                                                                            then: { $substr: ["12", 0, 2] },
                                                                            else: { $toString: { $add: [{ $toInt: { $substr: ["$screen.slots.time", 0, 2] } }, 12] } },
                                                                        }
                                                                    }
                                                                },
                                                                { $substr: ["$screen.slots.time", 2, 3] }
                                                            ]
                                                        }
                                                    }
                                                },
                                                ":00Z"
                                            ]
                                        }
                                    },
                                    {
                                        $toDate: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$$NOW" } },
                                                "T",
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $substr: [from, 6, 2] }, "AM"] },
                                                        then: { $substr: [from, 0, 5] },
                                                        else: {
                                                            $concat: [
                                                                {
                                                                    $toString: {
                                                                        $cond: {
                                                                            if: { $eq: [{ $add: [{ $toInt: { $substr: [from, 0, 2] } }, 12] }, 24] },
                                                                            then: { $substr: ["12", 0, 2] },
                                                                            else: { $toString: { $add: [{ $toInt: { $substr: [from, 0, 2] } }, 12] } },
                                                                        }
                                                                    }
                                                                },
                                                                { $substr: [from, 2, 3] }
                                                            ]
                                                        }
                                                    }
                                                },
                                                ":00Z"
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                $lte: [
                                    {
                                        $toDate: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$$NOW" } },
                                                "T",
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $substr: ["$screen.slots.time", 6, 2] }, "AM"] },
                                                        then: { $substr: ["$screen.slots.time", 0, 5] },
                                                        else: {
                                                            $concat: [
                                                                {
                                                                    $toString: {
                                                                        $cond: {
                                                                            if: { $eq: [{ $add: [{ $toInt: { $substr: ["$screen.slots.time", 0, 2] } }, 12] }, 24] },
                                                                            then: { $substr: ["12", 0, 2] },
                                                                            else: { $toString: { $add: [{ $toInt: { $substr: ["$screen.slots.time", 0, 2] } }, 12] } },
                                                                        }
                                                                    }
                                                                },
                                                                { $substr: ["$screen.slots.time", 2, 3] }
                                                            ]
                                                        }
                                                    }
                                                },
                                                ":00Z"
                                            ]
                                        }
                                    },
                                    {
                                        $toDate: {
                                            $concat: [
                                                { $dateToString: { format: "%Y-%m-%d", date: "$$NOW" } },
                                                "T",
                                                {
                                                    $cond: {
                                                        if: { $eq: [{ $substr: [to, 6, 2] }, "AM"] },
                                                        then: { $substr: [to, 0, 5] },
                                                        else: {
                                                            $concat: [
                                                                {
                                                                    $toString: {
                                                                        $cond: {
                                                                            if: { $eq: [{ $add: [{ $toInt: { $substr: [to, 0, 2] } }, 12] }, 24] },
                                                                            then: { $substr: ["12", 0, 2] },
                                                                            else: { $toString: { $add: [{ $toInt: { $substr: [to, 0, 2] } }, 12] } },
                                                                        }
                                                                    }
                                                                },
                                                                { $substr: [to, 2, 3] }
                                                            ]
                                                        }
                                                    }
                                                },
                                                ":00Z"
                                            ]
                                        }
                                    }
                                ]
                            },
                        ]
                    }
                }
            },
            { $unwind: "$screen.slots.booking.dates" },
            { $match: { "screen.slots.booking.dates": date } },
            {
                $group: {
                    _id: {
                        movie: '$screen.slots.booking.movie',
                        cinemaId: '$_id',
                        cinemaTitle: '$title',
                        screen: '$screen.screen',
                        seatmap: '$screen.seatmap'
                    },
                    slots: {
                        $addToSet: {
                            time: '$screen.slots.time',
                            dates: '$screen.slots.booking.dates'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$_id.movie',
                    cinema: {
                        $addToSet: {
                            id: '$_id.cinemaId',
                            title: '$_id.cinemaTitle',
                            screen: {
                                screen: '$_id.screen',
                                seatmap: '$_id.seatmap',
                                slots: '$slots'
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'movie'
                }
            },
            {
                $unwind: '$movie'
            },
            {
                $lookup: {
                    from: 'actors',
                    localField: 'movie.casts',
                    foreignField: '_id',
                    as: 'movie.casts'
                }
            },
            {
                $group: {
                    _id: {
                        cinemaId: '$cinema.id',
                        cinemaTitle: '$cinema.title',
                        movie: '$movie'
                    },
                    screens: {
                        $push: {
                            screen: '$cinema.screen',
                        }
                    }
                }
            },
            // Project to reshape the document
            {
                $project: {
                    _id: 0,
                    cinema: {
                        id: '$_id.cinemaId',
                        title: '$_id.cinemaTitle',
                        screens: '$screens.screen'
                    },
                    movie: '$_id.movie'
                }
            },
            // {
            //     $project: {
            //         _id: 0,
            //         movie: 1,
            //         cinema: 1
            //     }
            // }
        ])

        res.send(result);

        // const movies = await Movie.result.populate('casts');
        // res.send(movies);
    } catch (err) {
        console.log('get time movies error: ', err.message);
        res.status(500).send({ message: err.message })
    }
}


const getCinemaBooking = async (req, res) => {
    try {
        const { movieId, zipcode } = req.query;

        const result = await Cinema.aggregate([
            { $match: { "address.zipcode": zipcode } },
            { $unwind: "$screen" },
            { $unwind: "$screen.slots" },
            { $match: { "screen.slots.booking.movie": new mongoose.Types.ObjectId(movieId) } },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    screen: { $push: "$screen" }
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    screen: 1
                }
            }
        ])

        res.send(result)

    } catch (err) {
        console.log('get time movies error: ', err.message);
        res.status(500).send({ message: err.message })
    }
}

export default {
    getCityMovies,
    getDateTimeMovie,
    getCinemaBooking
}