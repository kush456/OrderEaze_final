import React from 'react'
import { useNavigate } from 'react-router-dom';
export const Landing = () => {
  const navigate = useNavigate();
  
  return (
    <>
    <div className="flex flex-col h-screen justify-between bg-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-center mb-8">
          <img src="path/to/your/image.png" alt="Special Offers" className="w-40 h-40" />
          <p className="text-2xl font-semibold mt-4">Special Offers</p>
          <p className="text-gray-500 mt-2">Weekly deals and discounts.</p>
        </div>
        <div className="flex space-x-2">
          <span className="inline-block w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="inline-block w-6 h-2 bg-rose-600 rounded-full"></span>
          <span className="inline-block w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
      <div className="flex flex-col items-center py-4 space-y-2">
        <button className="w-3/4 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700">Start enjoying</button>
        <button onClick={()=>{
          navigate('/login')
        }} className="w-3/4 py-3 bg-transparent border border-rose-600 text-rose-600 rounded-full hover:bg-rose-100">Login / Registration</button>
      </div>
    </div>

    </>
  )
}
