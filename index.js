require("dotenv").config();
const express = require('express');
const staticRoute = require('./routes/staticRoutes');
const studentRoute = require('./routes/student');
const notFound = require('./middleware/not-found');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "hbs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute);
app.use('/', studentRoute);

app.use(notFound);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => console.log("working..."));
    } catch (error) {
        console.log(error);
    }
}
start();