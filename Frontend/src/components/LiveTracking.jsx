import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error(("Error obtaining position.", error));
        }
      );
    };

    updatePosition(); // for initial position update

    const intervalId = setInterval(updatePosition, 5000); // update position after every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <LoadScript
        googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`} // Replace with your Google Maps API Key
        onLoad={() => setIsGoogleLoaded(true)}
      >
        {isGoogleLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
          >
          {
            currentPosition && (
              <Marker
                position={currentPosition}
              ></Marker>
            ) 
          }
          </GoogleMap>
        )}
      </LoadScript>
    </>
  );
};

export default LiveTracking;
