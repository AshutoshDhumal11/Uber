import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDrive from "../components/LookingForDrive";
import WaitingForDriver from "../components/WaitingForDriver";

import mapImage from "../assets/map.gif";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { Link } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [ handleInput, setHandleInput ] = useState(false); // additionally added

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] =
    useState(false);
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] =
    useState(false);

  const [vehicleImage, setVehicleImage] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [ ride, setRide ] = useState(null);

  const { user } = useContext(UserContext);
  const { receiveMessage, sendMessage } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: user._id,
    });

    // after accepting ride by the captain
    receiveMessage('ride-confirmed', (data) => {
      // console.log("the ride with captain is: ", data);
      setRide(data);
      setLookingForDriverPanelOpen(false);
      setWaitingForDriverPanelOpen(true);
    })

    receiveMessage('ride-started', (data) => {
      setRide(data);
      setWaitingForDriverPanelOpen(false);
      navigate('/riding', { state: { ride: data }});
    })
  }, [user, receiveMessage]);

  // // after accepting ride by the captain
  // receiveMessage('ride-confirmed', (data) => {
  //   // console.log("the ride with captain is: ", data);
  //   setRide(data);
  //   setLookingForDriverPanelOpen(false);
  //   setWaitingForDriverPanelOpen(true);
  // })

  // receiveMessage('ride-started', (data) => {
  //   setWaitingForDriverPanelOpen(false);
  //   navigate('/riding');
  // })

  const submitHandler = async (event) => {
    event.preventDefault();
    setPanelOpen(false);
    setVehiclePanelOpen(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickup,
            destination: destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data.fare);
    } catch (error) {
      console.error("Cannot get fare", error.message);
    }
  };

  const handleSuggestion = async (event) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: event.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error while getting suggestions.", error.message);
      setSuggestions([]);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.rideWithUser);
    } catch (error) {
      console.error("Does not create ride.", error.message);
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "65%",
          padding: 24,
          zIndex: 10,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen]
  );

  useGSAP(
    function () {
      if (lookingForDriverPanelOpen) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverPanelOpen]
  );

  useGSAP(
    function () {
      if (waitingForDriverPanelOpen) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanelOpen]
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-12 absolute left-5 top-5"
        src="./uber_logo_black.png"
      ></img>

      {/* image for temporary use */}
      <div className="h-[65%] w-screen absolute z-[1] top-0">
          <LiveTracking/>
      </div>

      {/* form and location suggestions panel*/}
      <div className={ handleInput ? "z-[10] flex flex-col justify-end h-screen absolute top-0 w-full" : "flex flex-col justify-end h-screen absolute top-0 w-full"}>
        {/* Add pickup Dropoff location form */}
        <div className="h-[35%] p-6 bg-yellow-400 relative">
          <h5
            ref={panelCloseRef}
            onClick={() =>{
              setPanelOpen(false);
              setHandleInput(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(event) => {
              submitHandler(event);
              setHandleInput(false);
            }}
          >
            <div className="line absolute h-16 w-[2px] top-[36%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                setHandleInput(true);
              }}
              onChange={(event) => {
                setPickup(event.target.value);
                handleSuggestion(event);
              }}
              value={pickup}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full placeholder:text-base"
              type="text"
              placeholder="Pickup location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                setHandleInput(true);
              }}
              onChange={(event) => {
                setDestination(event.target.value);
                handleSuggestion(event);
              }}
              value={destination}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 placeholder:text-base"
              type="text"
              placeholder="Dropoff location"
            />
            <button className="bg-black text-white mt-5 px-4 py-2 rounded-lg w-full">
              Find Trip
            </button>
          </form>
        </div>

        {/* Pickup and Dropoff location suggestions */}
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            activeField={activeField}
            suggestions={suggestions}
            setPickup={setPickup}
            setDestination={setDestination}
          ></LocationSearchPanel>
        </div>
      </div>

      {/* Choose a vehicle */}
      <div
        ref={vehiclePanelRef}
        className="translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          fare={fare}
          setFare={setFare}
          selectVehicle={setVehicleType}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setVehicleImage={setVehicleImage}
        />
      </div>

      {/* Confirm Ride */}
      <div
        ref={confirmRidePanelRef}
        className="translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          vehicleImage={vehicleImage}
        />
      </div>

      {/* Looking for a driver */}
      <div
        ref={lookingForDriverPanelRef}
        className="translate-y-full fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <LookingForDrive
          pickup={pickup}
          destination={destination}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
          vehicleImage={vehicleImage}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      {/* Waiting for a driver */}
      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
          vehicleImage={vehicleImage}
          fare={fare}
        />
      </div>
    </div>
  );
};

export default Home;
