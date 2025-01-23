import React, { createElement } from "react";
import carImage from "../assets/car.png";
import bikeImage from "../assets/bike.webp";
import autoImage from "../assets/auto.png";

const VehiclePanel = ({ fare, selectVehicle, setVehiclePanelOpen, setConfirmRidePanelOpen, setVehicleImage }) => {

    return (
        <div>
            <h5
                onClick={() => setVehiclePanelOpen(false)}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a ride</h3>

            <div
                onClick={() => {
                    setVehiclePanelOpen(false);
                    setConfirmRidePanelOpen(true);
                    setVehicleImage(carImage);
                    selectVehicle('car')
                }}
                className="mb-2 flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl">
                <img className="h-12" src={carImage}></img>
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        Uber Go{" "}
                        <span>
                            <i className="ri-user-3-fill"></i>4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable compact rides
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{fare.car}</h2>
            </div>

            <div
                onClick={() => {
                    setVehiclePanelOpen(false);
                    setConfirmRidePanelOpen(true);
                    setVehicleImage(bikeImage);
                    selectVehicle('motorcycle')
                }}
                className="mb-2 flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl">
                <img className="h-12" src={bikeImage}></img>
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        Uber moto{" "}
                        <span>
                            <i className="ri-user-3-fill"></i>1
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">4 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        affordable compact rides
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{fare.motorcycle}</h2>
            </div>

            <div
                onClick={() => {
                    setVehiclePanelOpen(false);
                    setConfirmRidePanelOpen(true);
                    setVehicleImage(autoImage);
                    selectVehicle('auto')
                }}
                className="mb-2 flex items-center justify-between w-full p-3 border-2 active:border-black rounded-xl">
                <img className="h-12" src={autoImage}></img>
                <div className="w-1/2 ml-2">
                    <h4 className="font-medium text-base">
                        Uber Auto{" "}
                        <span>
                            <i className="ri-user-3-fill"></i>3
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">6 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        No bargaining
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
