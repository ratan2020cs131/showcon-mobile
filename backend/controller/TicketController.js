const Ticket = require('../database/models/Ticket');
const User = require('../database/models/User');

const createTicket = async(req,res)=>{
    try{
        const ticket = new Ticket(req.body);
        const saved = await ticket.save();
        const user = await User.findById({_id:req.user._id})

        user.history.push(saved._id);
        await user.save();
        
        res.send(saved);
    }
    catch(error){
        console.log("Create Ticket Error: ",error);
    }
}

module.exports={
    createTicket
}