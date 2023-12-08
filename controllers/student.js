const Student = require('../models/student');
const QRCode = require('qrcode');

const addStudent = async (req, res) => {
    // const { name, rollNo } = req.body;
    // console.log(req.body);
    const student = await Student.create({ ...req.body });
    console.log(student.rollNo);

    QRCode.toDataURL(student._id.toString(), function (err, url) {
        let src = url;
        // console.log(src);
        res.render("register", { src });
        return;
    })

    // res.redirect('/register');
}

const verifyStudent = async (req, res) => {
    const { id } = req.body;
    const student = await Student.findOne({ _id: id });
    // console.log(student);
    if (!student.allowed) {
        await Student.findOneAndUpdate({ _id: id }, { allowed: true });
        console.log("work1");
        res.status(200).send({ data: "Allowed" });
        // res.render("home", { data: "Allowed" });
        return;
    }
    console.log("work1");
    // res.render("Scanner", { data: "Not Allowed" });
    res.status(200).send({ data: "Not Allowed" });
}

module.exports = { addStudent, verifyStudent };