import React, { useContext } from "react";
import captainImage from '../../assets/captain.png'
import { CaptainContext } from "../../context/CaptainContext";

const CaptainDetails = () => {

  const { captain, setCaptain } = useContext(CaptainContext);

  return (
    <div className=" flex flex-col gap-6">
      {/* Captain name, image and earning */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          {/* Captain Image */}
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={captainImage}
          ></img>
          <h4 className="tex-lg font-medium capitalize">{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold">₹2000</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Captain Data */}
      <div className="flex justify-center items-center mt-2 gap-5 p-3 bg-gray-100 rounded-xl">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-history-line"></i>
          <h5 className="text-lg font-medium">12.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium">12.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-book-open-fill"></i>
          <h5 className="text-lg font-medium">12.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
