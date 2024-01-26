const { mongoose } = require("mongoose");
const User = require("../models/User");

const favourite = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, // Assuming 'User' is the name of your User model
  },
  list: {
    type: [String], // Assuming tokens are strings; you can use another data type if needed
  },
});

const Favourite = mongoose.model("favourite", favourite);

module.exports = Favourite;
