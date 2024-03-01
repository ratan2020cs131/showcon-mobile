import mongo from 'mongoose';

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

export default Image;