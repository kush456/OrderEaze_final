import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(0); // 0: Accepted, 1: Being Prepared, 2: Prepared

    const getStatusColor = (step) => {
        return status >= step ? 'bg-green-500' : 'bg-gray-300';
    };

    const getLineColor = (step) => {
        return status >= step ? 'bg-green-500' : 'bg-gray-300';
    };

    const goToMenu = () => {
        navigate('/menu');
      };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">Order Tracking</h1>
            <div className="relative flex items-center w-full max-w-md">
                <div className="relative w-full h-1 bg-gray-300">
                    <div className={`absolute left-0 top-0 h-1 ${getLineColor(1)} transition-all duration-300} style={{ width: status >= 1 ? '50%' : '0%' }`}></div>
                    <div className={`absolute left-1/2 top-0 h-1 ${getLineColor(2)} transition-all duration-300} style={{ width: status === 2 ? '50%' : '0%' }`}></div>
                </div>
                <div className="absolute flex justify-between w-full top-[-15px] md:top-[-10px]">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${getStatusColor(0)} flex items-center justify-center text-white font-semibold`}>1</div>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${getStatusColor(1)} flex items-center justify-center text-white font-semibold`}>2</div>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${getStatusColor(2)} flex items-center justify-center text-white font-semibold`}>3</div>
                </div>
            </div>
            <div className="flex w-full max-w-md justify-between mt-4 px-2">
                <span className="text-xs md:text-sm">Accepted</span>
                <span className="text-xs md:text-sm">Being Prepared</span>
                <span className="text-xs md:text-sm">Prepared</span>
            </div>
            <div className="mt-8 flex flex-col gap-3">
                <button 
                    onClick={() => setStatus((prev) => (prev + 1) % 3)} 
                    className="bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold"
                >
                    Next Status
                </button>
                <button 
                    onClick={goToMenu} 
                    className="bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold"
                >
                    Return To Menu
                </button>
            </div>
        </div>
    );
};

export default OrderTracking;