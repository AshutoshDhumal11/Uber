import React, { useState } from "react";
import userImage from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = ({ ride, setRidePopPanel, setConfirmRidePopUpPanel }) => {
  
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: ride._id,
        otp: otp,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    
    if(response.status === 200) {
      setConfirmRidePopUpPanel(false);
      setRidePopPanel(false);
      navigate('/captain-riding', { state: { ride: ride }});
    }
  }
  
  return (
    <div>
      <h5
        onClick={() => setConfirmRidePopUpPanel(false)}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this Ride to Start!
      </h3>

      {/* User Information */}
      <div className="flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={userImage}
          ></img>
          <h2 className="text-lg font-medium capitalize">{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 items-center justify-between flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 ">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">217/10-A</h3>
              <p className="text-sm -mt-1 text-gray-600 ">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-cash-line"></i>
            <div>
              {/* <h3 className='text-lg font-medium'>₹ {ridePrice}</h3> */}
              <h3 className="text-lg font-medium">₹ {ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600 ">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={(event) => submitHandler(event)}>
            <input onChange={(event) => setOtp(event.target.value)} value={otp} type="text" placeholder="Enter OTP" className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full placeholder:text-base"></input>

            <button className="w-full mt-5 text-lg flex justify-center items-center bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>

            <button
              onClick={() => {
                setConfirmRidePopUpPanel(false);
                setRidePopPanel(false);
              }}
              className="w-full mt-2 text-lg text-white bg-red-600 font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
