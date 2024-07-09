import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  const initialOrder = {};
  const [order, setOrder] = useState(initialOrder);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statusOptions] = useState(['active', 'coming to your table', 'prepared', 'completed'])

  console.log("id is" ,orderId);
  //fetch that order only
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/placedorders/${orderId}`);
        const data = response.data;
        setOrder(data);
        console.log("data set ", data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);
  
  console.log("the order is ", order);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleStatusChange = async (newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not logged in');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      await axios.patch(`http://localhost:4000/api/placedorders/${orderId}/status`,
         { status: newStatus },
         { headers: { 'Authorization': `Bearer ${token}` } }
        );
      setOrder((prevOrder) => ({ ...prevOrder, order: { ...prevOrder.order, status: newStatus } }));
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  
  return (
    <div className="max-w-lg mx-auto mb-32 p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Order Details</h2>
      </div>
      {Object.keys(order).length === 0 ? (
        <p className="text-center text-gray-500">Order not found.</p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Order ID:</h3>
            <p>{order.order._id}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Order Date:</h3>
            <p>{new Date(order.order.orderDate).toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Amount:</h3>
            <p>${order.order.totalAmount}</p>
          </div>
          <h3 className="text-lg font-semibold mb-2">Items:</h3>
          <div className="space-y-4">
            {order.order.items.map(item => (
              <div key={item._id} className="border p-4 rounded-lg">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-red-500">{item.name}</h4>
                    <p>${item.price}</p>
                  </div>
                  <div>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Status:</h3>
            <button 
              className={`px-4 py-2 rounded-md ${order.order.status === 'coming to your table' ? 'bg-yellow-500' : order.order.status === 'prepared' ? 'bg-orange-500' : order.order.status === 'completed' ? 'bg-green-500' : 'bg-red-500'} text-white`}
              onClick={togglePopup}
            >
              {order.order.status.charAt(0).toUpperCase() + order.order.status.slice(1)}
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Change Order Status</h2>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className="block w-full px-4 py-2 text-left text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                  onClick={() => handleStatusChange(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button 
              className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-md"
              onClick={togglePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};