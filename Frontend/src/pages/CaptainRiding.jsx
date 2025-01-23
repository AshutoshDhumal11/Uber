import React from "react";
import mapImage from "../assets/map.gif";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import FinishRide from "../components/captainComponents/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [ finishRidePanelOpen, setFinishRidePanelOpen ] = useState(false);

  const finishRidePanelRef = useRef(null);

  // for getting the ride data
  const location = useLocation();
  const rideData  = location?.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanelOpen) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanelOpen]
  );

  return (
    <div className="h-screen w-screen">
      {/* Uber logo and logout icon */}
      <div className="w-screen fixed p-5 top-0 flex justify-between items-center">
        <img className="w-10" src="./uber_logo_black.png"></img>
        <Link
          to={"/captain-home"}
          className="h-8 w-8 bg-white flex items-center justify-center rounded-full"
        >
          <i className=" text-sm font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* This is for map */}
      <div className="h-4/5 w-screen top-0 z-[-1]">
        <LiveTracking/>
      </div>

      {/* Captain name, image and other data */}
      <div
        onClick={() => setFinishRidePanelOpen(true)}
        className="h-1/5 relative flex justify-between items-center p-6 bg-yellow-400 gap-2"
      >
        <h5 className="p-1 text-center absolute top-0 w-[90%]">
          <i className="text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold py-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanelOpen={setFinishRidePanelOpen} />
      </div>
    </div>
  );
};

export default CaptainRiding;
