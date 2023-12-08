const express = require('express');
const QRCode = require('qrcode');
const staticRoute = require('./routes/staticRoutes');
const studentRoute = require('./routes/student');
const mongoose = require('mongoose');


const app = express();

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute);
app.use('/', studentRoute);

// app.get('/', (req, res) => {
//     // QRCode.toDataURL('Hello World', function (err, url) {
//     //     let src = url;
//     //     return res.render("home", { src })
//     // })
//     return res.render("home");
// })

const start = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/qr-code");
        app.listen(5000, () => console.log("working..."));
    } catch (error) {
        console.log(error);
    }
}
start();