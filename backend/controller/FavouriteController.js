const Favourite = require("../database/models/Favourite");
const Movie = require("../database/models/Movie")

const FavouriteController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(400).json({ message: "User Not Found" })

        const movieID = req.body.MovieID;
        const movie = await Movie.findOne({ _id: movieID })
        if (!movie) return res.status(404).json({ message: "Movie not Found" });

        let favourite = await Favourite.findOne({ userId });

        if (!favourite) {
            favourite = new Favourite({ userId, list: [] });
        }

        if (!favourite.list.includes(movieID)) {
            favourite.list.push(movieID);
            await favourite.save();
            return res.status(201).json({ message: "Added to favorites" });
        } else {
            return res.status(200).json({ message: "Movie already in favorites" });
        }
    } catch (err) {
        console.log(err)
    }
};

const getFavouriteController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(404).json({ message: "User Not Found" })
        const fav = await Favourite.findOne({ userId })
        if (fav) {
            res.status(200).send({ "movieId": fav.list });
        } else {
            res.status(200).send([]);
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { FavouriteController, getFavouriteController };
