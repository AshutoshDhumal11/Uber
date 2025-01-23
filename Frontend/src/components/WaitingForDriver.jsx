import React from 'react'

const WaitingForDriver = ({ ride, setWaitingForDriverPanelOpen, vehicleImage }) => {
    return (
        <div>
            <h5
                onClick={() => setWaitingForDriverPanelOpen(false)}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Meet at pickup point</h3>

            <div className='flex items-center justify-between'>
                <img className='h-20' src={vehicleImage}></img>
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname?.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className='text-lg font-semibold'>OTP : {ride?.otp}</h1>
                </div>
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
                            <h3 className='text-lg font-medium'>₹ {ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver