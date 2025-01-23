const express = require('express');
const router = express.Router();

const { body, query } = require('express-validator');

// Middlewares
const { authUser, authCaptain } = require('../middlewares/auth');

// Controllers
const { createRide, getFare, confirmRide, startRide, endRide } = require('../controllers/ride')

router.post('/create',
    authUser, 
    body('pickup').isString().isLength({min: 3}).withMessage("Invalid pick up address."),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid destination address."),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'motorcycle']).withMessage("Invalid vehicle type."),
    createRide
);

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({min: 3}).withMessage("Invalid pick up address."),
    query('destination').isString().isLength({min: 3}).withMessage("Invalid destination address"),
    getFare
);

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride Id."),
    confirmRide
);

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage("Invalid ride Id"),
    query('otp').isString().isLength({ min: 6, max: 6}).withMessage("OTP should be 6 digits long."),
    startRide
);

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride Id."),
    endRide,
)


module.exports = router;