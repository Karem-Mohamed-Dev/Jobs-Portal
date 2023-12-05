require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/auth');
const seekerRouter = require('./routes/seeker');
const companyRouter = require('./routes/company');
const jobRouter = require('./routes/job');

app.use('/api/auth', authRouter);

app.use('/api/seeker', seekerRouter);

app.use('/api/company', companyRouter);

app.use('/api/jobs', jobRouter);

app.use((req, res, next) => {
    res.status(404).json({ msg: "Route not found" });
})

app.use((error, req, res, next) => {
    console.log(error);
    let statusCode = error.statusCode;
    if (!statusCode)
        statusCode = 500;
    res.status(statusCode).json({ error: error.message });
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, console.log('Server Is Running...'));
    } catch (err) {
        console.log(err)
    }
}

start();