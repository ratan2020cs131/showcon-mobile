const Ticket = require('../database/models/Ticket');
const User = require('../database/models/User');

const createTicket = async(req,res)=>{
    try{
        const ticket = new Ticket(req.body);
        const saved = await ticket.save();
        const user = await User.findById({_id:req.user._id})

        user.history=saved._id;
        const result = await user.save();
        
        res.send(result.history);
    }
    catch(error){
        console.log("Create Ticket Error: ",error);
    }
}

module.exports={
    createTicket
}