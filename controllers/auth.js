const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).send({ user, token });
}

const logIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.camparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).send("Password Mismatch");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).cookie('token',token).send({user,token});
}

module.exports = { register,logIn };


