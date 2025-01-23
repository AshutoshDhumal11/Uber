const userModel = require('../models/user');
const captainModel = require('../models/captain');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        })
    }

    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports.authCaptain = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        })
    }

    const isBlackListed = await blackListTokenModel.findOne({ token: token });

    if (isBlackListed) {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById({ _id: decoded._id });

        req.captain = captain;

        return next();
    } catch(error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
