const User = require("../database/models/User");
const Ticket = require("../database/models/Ticket");
const bcrypt = require("bcrypt");

//CHECK WHETHER PHONE REGISTERED OR NOT
const Signin = async (req, res) => {
  try {
    const { mobileNo } = req.params;
    const phone = await User.findOne({ phone: mobileNo });

    if (phone) {
      res.send({ flag: true });
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
    const { mobileNo, password } = req.body;
    const user = await User.findOne({ phone: mobileNo });
    if (user) {
      const authorised = await bcrypt.compare(password, user.password);
      if (authorised) {
        const token = await user.generateToken();
        res.status(200).send({ token });
      } else {
        res.status(200).send({
          error: "Wrong Password",
        });
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


const authController = {
  Signin,
  Register,
  Verify,
  ProfileData,
  ProfileUpdate,
  Logout,
  History,
};

module.exports = authController;
