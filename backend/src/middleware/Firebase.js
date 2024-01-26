const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const config = require('../config/firebase.config');

const app = initializeApp(config.firebaseConfig);
const storage = getStorage();
