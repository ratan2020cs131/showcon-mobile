const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const authRoutes = require('./routes/Auth');
require('./database/Connect');

const app=express();
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ limit: '8mb', extended: true }));
app.use(cors({origin: "*"}));

app.use('/auth', authRoutes);

PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})