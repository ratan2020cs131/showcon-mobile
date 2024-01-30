const mongo = require('mongoose');

const actor = new mongo.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const Actor = mongo.model('actors', actor);
module.exports=Actor;