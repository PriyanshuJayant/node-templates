const express = require('express');
const cookieParser = require('cookie-parser');
const { connectMongoDb } = require('./connections/mongoDB');
const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require('./middlewares/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

// Connection
connectMongoDb(process.env.MONGO_URL)
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log('Mongo Error', err));


// Routes
app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
