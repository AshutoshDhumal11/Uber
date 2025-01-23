import React, { useContext, useEffect } from 'react'
import carImage from "../assets/car.png"
import mapImage from "../assets/map.gif"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = ({vehicleImage, ridePrice}) => {

    const { receiveMessage } = useContext(SocketContext);

    const location = useLocation();
    const { ride } = location?.state || {};

    const navigate = useNavigate();

    useEffect( () => {
        receiveMessage('ride-ended', (data) => {
            navigate('/home')
        })
    }, [ receiveMessage ])

    return (
        <div className='h-screen w-screen'>
            <div className="w-screen fixed p-5 top-0 flex justify-between items-center">   
                <img className="w-14 translate-y-2" src="./uber_logo_black.png"></img>
                <Link to={"/home"} className='fixed h-12 w-12 right-4 top-4 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-xl font-medium ri-home-4-line"></i>
                </Link>
            </div>
            <div className='h-[55%]'>
                <LiveTracking/>
            </div>

            <div className='h-[40%] p-4'>
                <div className='flex items-center justify-between'>
                    {/* <img className='h-20' src={vehicleImage}></img> */}
                    <img className='h-28 w-28' src={carImage}></img>
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 items-center justify-between flex-col'>
                    <div className='w-full mt-5'>
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
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Make a Payment
                </button>
            </div>
        </div>
    )
}

export default Riding