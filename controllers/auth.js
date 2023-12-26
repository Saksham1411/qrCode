const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    if(!req.body.fullName || !req.body.email || !req.body.password){
        return res.status(StatusCodes.BAD_REQUEST).render("signin",{
            msg:"Enter all the fields",
        })
    }
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).redirect('/signin');
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).render("login",{
            msg:"Enter the email or password",
        })
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).render("login",{
            msg:"Email not exist",
        })
    }
    const isPasswordCorrect = await user.camparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).render('login',{
            msg:"Password Mismatch",
        });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).cookie('token',token).redirect('/home');
}

module.exports = { register,logIn };


