const User = require("../database/models/User.js");
const express = require("express");
const jwt = require("jsonwebtoken");

const AuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token)
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
   
    const user = await User.findOne({ _id: decodeToken._id });
    if(user){
        req.user = user
        next()
    }
    else{
        throw("User not found")
    }
  } catch (err) {
    console.log("err: ", err)
  }
};
module.exports = {AuthMiddleWare};
