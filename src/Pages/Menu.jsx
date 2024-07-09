import React, { useEffect, useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import axios from "axios";

const Menu = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [order, setOrder] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [tableInfo, setTableInfo] = useState(""); // Mocked table info
  const [foodItems, setfoodItems] = useState(""); // Mocked table info

  // useEffect(() => {
  //   const storedValue = localStorage.getItem('tableNo');
  //   if (storedValue) {
  //     setTableInfo(storedValue);
  //   }
  // }, []);


  const categories = [
    { name: 'Burger', icon: '🍔' },
    { name: 'Taco', icon: '🌮' },
    { name: 'Burrito', icon: '🌯' },
    { name: 'Drink', icon: '🥤' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Donut', icon: '🍩' },
    { name: 'Salad', icon: '🥗' },
    { name: 'Noodles', icon: '🍜' },
    { name: 'Sandwich', icon: '🥪' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'IceCream', icon: '🍨' },
  ];

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/menu');
        setfoodItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const offers = [
    { 
      title: 'Ice Cream Day', 
      description: 'Get your sweet ice cream', 
      offer: '40% off',
      type: 'discount',
      discount: 0.4,
      item: 'IceCream'
    },
    { 
      title: 'Burger Fest', 
      description: 'Big Juicy Burgers', 
      offer: 'Buy 1, Get 1 Free!',
      type: 'buyGetFree',
      x: 1,
      y: 1,
      item: 'Burger'
    },
    { 
      title: 'Taco Special', 
      description: 'Tasty Tacos', 
      offer: 'Buy 2, Get 1 Free!',
      type: 'buyGetFree',
      x: 2,
      y: 1,
      item: 'Taco'
    },
    // Add more offers as needed
  ];

  //discount formula
  const calculateDiscountedPrice = (originalPrice, discount) => {
    const price = parseFloat(originalPrice.slice(1));
    const discountedPrice = price * (1 - discount);
    return `$${discountedPrice.toFixed(2)}`;
  };
  
  
  //scroll functionality
  const scrollToCategory = (category) => {
    scroller.scrollTo(category, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const nextOffer = () => {
    setCurrentOfferIndex((currentOfferIndex + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentOfferIndex((currentOfferIndex - 1 + offers.length) % offers.length);
  };

  //for searching
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

  //for filtering/sorting(not functional yet)
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

  //adding and removing from order functionality
  const addToOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      //console.log(itemIndex);
      if (itemIndex === -1) {
        return {
          ...prevOrder,//array of objects category, each category is an object again containing a property quantity.
          [category]: [...categoryOrder, { ...item, quantity: 1 }],
        };
      } else {
        const updatedItem = { ...categoryOrder[itemIndex], quantity: categoryOrder[itemIndex].quantity + 1 };
        console.log("value increased");
        return {
          ...prevOrder,
          [category]: [
            ...categoryOrder.slice(0, itemIndex),
            updatedItem,
            ...categoryOrder.slice(itemIndex + 1),
          ],
        };
      }
    }, () => {
      checkBuyGetFreeOffers(); // After updating order, check buy get free offers
    });
  };

  const checkBuyGetFreeOffers = () => {
    offers.forEach(offer => {
      if (offer.type === 'buyGetFree') {
        const { x, y, item } = offer;
        const orderedItems = order[item] || [];
        const totalOrdered = orderedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  
        if (totalOrdered >= x && totalOrdered % x === 0) {
          // Notify user that they are eligible for free items
          alert(`Add ${y} more ${item}(s) for free`);
        }
      }
    });
  };

  const removeFromOrder = (category, item) => {
    setOrder(prevOrder => {
      const categoryOrder = prevOrder[category] || [];
      const itemIndex = categoryOrder.findIndex(i => i.name === item.name);
      //console.log("remove called");
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

  const initialCategoriesToShow = 8; // to implement more info less info

  return (
    <div className="p-5">
      <header className="text-center mb-5">
        <h1 className="text-2xl ">Welcome To</h1>
        <h2 className="text-2xl font-bold text-red-500">Desi Tadka </h2>
      </header>
      <div className="fixed top-0 left-0  bg-white rounded-lg shadow p-2">
          <h2 className="text-lg font-bold mb-2">Table Info</h2>
          <p className="text-gray-600">Table No: {tableInfo}</p>
        </div>
      {/*special offers*/}
      <section className="relative mb-5">
        <div className="bg-red-400 p-4 rounded-lg text-center mx-4 my-4 min-h-40 ">
          <h2 className="text-xl text-left text-white ">{offers[currentOfferIndex].title}</h2>
          <h1 className="text-2xl text-left text-white font-semibold max-w-30">{offers[currentOfferIndex].description}</h1>
          <h1 className="text-4xl text-white font-semibold mt-3">{offers[currentOfferIndex].offer}</h1>
        </div>
        {currentOfferIndex > 0 && (
          <button onClick={prevOffer} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ">❮</button>
        )}
        {currentOfferIndex < offers.length - 1 && (
          <button onClick={nextOffer} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ">❯</button>
        )}
        
      </section>
      
      {/*search bar*/}
      <section className="flex justify-center mb-2">
          <form action="/search" className="max-w-[480px] w-full px-4">
            <div className="relative">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border h-12 shadow p-4 rounded-lg dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                placeholder="search"
              />
              <button type="submit">
                <svg className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{enableBackground:"new 0 0 56.966 56.966"}} xmlSpace="preserve">
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
                  </path>
                </svg>
              </button>
            </div>
          </form>
      </section>
      {searchQuery!=='' && Object.keys(filteredFoodItems).map(category => (
        filteredFoodItems[category].length > 0 && (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {filteredFoodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="font-bold">{item.price}</p>
              </div>
            ))}
          </Element>
        )
      ))}
        {/*category divs*/}
      <section className="flex flex-wrap justify-around mb-5">
        {categories.slice(0, showAllCategories ? categories.length : initialCategoriesToShow).map((category, index) => (
          <div
            key={category.name}
            className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
            onClick={() => scrollToCategory(category.name)}
          >
            <span className="text-2xl">{category.icon}</span>
            <p>{category.name}</p>
          </div>
        ))}
        {/*more info less info*/}
        {!showAllCategories ? (
          <div
            className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
            onClick={() => setShowAllCategories(true)}
          >
            <span className="text-2xl">➕</span>
            <p>More Info</p>
          </div>
        ) : (
          <div
            className="bg-white-200 p-4 m-2 rounded-lg text-center cursor-pointer w-24 shadow-md shadow-gray border border-white"
            onClick={() => setShowAllCategories(false)}
          >
            <span className="text-2xl">➖</span>
            <p>Less Info</p>
          </div>
        )}
      </section>

      {/* Special Offers */}
      <section className="mb-5">
        <h2 className="text-xl font-bold mb-3">Special Offers</h2>
        
        {offers.map((offer, index) => (
          <div key={index} className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold">{offer.title}</h3>
            <p>{offer.description}</p>
            <p className="font-bold">{offer.offer}</p>
            {offer.type === 'discount' && (
              <div>
                <h4 className="font-bold mt-2">Discounts</h4>
                {foodItems[offer.item].map(item => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div>
                      <del className="text-gray-500">{item.price}</del>
                      <p className="font-bold">{calculateDiscountedPrice(item.price, offer.discount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {offer.type === 'buyGetFree' && (
              <div>
                <h4 className="font-bold mt-2">Free Items</h4>
                <p>Add {offer.y} more {offer.item}(s) for free</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/*food items*/}
      <section>
        {searchQuery==='' && Object.keys(foodItems).map(category => (
          <Element key={category} name={category} className="mb-5">
            <h2 className="text-xl font-bold mb-3">{category}</h2>
            {foodItems[category].map(item => (
              <div key={item.name} className="p-4 border-b border-gray-300 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="font-bold">{item.price}</p>
                </div>
                <div className="flex items-center">
                {/*conditional rendering for adding orders or removing them*/}
                  {order[category] && order[category].some(i => i.name === item.name) ? (
                    <>
                      <button
                        className="text-red-500"
                        onClick={() => removeFromOrder(category, item)}
                      >
                        <span className="mr-3">-</span>
                      </button>
                      <span>{order[category].find(i => i.name === item.name).quantity}</span>
                      <button
                        className="text-green-500"
                        onClick={() => addToOrder(category, item)}
                      >
                        <span className='ml-3'>+</span>
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-green-500"
                      onClick={() => addToOrder(category, item)}
                    >
                      <span>+</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Element>
        ))}
      </section>
    </div>
  );
};

export default Menu;