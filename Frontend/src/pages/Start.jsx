import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-[url(./background.jpg)] bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-8' src='./uber_logo.png'></img>
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link to="/login" className='flex items-center justify-center w-full bg-[#000814] text-white rounded py-3 mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start