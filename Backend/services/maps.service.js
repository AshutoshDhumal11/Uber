const { default: axios } = require("axios");
const captainModel = require("../models/captain");

module.exports.getAddressCoordinates = async (address) => {
  try {
    // Google Maps Geocoding API endpoint
    const endpoint = "https://maps.googleapis.com/maps/api/geocode/json";

    // Google Maps API key
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Send a GET request to the Geocoding API
    const response = await axios.get(endpoint, {
      params: {
        address: address, // Address to geocode
        key: apiKey, // API key
      },
    });

    // Check if the API request was successful
    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location; // Extract latitude and longitude
      return { latitude: lat, longitude: lng };
    } else {
      // Handle errors from the API
      throw new Error(
        `Geocoding API error: ${response.data.status} - ${response.data.error_message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Failed to fetch address coordinates");
  }
};




module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  // Google Maps API key
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // Google Maps Distance Matrix API endpoint
  const endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json";

  try {
    // Send a request to the Distance Matrix API
    const response = await axios.get(endpoint, {
      params: {
        origins: origin, // Origin address or coordinates
        destinations: destination, // Destination address or coordinates
        key: apiKey, // API key
      },
    });

    // Check if the API request was successful
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "OK") {
        return element;
      } else {
        throw new Error(`Distance Matrix API error: ${element.status}`);
      }
    } else {
      throw new Error(
        `Distance Matrix API error: ${response.data.status} - ${response.data.error_message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw new Error("Failed to fetch distance and time");
  }
};




module.exports.getAutoCompleteSuggestions = async (input) => {
  if(!input) {
    throw new Error("input is required.");
  }

  // Google Maps API endpoint
  const endpoint = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  // Google Maps API key
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get(endpoint, {
      params: {
        input: input,
        key: apiKey,
      }
    })

    if(response.data.status === 'OK') {
      return response.data.predictions;
    } else {
      throw new Error(`Auto complete API error:", ${response.data.status} - ${response.data.error_message || "Unknown error"}`);
    }
  } catch(error) {
    console.error("Error in fetching suggestions", error.message);
    throw new Error("Failed to fetch suggestions");
  }
}




module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ ltd, lng ], radius / 6371] // in KM
      }
    }
  });

  return captains;
}