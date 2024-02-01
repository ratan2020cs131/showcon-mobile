const express = require('express');
const route = express.Router();
const uploadController = require('../controller/SupabaseBucket');
// const uploadController = require('../controller/UploadController');
const Multer = require('../middleware/Multer');

route.post('/image', Multer.upload, uploadController.imageUpload);
route.delete('/image', uploadController.imageDelete);

module.exports = route;