const User = require("../database/models/User.js");
const express = require("express");
const jwt = require("jsonwebtoken");

const AuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken._id });
    if (user) {
      req.user = user;
      next();
    }
    else {
      throw ("User not found");
    }
  } catch (err) {
    console.log("Get User Error : ", err)
  }
};

module.exports = { AuthMiddleWare };