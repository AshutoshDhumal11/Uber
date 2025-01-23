const express = require('express');
const router = express.Router();

const { authUser } = require("../middlewares/auth");
const { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require("../controllers/maps.controller");

const { query } = require("express-validator");

router.get('/get-coordinates',
    query('address').isLength({min: 3}),
    authUser, getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authUser, getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({min: 3}),
    authUser, getAutoCompleteSuggestions
);

module.exports = router;