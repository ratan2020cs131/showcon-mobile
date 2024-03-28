import mongoose from "mongoose";
import User from "../models/User.js";
import Movie from "./Movie.js";

const favourite = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Movie,
  }],
});

const Favourite = mongoose.model("favourite", favourite);

export default Favourite;
