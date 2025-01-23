import React from 'react'

const LocationSearchPanel = ({ activeField, suggestions, setPickup, setDestination}) => {

    return (
    <div>
        {
            suggestions.map( (location, index) => {
                return (
                    <div
                        onClick={() => {
                            if(activeField === "pickup") {
                                setPickup(location.description);
                            } else if(activeField === "destination") {
                                setDestination(location.description);
                            }
                        }}
                        key={index}
                        className='flex justify-start active:border-black border-2 border-gray-50 p-3 gap-4 items-center my-2 rounded-lg'>
                        <div className='bg-[#eee] h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full'>
                            <i className="ri-map-pin-line text-lg"></i>
                        </div>
                        <h4 className='font-md text-sm text-gray-800'>{location.description}</h4>
                    </div>
                )
            })
        }
    </div>
  )
}

export default LocationSearchPanel