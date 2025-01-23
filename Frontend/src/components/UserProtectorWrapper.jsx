import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectorWrapper = ({children}) => {

    // const { user } = useContext(UserContext);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {
        const fetchUserProfile = async () => {
            if(!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        
                if(response.status === 200) {
                    setUser(response.data.user);
                }
            } catch(error) {
                console.error(error);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserProfile();
    }, [token, setUser])

    if(isLoading) {
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='spinner'></div>
        </div>
    }

    return (
        <>{children}</>
    )
}

export default UserProtectorWrapper