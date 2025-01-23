const RideModel = require("../models/ride");
const { getDistanceTime } = require("../services/maps.service")
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pick and destination are required.");
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20,
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8,
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5,
    }

    const fare = { // parseFloat convert the string again to number and toFixed limits and the value upto given decimal points and return the value as a string
        auto: parseFloat( baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto) ).toFixed(2),
        car: parseFloat( baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car) ).toFixed(2),
        motorcycle: parseFloat( baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle) ).toFixed(2),
    };

    return fare;
};

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
};

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required.");
    }

    const fare = await getFare(pickup, destination);

    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6),
    })

    return ride;
};

module.exports.confirmRide = async (rideId, captainId) => {
    if(!rideId || !captainId) {
        throw new Error("Ride Id and captain Id is required.");
    }

    // update the status of the ride and the captain to that ride
    await RideModel.findOneAndUpdate({ _id: rideId}, {
        status: 'accepted',
        captain: captainId
    })

    // ride after updating the status
    const ride = await RideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error("Ride not found.");
    }

    // return ride after accepting
    return ride;
};

module.exports.startRide = async ({ rideId, otp, captainId }) => {
    if(!rideId || !otp) {
        throw new Error("Ride Id and OTP are required.");
    }

    const ride = await RideModel.findOne({ _id: rideId}).select('+otp');

    if(!ride) {
        throw new Error("Ride not found.");
    }

    if(ride.status !== 'accepted') {
        throw new Error("Ride not accepted.");
    }

    if(ride.otp !== otp) {
        throw new Error("Invalid OTP.");
    }

    const updatedRide = await RideModel.findOneAndUpdate({ _id: rideId }, {
        status: 'ongoing',
        captain: captainId,
    }, { new: true}).select('+otp').populate('user').populate('captain').exec();

    return updatedRide;
};

module.exports.endRide = async ({ rideId, captainId}) => {
    if(!rideId || !captainId) {
        throw new Error("Ride Id and captain Id is required.");
    }

    const ride = await RideModel.findOne({ 
        _id: rideId,
        captain: captainId,
    });

    if(!ride) {
        throw new Error("Ride not found.");
    }

    if(!ride.status === "ongoing") {
        throw new Error("Ride not ongoing");
    }

    const updatedRide = await RideModel.findOneAndUpdate(
                            { _id: rideId, captain: captainId},
                            { status: 'completed'},
                            { new: true }
                        ).populate('user').populate('captain').exec();

    return updatedRide;
};

module.exports.getFare = getFare;