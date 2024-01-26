const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
}).single("image");


const Multer = {
    upload
};

module.exports = Multer;