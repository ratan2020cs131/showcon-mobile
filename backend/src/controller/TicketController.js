import Ticket from '../database/models/Ticket.js';
import User from '../database/models/User.js';

const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        const saved = await ticket.save();
        const user = await User.findById({ _id: req.user._id })

        user.history.push(saved._id);
        await user.save();

        res.send(saved);
    }
    catch (error) {
        console.log("Create Ticket Error: ", error);
    }
}

export default {
    createTicket
}