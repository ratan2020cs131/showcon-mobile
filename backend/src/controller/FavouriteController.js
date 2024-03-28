import Favourite from "../database/models/Favourite.js"
import Movie from "../database/models/Movie.js"

const addFav = async (req, res) => {
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


//REMOVE FAVORITE
const delFav = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(400).json({ message: "User Not Found" })

        const movieID = req.body.MovieID;

        let favourite = await Favourite.findOneAndUpdate(
            { userId: userId }, // Match documents with the given userId
            { $pull: { list: movieID } }, // Remove the specified ObjectId from the list array
            { new: true },
        );

        res.send({ "message": "Removed from favourite", "movieId": favourite.list });

    } catch (err) {
        console.log("Del Favorite Err: ", err);
    }
}


//GET FAVORITE
const getFav = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(404).json({ message: "User Not Found" })
        const fav = await Favourite.findOne({ userId }).populate('list')
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

export default {
    addFav,
    delFav,
    getFav
}
