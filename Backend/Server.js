require('dotenv').config();
require('express-async-errors');

const cors = require("cors");

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const recipeRouter = require('./routes/recipe');

//errorhandlers
const notFoundMiddleware = require('./middleware/not-found');

//connectDB

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipe", authenticateUser, recipeRouter)

//middlewares
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`listening to the ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();