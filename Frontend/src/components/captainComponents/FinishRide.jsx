import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import axios from "axios";

const FinishRide = ({ ride, setFinishRidePanelOpen }) => {

    const navigate = useNavigate();

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
            { 
                rideId: ride._id
            }, { headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        );

        if(response.status === 200) {
            setFinishRidePanelOpen(false);
            navigate('/captain-home');
        }
    }

  return (
    <div>
      <h5
        onClick={() => setFinishRidePanelOpen(false)}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride!</h3>

      {/* User Information */}
      <div className="flex justify-between items-center p-4 border-2 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={userImage}
          ></img>
          <h2 className="text-lg font-medium">
            {ride?.user?.fullname.firstname +
              " " +
              ride?.user?.fullname?.lastname}
          </h2>
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
              <p className="text-sm -mt-1 text-gray-600 ">
                {ride?.destination}
              </p>
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

        <div className="mt-10 w-full">
          <button
            onClick={() => endRide()}
            className="w-full mt-5 flex justify-center items-center bg-green-600 text-lg text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
