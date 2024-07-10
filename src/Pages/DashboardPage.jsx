// File: AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './local';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [totalPayment, setTotalPayment] = useState(0);
  const [pendingPayment, setPendingPayment] = useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(BASE_URL+ 'api/placedorders');
        const data = response.data;
        console.log(data);
        // Flatten the orders from all users into a single array and add user email to each order
        const fetchedOrders = data.flatMap(user => user.orders.map(order => ({
          ...order, // Spread the order object
          userEmail: user.email // Add the user's email to each order
        })));

        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
  console.log("orders are", orders);


  const filterOrders = () => {
    let filtered = orders.filter(order => {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
      console.log(order.orderDate);//the date is in some other time zone(due to database, but ab leave it, kal dekhenge date ka)
      return orderDate === selectedDate;
    });

   

    if (filter !== 'all') {
      filtered = filtered.filter(order => order.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order._id.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
        // || order.table.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);

    const total = filtered
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const pending = filtered
      .filter(order => order.status !== 'completed')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    setTotalPayment(total);
    setPendingPayment(pending);
  };

  useEffect(() => {
    filterOrders();
  }, [filter, searchTerm, selectedDate, orders]);

  // useEffect(() => {
  //   const selectedDateObj = new Date(selectedDate);

  //   const filteredByDate = orders.filter(order => {
  //     const orderDate = new Date(order.orderDate);
  //     console.log(order.orderDate);
  //     return orderDate.toISOString().split('T')[0] === selectedDateObj.toISOString().split('T')[0];
  //   });

    
  //   const total = filteredByDate
  //     .filter(order => order.status === 'completed')
  //     .reduce((sum, order) => sum + order.totalAmount, 0);

  //   const pending = filteredByDate
  //     .filter(order => order.status !== 'completed')
  //     .reduce((sum, order) => sum + order.totalAmount, 0);

  //   setTotalPayment(total);
  //   setPendingPayment(pending);
  // }, [selectedDate, orders]);


  const handleOrder=(orderId)=>{
    navigate(`/orderdetails/${orderId}`);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleFeedback = () => {
    navigate('/dashboard/feedbacks');
  };

  return (
    <div className="container mx-auto p-10">
      <div className='flex justify-center my-3'>
        <h1 className="text-4xl text-center font-bold text-red-500 ">Orders</h1>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md"
          >
            Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 ${filter === 'all' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setFilter('all'); setIsDropdownOpen(false); }}
              >
                All
              </button>
              <button
                className={`block w-full text-left px-4 py-2 ${filter === 'active' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setFilter('active'); setIsDropdownOpen(false); }}
              >
                Active
              </button>
              <button
                className={`block w-full text-left px-4 py-2 ${filter === 'completed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setFilter('completed'); setIsDropdownOpen(false); }}
              >
                Completed
              </button>
              <button
                className={`block w-full text-left px-4 py-2 ${filter === 'prepared' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setFilter('prepared'); setIsDropdownOpen(false); }}
              >
                Prepared
              </button>
              <button
                className={`block w-full text-left px-4 py-2 ${filter === 'coming to your table' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setFilter('coming to your table'); setIsDropdownOpen(false); }}
              >
                Coming to your table
              </button>
            </div>
          )}
        </div>
        <div className="ml-2">
          <input
            type="date"
            id="date"
            className="block mt-1 p-2 border border-gray-300 rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="p-4 border border-gray-200 rounded-md shadow-md flex justify-between items-center cursor-pointer" onClick={() => handleOrder(order._id)}>
            <div className="flex items-center ">
              <div className='w-20 flex justify-center pr-4' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
                <p className="text-gray-600">Total amount : £{order.totalAmount}</p>
                <p className="text-gray-600">Table: {}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-md ${order.status === 'coming to your table' ? 'bg-yellow-500' : order.status === 'prepared' ? 'bg-orange-500' : order.status === 'completed' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
        <div className="text-lg">
          <span className="font-bold">Total Payment:</span> £{totalPayment.toFixed(2)}
        </div>
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleFeedback}
          >
            Feedbacks
        </button>
        <div className="text-lg">
          <span className="font-bold">Pending Payment:</span> £{pendingPayment.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
