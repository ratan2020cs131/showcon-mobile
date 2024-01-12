const Movie = require('../database/models/Movie');
const Cinema = require('../database/models/Cinema');


//GET ALL MOVIES
const getAll = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Movie.find({});

        for (const movie of result) {
            for (const item of movie.cinema) {
                const cinema = await Cinema.findById(item.id);
                item.name = cinema.title;
            }
        }

        res.json(result);
    }
    catch (err) {
        console.log("Get Movie Error: ", err);
    }
}

//GET CINEMA
const getCinema=async (req,res)=>{
    try{
        const {id}=req.params;
        const result = await Cinema.findById({_id:id});
        if(!result){
            throw("Cinema not found")
        }else{
            res.send(result);
        }
    }
    catch(error){
        console.log("Get Cinema Error: ", error);
        res.status(404).send({error});
    }
}

module.exports = {
    getAll,
    getCinema
}