import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { captain, setCaptain } = useContext(CaptainContext);
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();

        const newCaptain = {
            email: email,
            password: password,
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, newCaptain);

        if(response.status === 200) {
            const data = response.data;
            
            localStorage.setItem('token', data.token);
            setCaptain(data.captain);
            navigate('/captain-home')
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className='w-12 mb-5' src='./uber_logo_black.png'></img>
                <form onSubmit={submitHandler}>
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

                    <button className="bg-[#000814] text-white font-semibold mb-3 mt-2 rounded px-4 py-2 w-full text-lg">Login</button>

                    <p className="text-center">New here? <Link to={"/captain-signup"} className="text-blue-600">Register as a Captain</Link></p>
                </form>
            </div>

            <div>
                <Link to={"/login"} className="bg-[#ffd60a] flex justify-center items-center mb-6 text-white font-semibold rounded px-4 py-2 w-full text-lg">Sign in as User</Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
