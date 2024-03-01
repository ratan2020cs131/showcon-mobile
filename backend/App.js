import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const app = express();

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({ origin: "*", credentials: "*" }));

import authRoutes from './src/routes/Auth.js';
import movieRoute from './src/routes/Movie.js';
import cinemaRoute from './src/routes/Cinema.js';
import ticketRoute from './src/routes/Ticket.js';
import favouriteRoute from './src/routes/Favourite.js';
import uploadRoute from './src/routes/Upload.js';
import locationRoute from './src/routes/Location.js';
import adminRoute from './src/routes/Admin.js';
import userRoute from './src/routes/User.js';
import './src/database/Connect.js';


app.use('/auth', authRoutes);
app.use('/movie', movieRoute);
app.use('/cinema', cinemaRoute);
app.use('/ticket', ticketRoute);
app.use('/upload', uploadRoute);
app.use('/favourite', favouriteRoute)
app.use('/admin', adminRoute);
app.use('/location', locationRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})