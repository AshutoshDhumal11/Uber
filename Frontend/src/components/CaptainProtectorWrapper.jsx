import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectorWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const { setCaptain } = useContext(CaptainContext);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        if(!token) {
            navigate('/captain-login');
            return;
        }

        const fetchCaptainProfile = async() => {
            try {
                // Check the incoming token is valid or not
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if(response.status === 200) {
                    setCaptain(response.data.captain)
                }
            } catch(error) {
                console.error(error);
                localStorage.removeItem('token');
                navigate('/captain-login')
            } finally {
                setIsLoading(false);
            }
        }

        fetchCaptainProfile();
    }, [token, setCaptain])

    if(isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

    return (
        <>{children}</>
    )
}

export default CaptainProtectorWrapper