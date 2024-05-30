const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const registerUser = async (req, res) => {
    const user = await User.create({ ...req.body }); //spreads
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Password is incorrect.")
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ User: { name: user.name }, token })
}

module.exports = {
    registerUser,
    loginUser
}