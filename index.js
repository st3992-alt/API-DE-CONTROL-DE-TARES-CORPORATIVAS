require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();

// Conexión a MongoDB
connectDB();

app.use(helmet());

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log('Hello World');
    console.log(`Server running on port ${PORT}`);
});