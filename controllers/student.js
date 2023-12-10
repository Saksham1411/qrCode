const Student = require('../models/student');
const { StatusCodes } = require('http-status-codes');
const QRCode = require('qrcode');

const addStudent = async (req, res) => {
    const { name, password } = req.body;
    // if(!name || !password){
    //     res.status(StatusCodes.BAD_REQUEST).render("register")
    // }
    const student = await Student.create({ ...req.body });

    QRCode.toDataURL(student._id.toString(), function (err, url) {
        let src = url;
        res.status(StatusCodes.CREATED).render("register", { src });
        return;
    })
    // res.redirect('/register');
}

const verifyStudent = async (req, res) => {
    const { id } = req.body;
    const student = await Student.findOne({ _id: id });
    if (!student) {
        res.status(StatusCodes.NOT_FOUND).send("Wrong QR Code");
    }
    if (!student.allowed) {
        await Student.findOneAndUpdate({ _id: id }, { allowed: true });
        res.status(StatusCodes.OK).send({ data: "Allowed" });
        return;
    }
    res.status(StatusCodes.OK).send({ data: "Not Allowed" });
}

const resetAllowed = async (req, res) => {
    const student = await Student.updateMany({ allowed: true }, { allowed: false });
    res.send("works");
}

module.exports = { addStudent, verifyStudent, resetAllowed };