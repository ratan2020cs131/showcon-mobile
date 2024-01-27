const Image = require('../database/models/Image');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");
const config = require('../config/firebase.config');

const firebaseApp = initializeApp(config.firebaseConfig);
const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.FIREBASE_CAPTCHA),
    isTokenAutoRefreshEnabled: true
  });
const storage = getStorage();


const imageUpload = async (req, res) => {
    try {
        if (req.file.size > 5 * 1024 * 1024) {      //check if image is less than 5 MB
            res.send({ message: "File should be less than 5MB", code: 11 })
        }
        else if (!req.file.mimetype.startsWith("image/")) {     //check if the file is an image
            res.json({ message: "Only image files are allowed", code: 12 });
        }
        else {
            const timestamp = new Date().getTime();
            const filePath = `images/${req.file.originalname}-${timestamp}`;
            const storageRef = ref(storage, filePath);

            // create file metadata including the content type
            const metadata = { contentType: req.file.mimetype };      

            //upload the file in the bucket
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            console.log('snapshot: ',snapshot);

            // grab the uploaded image url
            const imageUrl = await getDownloadURL(snapshot.ref);    

            //save the url and file path in mongodb
            const image = new Image({ filePath, url: imageUrl });      
            await image.save();

            res.send({ "image": imageUrl, code: 0 });
        }
    } catch (err) {
        console.log("Image upload error: ", err);
    }
}

const imageDelete = async (req, res) => {
    try {
        const image = await Image.findOne({ url: req.body.url });
        if (image) {
            const filePath = image.filePath;
            const imageRefToDelete = ref(storage, filePath);
            await deleteObject(imageRefToDelete);
            const deleted = await Image.findOneAndDelete(image);
            res.send({ message: "Image deleted successfully" })
        } else {
            res.send({ message: "Image deleted successfully" })
        }

    } catch (err) {
        console.log("Image delete error: ", err);
    }
}



const uploadController = {
    imageUpload,
    imageDelete
}

module.exports = uploadController;