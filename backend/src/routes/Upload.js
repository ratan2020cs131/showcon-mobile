import express from 'express'
import uploadController from '../controller/SupabaseBucket.js'
// import uploadController from '../controller/UploadController'
import Multer from '../middleware/Multer.js'
const route = express.Router();

route.post('/image', Multer.upload, uploadController.imageUpload);
route.delete('/image', uploadController.imageDelete);

export default route;