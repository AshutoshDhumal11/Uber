import React from 'react'
import userImage from "../../assets/user.png"

const RidePopUp = ({ ride, confirmRide, setRidePopPanel, setConfirmRidePopUpPanel }) => {
    return (
        <div>
            <h5
                onClick={() => setRidePopPanel(false)}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

            {/* User Information */}
            <div className='flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src={userImage}></img>
                    <h2 className='text-lg font-medium'>{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 items-center justify-between flex-col'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>217/10-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>₹ {ridePrice}</h3> */}
                            <h3 className='text-lg font-medium'>₹ {ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='flex w-full mt-5 items-center justify-between'>
                    <button
                        onClick={() => setRidePopPanel(false)}
                        className='bg-gray-300 text-gray-700 font-semibold py-3 px-10 rounded-lg'>
                        Ignore
                    </button>
                    <button
                        onClick={() => {
                            confirmRide();
                            setConfirmRidePopUpPanel(true);
                        }}
                        className='bg-green-600 text-white font-semibold py-3 px-10 rounded-lg'>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp