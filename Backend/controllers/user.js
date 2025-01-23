const userModel = require("../models/user");
const { createUser } = require("../services/userServices");
const { validationResult } = require("express-validator");
const blackListTokenModel = require('../models/blackListToken');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { fullname, email, password } = req.body;

    // To check user already exist with this email or not
    const isUserAlreadyExist = await userModel.findOne({ email });
    if(isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exist"
        })
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        token,
        user,
    });
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password')

    if(!user) {
        return res.status(401).json({
            message: "User does not exist with this email"
        })
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = user.generateAuthToken();
    const options = {
        expires: new Date(Date.now() +  3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.cookie('token', token, options);
    res.status(200).json({
        token,
        user
    })
}

module.exports.getUserProfile = async (req, res, next) => {
    return res.status(200).json({
        user: req.user
    });
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
        message: "Logged out successfully"
    })
}
