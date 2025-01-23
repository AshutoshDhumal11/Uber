const { validationResult } = require('express-validator');
const { getAddressCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require('../services/maps.service');

module.exports.getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinates(address);
        return res.status(200).json({
            coordinates,
            message: "Coordinates fetched successfully.",
        })
    } catch(error) {
        console.error(error);
        return res.status(404).json({
            message: "Coordinates not found."
        })
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await getDistanceTime(origin, destination);
        // console.log("distance and time is:", distanceTime)
        return res.status(200).json({
            success: true,
            distanceTime,
        })
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching distance and time"
        })
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        })
    }

    const { input } = req.query;

    try {
        const suggestions = await getAutoCompleteSuggestions(input);
        // console.log(suggestions);
        return res.status(200).json({
            success: true,
            suggestions,
        });
    } catch(error) {
        console.error("Internal server error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while getting auto complete suggesstions.",
            error: error.message,
        })
    }
}