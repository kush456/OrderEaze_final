import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not logged in');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      try {
        const response = await fetch('http://localhost:4000/api/orderhist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReorder = (order) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not logged in');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const orderData = {
        userId: userId,
        items: order.items.map(item => ({
          category: item.category,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          special: item.special
        })),
        orderDate: new Date().toISOString(),
      };

      fetch('http://localhost:4000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(savedOrder => {
          console.log('Order placed:', savedOrder);
          alert("Order placed successfully");
          navigate('/mybasket', { order: savedOrder });
        })
        .catch(error => {
          console.error('Error placing order:', error);
        });

    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Order Date: {new Date(order.orderDate).toLocaleDateString()}</h3>
                <p className="text-gray-700">Total Amount: ${order.totalAmount}</p>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleReorder(order)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reorder
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
