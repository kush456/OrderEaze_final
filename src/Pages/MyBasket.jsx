import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const MyBasket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialOrder = location.state?.order || {};
  const [order, setOrder] = useState(initialOrder);
  const selectedPayment = location.state?.selectedPayment || [];
  const selectedCard = location.state?.selectedCard || [];
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if order is placed

  useEffect(() => {
    // Calculate discounted prices for all items in the order
    const updatedOrder = { ...order };
    Object.keys(updatedOrder).forEach(category => {
      updatedOrder[category] = updatedOrder[category].map(item => ({
        ...item,
        discountedPrice: item.special === 'yes' ? calculateDiscountedPrice(item) : item.price
      }));
    });
    setOrder(updatedOrder);
  }, [initialOrder]);

  const calculateDiscountedPrice = (item) => {
    const discountRate = 0.6; // Assuming a 40% discount
    const originalPrice = parseFloat(item.price.slice(1));
    const discountedPrice = (originalPrice * discountRate).toFixed(2);
    return `$${discountedPrice}`;
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not logged in');
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      const items = Object.keys(order).map(category =>
        order[category].map(item => ({
          category: category,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat((item.discountedPrice || item.price).slice(1)), // Convert price to number
          special: item.special
        }))
      ).flat();
      
      const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
      const orderData = {
        userId: userId,
        items: items,
        orderDate: new Date().toISOString(),
        totalAmount: totalAmount,
        status: 'active'
      };
      console.log('Order data being sent:', orderData); //logging to check
      const response = await fetch('http://localhost:4000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const savedOrder = await response.json();
      alert("Order placed successfully");
      setOrderPlaced(true); // Set order placed flag to true
  
      // Clear the local storage and reset the order state
      localStorage.removeItem('order');
      setOrder({});
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (Object.keys(order).length > 0) {
      Object.keys(order).forEach(category => {
        order[category].forEach(item => {
          const itemPrice = (item.special === 'yes' && item.discountedPrice) ?
            parseFloat(item.discountedPrice.slice(1)) * item.quantity :
            parseFloat(item.price.slice(1)) * item.quantity;

          totalPrice += itemPrice;
        });
      });
    }

    return totalPrice.toFixed(2);
  };
  const goToPayments = () => {
    navigate('/payment', { state: { order} });
  }
  const goToMenu = () => {
    navigate('/menu', { state: { order } });
  };

  const goToOrderHistory = () => {
    navigate('/history'); // Navigate to order history page
  };

  //console.log("order in basket ", order);
  return (
    <div className="max-w-lg mx-auto mb-32 p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Basket</h2>
        <button className="text-red-500" onClick={goToMenu}>Add Items</button>
      </div>
      {Object.keys(order).length === 0 && !orderPlaced ? (
        <p className="text-center text-gray-500">Your basket is empty.</p>
      ) : (
        <div className="space-y-4">
          {Object.keys(order).map(category => (
            order[category].map(item => (
              <div key={item.name} className="border p-4 rounded-lg">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    {(item.special === "yes") ? (
                      <>
                        <p className="text-gray-400 line-through">{item.price}</p>
                        <p className="text-red-500 text-lg">{item.discountedPrice}</p>
                      </>
                    ) : (
                      <p className="text-red-500 text-lg">{item.price}</p>
                    )}
                  </div>
                  <button className="text-gray-400">&times;</button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <button className="px-2 py-1 border rounded-l">-</button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button className="px-2 py-1 border rounded-r">+</button>
                  </div>
                </div>
              </div>
            ))
          ))}
          {!orderPlaced && (
            <div onClick={goToPayments} className="bg-gray-100 rounded-lg p-4 mt-4 cursor-pointer">
              <h4 className="text-gray-900 font-semibold">Payment method</h4>
              {selectedPayment.length > 0 && <p className='text-gray-500'>{selectedPayment}</p>}
              {selectedCard.number && <p className='text-gray-500'>{selectedCard.number}</p>}
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-around w-11/12 fixed bottom-0 px-4 py-3 my-2 mr-2 bg-white border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold">${calculateTotalPrice()} </h3>
        {orderPlaced ? (
          <button onClick={goToOrderHistory} className="px-6 py-3 bg-blue-500 text-white rounded-lg">Order History</button>
        ) : (
          <button onClick={handlePlaceOrder} className="px-6 py-3 bg-red-500 text-white rounded-lg">Place Order</button>
        )}
      </div>
    </div>
  );
};
