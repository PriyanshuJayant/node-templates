// Importing Dependencies
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connection to MongoDB
const { connectMongoDb } = require('./connections/mongoDB');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongoDb(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error', err));

// Routes
const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})