const mongo = require('mongoose');

const actor = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Actor = mongo.model('actors', actor);
module.exports=Actor;