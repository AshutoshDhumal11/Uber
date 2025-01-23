import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios"
import mapImage from "../assets/map.gif";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/captainComponents/CaptainDetails";
import RidePopUp from "../components/captainComponents/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/captainComponents/ConfirmRidePop";
import { SocketContext } from "../context/SocketContext";
import { CaptainContext } from "../context/CaptainContext";

const CaptianHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopPanelRef = useRef(null);
  const confirmRidePopPanelRef = useRef(null);

  const [ ride, setRide ] = useState(null);
  const { captain } = useContext(CaptainContext);
  const { socket, receiveMessage, sendMessage } = useContext(SocketContext);

  useEffect(() => {
    sendMessage("join", {
      userId: captain._id,
      userType: "captain",
    });

    // Send live location of the captain at every 10 seconds to the server
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("userId and location is: ", {
          //   userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude,
          //   }});

          // Here we can also use send message like above
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    return () => clearInterval(locationInterval);
  }, [captain]);

  socket.on('new-ride', (data) => {
    // console.log("new ride data is: ", data);
    setRide(data);
    setRidePopPanel(true);
  });

  const confirmRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride?._id,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    // console.log("Ride confirmed by captain is: ", response.data.ride);
  }

  useGSAP(
    function () {
      if (ridePopPanel) {
        gsap.to(ridePopPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="h-screen">
      {/* Uber logo and logout icon */}
      <div className="w-screen fixed p-5 top-0 flex justify-between items-center">
        <img className="w-12" src="./uber_logo_black.png"></img>
        <Link
          to={"/captain/logout"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* This is for map */}
      <div className="h-3/5">
        {/* Here the map will occurs */}
        <img className="h-full w-full object-cover" src={mapImage}></img>
      </div>

      {/* Captain name, image and other data */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride PopUp */}
      <div
        ref={ridePopPanelRef}
        className="translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <RidePopUp
          ride={ride}
          confirmRide= {confirmRide}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* Confirm Ride */}
      <div
        ref={confirmRidePopPanelRef}
        className="translate-y-full fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptianHome;
