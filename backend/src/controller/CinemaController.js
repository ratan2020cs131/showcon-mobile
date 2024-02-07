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
        req.body.screen = req.body.screen.map((item) => arrangeSeats(item.seatmap))
        console.log("arranged map: ", JSON.stringify(req.body.screen));
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