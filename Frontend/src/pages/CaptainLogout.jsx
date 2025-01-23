import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CaptainLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if(!token) {
            navigate('/captain-login');
            return;
        }

        const logoutCaptain = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        
                if(response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                    setIsLoading(false);
                    return;
                }
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        logoutCaptain();
    }, [token, navigate])

    if(isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
        
    return null;
}

export default CaptainLogout