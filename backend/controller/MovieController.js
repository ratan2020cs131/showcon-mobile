const Movie = require('../database/models/Movie');
const Cinema = require('../database/models/Cinema');

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

module.exports = {
    getAll
}