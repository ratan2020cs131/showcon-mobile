const mongo = require('mongoose');
const bcrypt=require('bcrypt');

const user = new mongo.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    resetPass:{
        type:String,
        required:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

//hashing the password
user.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


const User = mongo.model('user', user);

module.exports = User;