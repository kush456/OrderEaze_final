import React, { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Basket from '../Components/Basket';
import Profile from '../Components/Profile';
import Categories from '../Components/Categories';

const MenuPage = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [order, setOrder] = useState([]);
  const isInitialMount = useRef(true);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);
  const navigate = useNavigate();

  // Load order from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  // Save order to localStorage
  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem('order', JSON.stringify(order));
    } else {
      isInitialMount.current = false;
    }
  }, [order]);

  // Food items and offers definition
  const foodItems = {
    Burger: [
      { name: 'Cheeseburger', description: 'A delicious cheeseburger', price: '$5.99', special: 'yes', category: "Burger" },
      { name: 'Veggie Burger', description: 'A tasty veggie burger', price: '$4.99', special: 'yes', category: "Burger" },
    ],
    Taco: [
      { name: 'Chicken Taco', description: 'Spicy chicken taco', price: '$3.99', special: 'yes', category: "Taco" },
      { name: 'Beef Taco', description: 'Savory beef taco', price: '$4.49', special: 'yes', category: "Taco" },
    ],
    // Add more categories and items as needed
  };

  const offers = [
    { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% off', itemCategory: 'IceCream', discount: 40 },
    { title: 'Burger Fest', description: 'Big Juicy Burgers', offer: '20% off', itemCategory: 'Burger', discount: 20 },
    { title: 'Taco Special', description: 'Tasty Tacos', offer: '15% off', itemCategory: 'Taco', discount: 15 },
    // Add more offers as needed
  ];

  // Functions for navigating offers
  const nextOffer = () => {
    setCurrentOfferIndex((currentOfferIndex + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOfferIndex((currentOfferIndex - 1 + offers.length) % offers.length);
  };

  // Function for adding items to order
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

  // Function for removing items from order
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

  // Function to calculate discounted price
  const calculateDiscountedPrice = (item) => {
    const offer = offers.find(offer => offer.itemCategory === item.category);
    if (offer && item.special === 'yes') {
      const discountPrice = parseFloat(item.price.slice(1)) * (1 - offer.discount / 100);
      return discountPrice.toFixed(2);
    }
    return item.price; // Return original price if no discount applies
  };

  // Function to navigate to basket page
  const goToBasket = () => {
    navigate('/mybasket', { state: { order } });
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming token is stored in localStorage
    localStorage.removeItem('order'); // Clear order data
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="p-5 pb-20">
      <header className="text-center mb-5 flex justify-between">
        <button>
          <Profile />
        </button>
        <div>
          <h1 className="text-2xl">Welcome To</h1>
          <h2 className="text-2xl font-bold text-red-500">Desi Tadka</h2>
        </div>
        <button onClick={goToBasket}>
          <Basket />
        </button>
      </header>

      {/* Special Offers */}
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
          <option value="none">Sort</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Category Component */}
      <Categories />

      {/* Food Items */}
      <div>
        {Object.keys(foodItems).map(category => (
          <Element name={category} key={category}>
            {foodItems[category].length > 0 &&
              <h3 className="text-xl font-bold mt-5 mb-3">{category}</h3>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodItems[category].map(item => (
                <div key={item.name} className="border border-gray-300 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-800">
                    {item.special === 'yes' ? (
                      <>
                        <span className="line-through mr-2">{item.price}</span>
                        <span>{calculateDiscountedPrice(item)}</span>
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

      {/* Fixed Order Summary and Feedback Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className='flex justify-between items-center'>
            <h3 className="text-xl font-bold mb-3">Your Order</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}
                className="text-xl font-bold mb-3 underline"
              >
                {isOrderSummaryVisible ? 'Minimize' : 'Expand'}
              </button>
              <button className='text-xl font-bold mb-3 underline' onClick={goToBasket}>
                My Basket
              </button>
              <button className='text-xl font-bold mb-3 underline' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          {isOrderSummaryVisible && (
            <div>
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
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate('/feedback')}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg"
                >
                  Give Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
