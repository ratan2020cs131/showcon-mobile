const Actor = require('../database/models/Actor');

//ADD NEW ACTOR
const addCast = async (req, res) => {
    try {
        const { name, image } = req.body;
        const actor = new Actor({ name, image });
        const result = await actor.save();
        if (!result) {
            throw new Error("Error saving data in mongoDB")
        } else {
            res.send({ message: 'Actor saved successfully', result });
        }
    } catch (err) {
        console.log("Add new actor error: ", err.message);
        res.status(500).send({ message: err.message });
    }
}

//GET ALL ACTORS
const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        if(actors){
            res.send(actors)
        }else{
            throw new Error("Error in fetching actors from mongoDB");
        }
    } catch (err) {
        console.log({ 'Get all actors error: ': err.message });
    }
}



module.exports = {
    addCast,
    getAllActors
}