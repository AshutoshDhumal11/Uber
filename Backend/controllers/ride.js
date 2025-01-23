const { validationResult } = require("express-validator");
const { createRide, getFare, confirmRide, startRide, endRide } = require("../services/ride.service");
const {
  getCaptainsInTheRadius,
  getAddressCoordinates,
} = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const RideModel = require("../models/ride");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).josn({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // get pickup coordinates
    const pickupCoordinates = await getAddressCoordinates(pickup);

    // get captains in particular radius
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.latitude,
      pickupCoordinates.longitude,
      2
    );

    // does not send otp to the captain so
    ride.otp = "";

    // get user details in the ride in populated form
    const rideWithUser = await RideModel.findOne({ _id: ride._id}).populate('user');

    // send ride message to all the captains
    captainsInRadius.map( async (captain) => {
      sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser,
      });
    });

    return res.status(201).json({
      success: true,
      rideWithUser,
      // pickupCoordinates,
      // captainsInRadius,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await getFare(pickup, destination);

    return res.status(200).json({
      success: true,
      fare,
    });
  } catch (error) {
    console.error("Error while getting fare", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        })
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide(rideId, req.captain._id);

        // Send message to the user that ride is accepted
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride,
        })

        return res.status(200).json({
            success: true,
            ride,
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            error:error.message,
            message: "Error while confirming ride.",
        })
    }
};

module.exports.startRide = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await startRide({ rideId, otp, captainId: req.captain._id });
    // console.log("ride is as follows: ", ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    });

    return res.status(200).json({
      success: true,
      ride,
      message: "Ride started successfully.",
    })
  } catch(error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    })
  }
};

module.exports.endRide = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
    });
  }

  const { rideId } = req.body;

  try {
    const ride = await endRide({ rideId, captainId: req.captain._id});

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-ended',
      data: ride,
    })

    return res.status(200).json({
      success: true,
      ride,
      message: "Ride ended."
    })
  } catch(error) {
    console.log("Error in ride ending.");
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error.",
    })
  }
}
