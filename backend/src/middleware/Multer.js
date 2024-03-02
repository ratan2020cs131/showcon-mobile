import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage()
}).single("image");


export default {
    upload
};