const User = require('../database/models/User');

const Signin = async (req,res)=>{
    try{
        const {mobileNo} =req.body;
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
module.exports = {
    Signin,
    Register,
};