import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserSignup = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser } = useContext(UserContext)

  const submitHandler = async (event) => {
    event.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home')
    } 

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <div className="px-5 py-5 h-screen flex flex-col justify-between">
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

            <button className="bg-[#000814] text-white font-semibold mb-3 mt-2 rounded px-4 py-2 w-full text-lg">Create Account</button>

            <p className="text-center">Already Registered? <Link to={"/login"} className="text-blue-600">Login here</Link></p>
          </form>
        </div>

        <div className="mb-6">
          <p className="text-[10px] text-[#6c757d] leading-tight">By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including
                    by automated means, from Uber and its affiliates to the number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
