const mongo = require('mongoose');

const image = new mongo.Schema({
    filePath: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Image = mongo.model('images', image);

module.exports = Image;