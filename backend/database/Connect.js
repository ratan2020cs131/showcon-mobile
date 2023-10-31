const mongo = require('mongoose');
const DB_URL=process.env.DB_URL

mongo.connect(DB_URL).
    then(()=>{
        console.log("Database Connected")
    }).
    catch((err) => {
        console.log(err)
    })
