import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { CaptainContext } from "../context/CaptainContext";

const CaptainSignup = () => {

  const [ firstname, setFirstname ] = useState("");
  const [ lastname, setLastname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ vehicleColor, setVehicleColor ] = useState("");
  const [ vehiclePlate, setVehiclePlate ] = useState("");
  const [ vehicleCapacity, setVehicleCapacity ] = useState("");
  const [ vehicleType, setVehicleType ] = useState("");
  const [ captainData, setCaptainData ] = useState({});

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)

    if(response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehicleCapacity("");
    setVehiclePlate("");
    setVehicleType("");
  }

  return (
    <div>
        <div className="py-5 px-5 h-screen flex flex-col justify-between">
            <div>
                <img className='w-12 mb-5' src='./uber_logo_black.png'></img>
                <form onSubmit={submitHandler}>
                <h3 className="text-base font-medium mb-2">What's your name</h3>
                <div className="flex gap-4 mb-6">
                    <input
                    onChange={(event) => setFirstname(event.target.value)}
                    required
                    value={firstname}
                    type="text"
                    placeholder="First name"
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm">
                    </input>

                    <input
                    onChange={(event) => setLastname(event.target.value)}
                    value={lastname}
                    type="text"
                    placeholder="Last name"
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm">
                    </input>
                </div>

                <h3 className="text-base font-medium mb-2">What's your email</h3>
                <input
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    value={email}
                    type="email"
                    placeholder="email@example.com"
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm">
                </input>

                <h3 className="text-base font-medium mb-2">Enter Password</h3>
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    value={password}
                    type="password"
                    placeholder="password"
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm">
                </input>

                <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
                <div className="flex gap-4 mb-6">
                    <input
                    onChange={(event) => setVehicleColor(event.target.value)}
                    required
                    value={vehicleColor}
                    type="text"
                    placeholder="Vehicle Color"
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm">
                    </input>

                    <input
                    onChange={(event) => setVehiclePlate(event.target.value)}
                    value={vehiclePlate}
                    type="text"
                    placeholder="Vehicle Plate Number"
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm">
                    </input>
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                    onChange={(event) => setVehicleCapacity(event.target.value)}
                    required
                    value={vehicleCapacity}
                    type="text"
                    placeholder="Vehicle Capacity"
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm">
                    </input>

                    <select
                      required
                      className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
                      value={vehicleType}
                      onChange={(event) => setVehicleType(event.target.value)}
                    >
                      <option value="" disabled>Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                </div>

                <button className="bg-[#000814] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">Create Account</button>

                <p className="text-center">Already have an account? <Link to={"/captain-login"} className="text-blue-600">Login here</Link></p>
                </form>
            </div>

            <div className="mb-6">
                <p className="text-[10px] text-[#6c757d] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy and Policy </span>
                    and <span className="underline">Terms of Service</span> apply.
                </p>
            </div>
        </div>
    </div>
  );
};

export default CaptainSignup;
