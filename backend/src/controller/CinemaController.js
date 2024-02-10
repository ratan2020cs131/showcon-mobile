const Cinema = require("../database/models/Cinema");

const arrangeSeats = (seatsArray) => {
    // Find the maximum seat number across all rows
    let maxSeatNumber = 0;
    seatsArray.forEach(item => {
        if (maxSeatNumber < Math.max(...item.seats)) {
            maxSeatNumber = Math.max(...item.seats)
        }
    });
    // Initialize a new array to store arranged seats
    const arrangedSeats = [];
    // Iterate over each row of seats
    for (const row of seatsArray) {
        const { row: rowName, seats } = row;
        const arrangedRow = Array.from({ length: maxSeatNumber }).fill(-1);
        seats.sort((a, b) => a - b);
        // Fill in the seats for the current row
        for (let i = 0; i < seats.length; i++) {
            arrangedRow[seats[i] - 1] = i + 1;
        }
        // Update the seats for the current row in the arrangedSeats array
        arrangedSeats.push({ row: rowName, seats: arrangedRow });
    }
    return arrangedSeats;
};


const registerCinema = async (req, res) => {
    try {
        req.body.owner = req.Id;
        req.body.screen.forEach((item) => {
            item.seatmap = arrangeSeats(item.seatmap)
        })
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


const createShow = async (req, res) => {
    try {
        const { movie, slots, dates } = req.body;
        if (!movie) { throw new Error("Provide a valid movieId"); }
        else if (!slots?.length > 0) { throw new Error("Provide atleast one slot"); }
        else if (!dates?.length > 0) { throw new Error("Provide atleast one date"); }
        const result = await Cinema.findOneAndUpdate(
            { 'screen.slots._id': { $in: slots } }, // Find the cinema with slots matching the provided IDs
            { $set: { 'screen.$[].slots.$[slot].booking': { movie, dates } } }, // Update the booking field for the matched slot
            { arrayFilters: [{ 'slot._id': { $in: slots } }], multi: true, new: true } // Filter to update only the matching slot
        );
        if (result) {
            res.send({ message: "Show created", result });
        } else {
            throw new Error("Error in saving data to mongoDB");
        }
    } catch (err) {
        console.log("Create show error: ", err.message);
        res.send({ message: err.message })
    }
}

module.exports = {
    registerCinema,
    getCinema,
    createShow
}