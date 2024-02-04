const Cinema = require("../database/models/Cinema");

const registerCinema = async (req, res) => {
    try {
        req.body.owner = req.Id;
        const cinema = new Cinema(req.body);
        const result = await cinema.save();
        if (result) {
            res.send(result)
        } else {
            throw new Error("Error in connecting with mongoDB")
        }
    } catch (err) {
        console.log("Register cinema error: ", err.message);
        res.send({ message: err.message })
    }
}



const getCinema = async (req, res) => {
    try {
        const result = await Cinema.findOne({ owner: req.Id });
        if (result) {
            res.send(result)
        } else {
            throw new Error("Can't connect to mongoDB");
        }
    } catch (err) {
        console.log("Get cinema error: ", err.message);
        res.send({ message: err.message })
    }
}

module.exports = {
    registerCinema,
    getCinema
}