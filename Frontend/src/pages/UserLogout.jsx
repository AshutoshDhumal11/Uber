import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const logoutUser = async () => {
            if(!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if(response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    setIsLoading(false);
                    return;
                }
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        logoutUser();
    }, [token, navigate]);

    if(isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
    
    return null;
}

export default UserLogout