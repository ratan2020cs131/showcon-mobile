const mongo = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const user = new mongo.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    resetPass: {
        type: String,
        required: false
    },
    tokens: [
        {
            type: String,
            required: true
        }
    ],
    history:[
        {
            type: String,
            required: false
        }
    ]
});

//hashing the password
user.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

//generating jwt token
user.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat(token);
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}


const User = mongo.model('user', user);

module.exports = User;