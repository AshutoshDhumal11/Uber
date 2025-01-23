import React from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client'

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketContextProvider = ({children}) => {

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to server")
        });

        socket.on('disconnect', () => {
            console.log("Disconnected from server");
        }) 
    }, []);

    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    }

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback)
    }
    const value = {
        socket,
        sendMessage, receiveMessage
    }

    return (
        <SocketContext.Provider value = {value}>{children}</SocketContext.Provider>
    )
}

export default SocketContextProvider