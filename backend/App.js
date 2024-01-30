const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app=express();

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({origin: "*", credentials:"*"}));


const authRoutes = require('./src/routes/Auth');
const movieRoute = require('./src/routes/Movie');
const cinemaRoute = require('./src/routes/Cinema');
const ticketRoute = require('./src/routes/Ticket');
const favouriteRoute = require('./src/routes/Favourite');
const uploadRoute = require('./src/routes/Upload');
const adminRoute = require('./src/routes/Admin');
require('./src/database/Connect');


app.use('/auth', authRoutes);
app.use('/movie', movieRoute);
app.use('/cinema', cinemaRoute);
app.use('/ticket', ticketRoute);
app.use('/upload', uploadRoute);
app.use('/favourite', favouriteRoute)
app.use('/admin', adminRoute);

PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})