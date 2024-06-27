import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const TableInput = () => {
    const navigate = useNavigate();
  const [tableNo, setTableNo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (tableNo === '' || isNaN(tableNo)) {
      setError('Please enter a valid table number.');
      return;
    }
    alert(`Table number ${tableNo} submitted!`);
    localStorage.setItem('tableNo', tableNo);
    navigate('/Menu');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-red-500">Table Input</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Table Number</label>
            <input
              type="text"
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your table number"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button type="submit" className="w-full py-3 mb-4 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600">
            Submit
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default TableInput;
