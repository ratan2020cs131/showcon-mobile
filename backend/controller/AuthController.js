const User = require('../database/models/User');
const bcrypt = require("bcrypt");

const Signin = async (req,res)=>{
    try{
        const {mobileNo} = req.params;
        const phone = await User.findOne({phone:mobileNo})
        
        if(phone){
            res.send({flag:true});
        }else{
            res.send({flag:false})
        }
    }
    catch(err){
        console.log("Signin Error: ", err);
    }
}

//REGISTER 
const Register = async (req,res)=>{
    try{
        const {fname, lname, phone, email, password} = req.body;
        const user = new User({fname, lname, phone, email, password});
        const result = await user.save();
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(401).json({ message: "User not ssaved" });
        }
    }
    catch(err){
        console.log("Signin Error: ", err);
    }
}

//VERIFY PASSWORD
const Verify = async (req,res)=>{
    try{
        const {mobileNo, password}=req.body;
        const user = await User.findOne({phone:mobileNo})
        if(user){
            const authorised = await bcrypt.compare(password, user.password);
            if(authorised){
                const token = await user.generateToken();
                res.status(200).send({token});
            }else{
                res.status(200).send({
                    error:"Wrong Password"
                });
            }
        }else{
            res.status(404).send({
                error:"User not Found"
            });
        }
    }
    catch(err){
        console.log("Signin Error: ", err);
    }
}

module.exports = {
    Signin,
    Register,
    Verify
};