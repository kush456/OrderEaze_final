import React from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
export const MyBasket = () => {
  const location = useLocation();
  const { order } = location.state || { order: {} };
console.log("ye order jo menu se aya h",order);
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.error('User is not logged in');
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      const orderData = {
        userId:userId,
        items: order,
        
        // totalAmount: calculateTotalPrice(order)
      };
      console.log("orderdata name in mybasket",orderData.items);
  
      const response = await fetch(BASE_URL+ 'api/order', {
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
      console.log('Order placed:', savedOrder);
      alert("Order placed successfully");
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-700">&larr;</button>
        <h2 className="text-xl font-semibold">My Basket</h2>
        <button className="text-red-500">Add Items</button>
      </div>
      <div className="space-y-4">
        {Object.keys(order).map(category => (
          order[category].map(item => (
            <div key={item.name} className="border p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {(item.special === "yes") ? 
                  <>
                    <p className="text-gray-400 line-through">{item.price}</p>
                    <p className="text-red-500 text-lg">{"here discounted price will come"}</p> 
                  </> :
                  <>
                  <p className="text-red-500 text-lg">{item.price}</p> 
                  </>
                  }
                  
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
      </div>
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-gray-700">Deliver to</h4>
          <p className="text-gray-900 font-semibold">Home</p>
          <p className="text-gray-500">221B Baker Street, London, United Kingdom</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="text-gray-700">Payment method</h4>
          <p className="text-gray-900 font-semibold">Cash</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{/* Total Price */}</h3>
        <button onClick={handlePlaceOrder} className="px-6 py-3 bg-red-500 text-white rounded-lg">Place Order</button>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import {Element, scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Basket from '../Components/Basket';
import Profile from '../Components/Profile';
import Categories from '../Components/Categories';
import { BASE_URL } from './local';


const MenuPage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [order, setOrder] = useState([]);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();

  //Load order 
  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    // console.log(savedOrder);
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  //save order
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("was run");
      localStorage.setItem('order', JSON.stringify(order));
      console.log("Kaju ne kya set kia ",order)  
      //order is an object with burger,taco,burrito,drink,pizza
    }
  }, [order]);

  

  const foodItems = {
    Burger: [
      { id: 1, name: 'Cheeseburger', description: 'A delicious cheeseburger', price: '$5.99', special: 'no' },
      { id: 2, name: 'Veggie Burger', description: 'A tasty veggie burger', price: '$4.99', special: 'no' },
    ],
    Taco: [
      { id: 3, name: 'Chicken Taco', description: 'Spicy chicken taco', price: '$3.99', special: 'no' },
      { id: 4, name: 'Beef Taco', description: 'Savory beef taco', price: '$4.49', special: 'no' },
    ],
    Burrito: [
      { id: 5, name: 'Bean Burrito', description: 'A hearty bean burrito', price: '$6.99', special: 'no' },
      { id: 6, name: 'Chicken Burrito', description: 'A flavorful chicken burrito', price: '$7.99', special: 'no' },
    ],
    Drink: [
      { id: 7, name: 'Coca Cola', description: 'Refreshing cola drink', price: '$1.99', special: 'no' },
      { id: 8, name: 'Orange Juice', description: 'Freshly squeezed orange juice', price: '$2.49', special: 'no' },
    ],
    Pizza: [
      { id: 9, name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza', price: '$8.99', special: 'no' },
      { id: 10, name: 'Margherita Pizza', description: 'Traditional Margherita pizza', price: '$7.99', special: 'no' },
    ],
    Donut: [
      { id: 11, name: 'Glazed Donut', description: 'Sweet glazed donut', price: '$1.49', special: 'no' },
      { id: 12, name: 'Chocolate Donut', description: 'Rich chocolate donut', price: '$1.99', special: 'no' },
    ],
    Salad: [
      { id: 13, name: 'Caesar Salad', description: 'Crisp Caesar salad', price: '$5.99', special: 'no' },
      { id: 14, name: 'Greek Salad', description: 'Fresh Greek salad', price: '$6.49', special: 'no' },
    ],
    Noodles: [
      { id: 15, name: 'Spicy Ramen', description: 'Hot and spicy ramen noodles', price: '$7.99', special: 'no' },
      { id: 16, name: 'Pad Thai', description: 'Classic Thai noodle dish', price: '$8.99', special: 'no' },
    ],
    Sandwich: [
      { id: 17, name: 'Turkey Sandwich', description: 'Turkey sandwich with lettuce', price: '$5.99', special: 'no' },
      { id: 18, name: 'Ham Sandwich', description: 'Ham sandwich with cheese', price: '$5.49', special: 'no' },
    ],
    Pasta: [
      { id: 19, name: 'Spaghetti Bolognese', description: 'Pasta with meat sauce', price: '$9.99', special: 'no' },
      { id: 20, name: 'Penne Alfredo', description: 'Pasta with creamy Alfredo sauce', price: '$8.99', special: 'no' },
    ],
    IceCream: [
      { id: 21, name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream', price: '$2.99', special: 'yes' },
      { id: 22, name: 'Chocolate Ice Cream', description: 'Rich chocolate ice cream', price: '$2.99', special: 'yes' },
    ],
  };

  const offers = [
    { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% off' },
    { title: 'Burger Fest', description: 'Big Juicy Burgers', offer: 'Buy 1, Get 1 Free!' },
    { title: 'Taco Special', description: 'Tasty Tacos', offer: 'Buy 2, Get 1 Free!' },
  ];


  const nextOffer = () => {
    setCurrentOfferIndex((currentOfferIndex + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOfferIndex((currentOfferIndex - 1 + offers.length) % offers.length);
  };

  // for searching
  const filteredFoodItems = Object.keys(foodItems).reduce((filteredItems, category) => {
    const filteredCategoryItems = foodItems[category].filter((foodItem) => {
      const itemNameLowercase = foodItem.name.toLowerCase();
      const searchQueryLowercase = searchQuery.toLowerCase();

      if (itemNameLowercase.includes(searchQueryLowercase)) {
        return true;
      }

      return false;
    });

    return {
      ...filteredItems,
      [category]: filteredCategoryItems,
    };
  }, {});

  //console.log(filteredFoodItems);

  // for filtering/sorting (not functional yet)
  const sortedFoodItems = Object.keys(filteredFoodItems).reduce((sortedItems, category) => {
    const sortedCategoryItems = filteredFoodItems[category].sort((a, b) => {
      if (filterOption === 'price-low-to-high') {
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      } else if (filterOption === 'price-high-to-low') {
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      }

      return 0;
    });

    return {
      ...sortedItems,
      [category]: sortedCategoryItems,
    };
  }, {});

  // adding and removing from order functionality
  const addToOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      if (itemIndex === -1) {
        return {
          ...prevOrder,
          [category]: [...categoryOrder, { ...item, quantity: 1 }],
        };
      } else {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity + 1 };
        return {
          ...prevOrder,
          [category]: [
            ...categoryOrder.slice(0, itemIndex),
            updatedItem,
            ...categoryOrder.slice(itemIndex + 1),
          ],
        };
      }
    });
  };

  console.log("asd",order);

  const removeFromOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      if (itemIndex !== -1) {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity - 1 };

        if (updatedItem.quantity > 0) {
          return {
            ...prevOrder,
            [category]: [
              ...categoryOrder.slice(0, itemIndex),
              updatedItem,
              ...categoryOrder.slice(itemIndex + 1),
            ],
          };
        } else {
          return {
            ...prevOrder,
            [category]: [
              ...categoryOrder.slice(0, itemIndex),
              ...categoryOrder.slice(itemIndex + 1),
            ],
          };
        }
      }

      return prevOrder;
    });
  };

  

  const goToBasket = () => {
    navigate('/mybasket', { state: { order } });
  };

  return (
    
      <div className="p-5">
        <header className="text-center mb-5 flex justify-between">
          <button >
            <Profile/>
          </button>
          <div>
            <h1 className="text-2xl">Welcome To</h1>
            <h2 className="text-2xl font-bold text-red-500">Desi Tadka</h2>
          </div>
          <button onClick={goToBasket}>
            <Basket />
          </button>
        </header>

        {/* special offers */}
        <section className="relative mb-5">
          <div className="bg-red-400 p-4 rounded-lg text-center mx-4 my-4 min-h-40">
            <h2 className="text-2xl text-white font-bold">{offers[currentOfferIndex].title}</h2>
            <p className="text-xl text-white mt-2">{offers[currentOfferIndex].description}</p>
            <p className="text-lg text-white mt-2">{offers[currentOfferIndex].offer}</p>
          </div>
          <button
            onClick={prevOffer}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10"
          >
            &lt;
          </button>
          <button
            onClick={nextOffer}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full w-10 h-10"
          >
            &gt;
          </button>
        </section>

        {/* Search bar and Filter dropdown */}
        {/*size of dropwdowns needs to be fixed*/}
        <div className="flex justify-center mb-5 space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-3/4"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/4 max-w-full"
          >
            <option className="max-w-full overflow-hidden" value="none">Sort</option>
            <option className="max-w-full overflow-hidden" value="price-low-to-high">Price: Low to High</option>
            <option className="max-w-full overflow-hidden" value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>

        {/*category component*/}
        <Categories/>

        
        {/* food items */}
        <div>
          {Object.keys(sortedFoodItems).map(category => (
            <Element name={category} key={category}>
              {sortedFoodItems[category].length > 0 && 
                <h3 className="text-xl font-bold mt-5 mb-3">{category}</h3>
              }
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedFoodItems[category].map(item => (
                  <div key={item.name} className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800">
                      {item.special === 'yes' ? (
                        <>
                          <span className="line-through mr-2">{item.price}</span>
                          <span>{`${(parseFloat(item.price.slice(1)) * 0.6).toFixed(2)}`}</span>
                        </>
                      ) : (
                        item.price
                      )}
                    </p>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => addToOrder(category, item)}
                        className="mt-2 p-2 bg-green-500 text-white rounded-lg"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => removeFromOrder(category, item)}
                        className="mt-2 p-2 bg-red-500 text-white rounded-lg ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Element>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-5">
          <h3 className="text-xl font-bold mb-3">Your Order</h3>
          {Object.keys(order).length === 0 ? (
            <p>No items in your order.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(order).map(category => (
                order[category].map(item => (
                  <div key={item.name} className="border border-gray-300 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800">
                      {item.special === 'yes' ? (
                        <>
                          <span className="line-through mr-2">{item.price}</span>
                          <span>{`${(parseFloat(item.price.slice(1)) * 0.6).toFixed(2)}`}</span>
                        </>
                      ) : (
                        item.price
                      )}
                    </p>
                    <p className="text-gray-800">Quantity: {item.quantity}</p>
                    <button
                      onClick={() => removeFromOrder(category, item)}
                      className="mt-2 p-2 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                    
                  </div>
                ))
              ))}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default MenuPage;