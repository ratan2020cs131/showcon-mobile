const Image = require('../database/models/Image');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
// const config = require('../config/firebase.config');


const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSGID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREID,
}

initializeApp(firebaseConfig);
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
            const metadata = { contentType: req.file.mimetype };      // create file metadata including the content type
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);     //upload the file in the bucket
            const imageUrl = await getDownloadURL(snapshot.ref);    // grab the uploaded image url
            const image = new Image({ filePath, url: imageUrl });      //save the url and file path in mongodb
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