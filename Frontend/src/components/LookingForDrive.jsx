import React from 'react'

const LookingForDrive = ({fare, pickup, destination, vehicleType, setLookingForDriverPanelOpen, vehicleImage}) => {
    return (
        <div>
            <h5
                onClick={() => setLookingForDriverPanelOpen(false)}
                className="p-1 text-center absolute top-0 w-[93%]"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>

            <div className='flex gap-2 items-center justify-between flex-col'>
                <img className='h-40 w-[50%]' src={vehicleImage}></img>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>217/10-A</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>{destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-cash-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹ {fare[vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600 '>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDrive