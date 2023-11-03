const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const authRoutes = require('./routes/Auth');
const movieRoute = require('./routes/Movie');
const cinemaRoute = require('./routes/Cinema');
const favouriteRoute = require('./routes/Favourite');

require('./database/Connect');

const app=express();

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({origin: "*", credentials:"*"}));

app.use('/auth', authRoutes);
app.use('/movie', movieRoute);
app.use('/cinema', cinemaRoute);
app.use('/favourite', favouriteRoute)

PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})