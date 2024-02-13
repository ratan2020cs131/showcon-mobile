import User from "../database/models/User.js";
import express from "express";
import jwt from "jsonwebtoken";

export const AuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken._id, tokens: token });
    if (user) {
      req.user = user;
      req.token = token;
      req.Id=decodedToken._id
    }
    else {
      throw ("User not found");
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorised' });
  }
};