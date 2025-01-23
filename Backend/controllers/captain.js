const { validationResult } = require("express-validator");
const captainModel = require("../models/captain");
const { createCaptain } = require("../services/captainServices");
const blackListTokenModel = require("../models/blackListToken");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { fullname, email, password, vehicle } = req.body;

    // To check captain is already exist with this email or not
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if(isCaptainAlreadyExist) {
        return res.status(400).json({
            message: "Captain already exist",
        })
    }
    
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({
        token,
        captain,
    });
};

module.exports.loginCaptain = async function (req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(401).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if(!captain) {
        return res.status(401).json({
            message: "Captain does not exist with this email"
        })
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({
            message: "Invalid password",
        })
    }

    const token = captain.generateAuthToken();

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.cookie('token', token, options).status(200).json({
        token,
        captain
    })
}

module.exports.getCaptainProfile = async function (req, res, next) {
    return res.status(200).json({
        captain: req.captain
    });
}

module.exports.logoutCaptain = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListTokenModel.create({token: token});

    res.clearCookie("token");

    return res.status(200).json({
        message: "Logged out successfully"
    })
}
