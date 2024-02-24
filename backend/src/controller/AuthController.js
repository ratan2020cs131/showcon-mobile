import User from "../database/models/User.js"
import Ticket from '../database/models/Ticket.js'
import bcrypt from "bcrypt";
import GenerateOtp from '../../utils/GenerateOtp.js';
import SendMail from '../../utils/SendMail.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

//CHECK WHETHER PHONE REGISTERED OR NOT
const Signin = async (req, res) => {
  try {
    const { mobileNo } = req.params;
    const result = await User.findOne({ phone: mobileNo });
    if (result) {
      const otp = GenerateOtp();

      let mailParams = {
        from: {
          name: 'Showcon',
          address: process.env.NODEMAILER_EMAIL
        },
        to: result.email,
        subject: 'Showcon: Login OTP',
        html: `<p><span style="font-family: 'trebuchet ms', geneva, sans-serif;">Hello ${result.fname},</span></p>
        <p><span style="font-family: 'trebuchet ms', geneva, sans-serif;">Your login verification OTP is</span></p>
        <div style="padding: 10px; background: #e0e0e0; border-radius: 5px; width: fit-content; font-family: 'trebuchet ms', geneva, sans-serif; text-align: left;"><span style="color: rgb(245, 81, 57);"><strong><span style="font-size: 14pt;"><em><span style="font-family: 'trebuchet ms', geneva, sans-serif;">${otp}</span></em></span></strong></span></div>
        <p><span style="font-family: 'trebuchet ms', geneva, sans-serif;">Team,</span><br><span style="font-family: 'trebuchet ms', geneva, sans-serif;">Showcon</span></p>
        <div style="height: 50px;"><span style="font-family: 'trebuchet ms', geneva, sans-serif;"><img style="height: 100%; object-fit: contain;" src="https://oytnhtpjquwilgjlplfm.supabase.co/storage/v1/object/public/showcon/showcon.png" alt="showcon"></span></div>`
      };
      const mail = await SendMail(mailParams);
      result.loginOtp = otp;
      await result.save();
      res.send({ flag: true, otp, mail });
    } else {
      res.send({ flag: false });
    }
  } catch (err) {
    console.log("Verify phone error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

//REGISTER
const Register = async (req, res) => {
  try {
    const { fname, lname, phone, email, password } = req.body;
    const exist = await User.findOne({ $or: [{ phone }, { email }] });
    if (exist) {
      res.status(400).json({ message: "User already exist" });
    }
    else {
      const user = new User({ fname, lname, phone, email, password });
      const result = await user.save();
      if (result) {
        const token = await user.generateToken();
        res.status(201).json({ token });
      } else {
        res.status(401).json({ message: "User not ssaved" });
      }
    }
  } catch (err) {
    console.log("Signup Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

//VERIFY PASSWORD
const Verify = async (req, res) => {
  try {
    const { mobileNo, password, otp } = req.body;
    const user = await User.findOne({ phone: mobileNo });
    if (user) {
      //if user logins with password
      if (password) {
        const authorised = await bcrypt.compare(password, user.password);
        if (authorised) {
          const token = await user.generateToken();
          if (user.role) res.status(200).send({ token, role: user.role });
          else res.status(200).send({ token });
        } else {
          res.status(200).send({
            error: "Wrong Password",
          });
        }
      }
      //if user logins with otp
      else if (otp) {
        if (user.loginOtp === otp) {
          const token = await user.generateToken();
          user.loginOtp = null;
          await user.save();
          res.status(200).send({ token });
        } else {
          res.status(200).send({
            error: "Wrong OTP",
          });
        }
      }
    } else {
      res.status(404).send({
        error: "User not Found",
      });
    }
  }
  catch (err) {
    console.log("Signin Error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

//GET PROFILE DATA
const ProfileData = async (req, res) => {
  try {
    const { fname, lname, phone, email } = req.user;
    res.status(200).json({ fname, lname, phone, email });
  } catch (err) {
    console.log("Get profile error: ", err.message);
    res.status(500).send({ message: err.message });
  }
};

//PUT PROFILE UPDATE
const ProfileUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.user._id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      returnOriginal: false,
    });
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log("Profile update error: ", err.message);
    res.status(500).send({ message: err.message })
  }
};

//LOGOUT
const Logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => {
      return item !== req.token;
    });
    req.user.tokens.forEach((item) => {
      console.log(item);
    });
    await req.user.save();
    res.status(200).send({ message: 'Logout Successfully' })
  }
  catch (err) {
    console.log("Logout Error: ", err.message);
    res.status(500).send({ message: err.message })
  }
};

//GET HISTORY
const History = async (req, res) => {
  try {
    const result = await User.findById(req.user._id);
    if (result) {
      const ticketIds = result.history;
      // Use Promise.all to fetch all tickets concurrently
      const ticketPromises = ticketIds.map(async (itemId) => {
        const ticket = await Ticket.findById(itemId);
        return ticket;
      });
      const tickets = await Promise.all(ticketPromises);
      res.send(tickets.filter(Boolean)); // Filter out null or undefined values
    } else {
      res.send([]);
    }
  }
  catch (err) {
    console.log("History Error: ", err.message);
    res.status(500).send({ message: err.message })
  }
};


export default {
  Signin,
  Register,
  Verify,
  ProfileData,
  ProfileUpdate,
  Logout,
  History,
};
