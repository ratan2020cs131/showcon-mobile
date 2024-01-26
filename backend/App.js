const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const authRoutes = require('./src/routes/Auth');
const movieRoute = require('./src/routes/Movie');
const cinemaRoute = require('./src/routes/Cinema');
const ticketRoute = require('./src/routes/Ticket');
const uploadRoute = require('./src/routes/Upload');
require('./src/database/Connect');

const app=express();

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({origin: "*", credentials:"*"}));

app.use('/auth', authRoutes);
app.use('/movie', movieRoute);
app.use('/cinema', cinemaRoute);
app.use('/ticket', ticketRoute);
app.use('/upload', uploadRoute);

PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})