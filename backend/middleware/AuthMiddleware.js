const User = require("../database/models/User.js");
const express = require("express");
const jwt = require("jsonwebtoken");

const AuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken._id, tokens: token });
    if (user) {
      req.user = user;
      req.token = token;
    }
    else {
      throw ("User not found");
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorised' });
  }
};

module.exports = { AuthMiddleWare };