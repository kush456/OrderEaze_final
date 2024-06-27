// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { initializeApp } from 'firebase/app'
// import { auth } from '../Firebase'; // Import auth from firebase.js
// import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast from react-hot-toast
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [code, setCode] = useState('');
//   const [confirmError, setConfirmError] = useState(null);

//   function setUpRecaptha(phone) {
//     const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       'size': 'normal',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         // ...
//       },
//       'expired-callback': () => {
//         // Response expired. Ask user to solve reCAPTCHA again.
//         // ...
//       }
//     })
//     recaptchaVerifier.render();
   
//     return (signInWithPhoneNumber(auth, phone, recaptchaVerifier))
    
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUpRecaptha(phone)
//   }

//   const handleChange = (event) => {
//     event.preventDefault();
//     setPhone(event.target.value);
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Toaster toastOptions={{ duration: 4000 }} />
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="mb-6 text-2xl font-semibold text-center text-red-500">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div id="recaptcha-container" className="mb-4"></div> {/* Recaptcha container */}
//           <button type="submit" className="w-full py-3 mb-4 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600">
//             Send Verification Code
//           </button>
//         </form>
//         {/* Uncomment this section when implementing the OTP verification */}
//         {/* {showOTP && (
//           <>
//             <div className="mb-4">
//               <label className="block mb-2 text-sm font-medium text-gray-700">Verification Code</label>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 placeholder="Enter verification code"
//               />
//               {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
//             </div>
//             <button className="w-full py-3 mb-4 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-600">
//               Verify Code
//             </button>
//           </>
//         )} */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-700">
//             Don't have an account? <a href="/register" className="text-red-500">Register</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




















// import React, { useState } from 'react';
// import { Link, Element } from 'react-scroll';
// import 'tailwindcss/tailwind.css';

// const MenuPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterOption, setFilterOption] = useState('none');
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const [order, setOrder] = useState({});
//   const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
//   const [tableInfo, setTableInfo] = useState(1); // Mocked table info

//   const categories = [
//     { name: 'Burger', icon: '🍔' },
//     { name: 'Taco', icon: '🌮' },
//     { name: 'Burrito', icon: '🌯' },
//     { name: 'Drink', icon: '🥤' },
//     { name: 'Pizza', icon: '🍕' },
//     { name: 'Donut', icon: '🍩' },
//     { name: 'Salad', icon: '🥗' },
//     { name: 'Noodles', icon: '🍜' },
//     { name: 'Sandwich', icon: '🥪' },
//     { name: 'Pasta', icon: '🍝' },
//     { name: 'Ice Cream', icon: '🍨' },
//   ];

//   const foodItems = [
//     { category: 'Burger', name: 'Cheeseburger', description: 'Tasty cheeseburger', price: '$5.99' },
//     { category: 'Burger', name: 'Veggie Burger', description: 'Delicious veggie burger', price: '$6.99' },
//     { category: 'Pizza', name: 'Pepperoni Pizza', description: 'Cheesy pepperoni pizza', price: '$8.99' },
//     { category: 'Pizza', name: 'Margherita Pizza', description: 'Classic margherita pizza', price: '$7.99' },
//     { category: 'Ice Cream', name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream', price: '$3.99' },
//   ];

//   const offers = [
//     { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% OFF', type: 'discount', item: 'Ice Cream', discount: 40 },
//     { title: 'Burger Bonanza', description: 'Buy one get one free', offer: 'BOGO', type: 'bogo', item: 'Burger', discount: 50 },
//   ];

//   const sortedFoodItems = foodItems.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = [];
//     }
//     acc[item.category].push(item);
//     return acc;
//   }, {});

//   const scrollToCategory = (category) => {
//     const element = document.getElementById(category);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const calculateDiscountedPrice = (price, discount) => {
//     const originalPrice = parseFloat(price.slice(1));
//     const discountedPrice = originalPrice * ((100 - discount) / 100);
//     return `$${discountedPrice.toFixed(2)}`;
//   };

//   const prevOffer = () => {
//     setCurrentOfferIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length);
//   };

//   const nextOffer = () => {
//     setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
//   };

//   const addToOrder = (category, item) => {
//     setOrder((prevOrder) => {
//       const categoryOrder = prevOrder[category] || [];
//       const existingItemIndex = categoryOrder.findIndex((i) => i.name === item.name);
//       if (existingItemIndex !== -1) {
//         const updatedItem = {
//           ...categoryOrder[existingItemIndex],
//           quantity: categoryOrder[existingItemIndex].quantity + 1,
//         };
//         return {
//           ...prevOrder,
//           [category]: [
//             ...categoryOrder.slice(0, existingItemIndex),
//             updatedItem,
//             ...categoryOrder.slice(existingItemIndex + 1),
//           ],
//         };
//       } else {
//         return {
//           ...prevOrder,
//           [category]: [...categoryOrder, { ...item, quantity: 1 }],
//         };
//       }
//     });
//   };

//   const removeFromOrder = (category, item) => {
//     setOrder((prevOrder) => {
//       const categoryOrder = prevOrder[category] || [];
//       const itemIndex = categoryOrder.findIndex((i) => i.name === item.name);
//       if (itemIndex !== -1) {
//         if (categoryOrder[itemIndex].quantity > 1) {
//           const updatedItem = {
//             ...categoryOrder[itemIndex],
//             quantity: categoryOrder[itemIndex].quantity - 1,
//           };
//           return {
//             ...prevOrder,
//             [category]: [
//               ...categoryOrder.slice(0, itemIndex),
//               updatedItem,
//               ...categoryOrder.slice(itemIndex + 1),
//             ],
//           };
//         } else {
//           return {
//             ...prevOrder,
//             [category]: [
//               ...categoryOrder.slice(0, itemIndex),
//               ...categoryOrder.slice(itemIndex + 1),
//             ],
//           };
//         }
//       }
//       return prevOrder;
//     });
//   };

//   const totalPrice = Object.keys(order).reduce((total, category) => {
//     const categoryOrder = order[category] || [];
//     const categoryTotal = categoryOrder.reduce((categorySum, item) => {
//       const itemPrice = parseFloat(item.price.slice(1));
//       return categorySum + itemPrice * item.quantity;
//     }, 0);
//     return total + categoryTotal;
//   }, 0);

//   const placeOrder = () => {
//     alert(`Order placed! Total: $${totalPrice.toFixed(2)}`);
//     setOrder({});
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="relative flex items-center mb-2">
//         <div className="fixed top-0 left-0 p-4 bg-white rounded-lg shadow p-2">
//           <h2 className="text-lg font-bold mb-2">Table Info</h2>
//           <p className="text-gray-600">Table No: {tableInfo}</p>
//         </div>
//         <div className="w-full">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
//           />
//           <select
//             value={filterOption}
//             onChange={(e) => setFilterOption(e.target.value)}
//             className="ml-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//           >
//             <option value="none">Sort By</option>
//             <option value="price-low-to-high">Price: Low to High</option>
//             <option value="price-high-to-low">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-2xl font-bold mb-2">Current Offer</h2>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-xl font-semibold">{offers[currentOfferIndex].title}</h3>
//           <p className="text-gray-600">{offers[currentOfferIndex].description}</p>
//           <p className="text-red-500 font-bold">{offers[currentOfferIndex].offer}</p>
//           <div className="flex justify-between mt-2">
//             <button onClick={prevOffer} className="text-blue-500">Previous</button>
//             <button onClick={nextOffer} className="text-blue-500">Next</button>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-wrap justify-center">
//         {categories.slice(0, showAllCategories ? categories.length : 8).map((category, index) => (
//           <Link
//             key={index}
//             to={category.name}
//             spy={true}
//             smooth={true}
//             offset={-70}
//             duration={500}
//             className="w-1/4 md:w-1/6 p-2 text-center cursor-pointer"
//             onClick={() => scrollToCategory(category.name)}
//           >
//             <div className="bg-white p-4 rounded-lg shadow hover:bg-blue-100">
//               <span className="text-3xl">{category.icon}</span>
//               <p className="mt-2">{category.name}</p>
//             </div>
//           </Link>
//         ))}
//         {!showAllCategories && categories.length > 8 && (
//           <div className="w-1/4 md:w-1/6 p-2 text-center cursor-pointer">
//             <div className="bg-white p-4 rounded-lg shadow hover:bg-blue-100" onClick={() => setShowAllCategories(true)}>
//               <span className="text-3xl">...</span>
//               <p className="mt-2">More</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="mt-4">
//         <h2 className="text-2xl font-bold mb-2">Special Offers</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <img src="burger.jpg" alt="Burger" className="w-full h-40 object-cover rounded-lg mb-2" />
//             <h3 className="text-xl font-semibold">Cheeseburger</h3>
//             <p className="text-gray-600">Tasty cheeseburger with extra cheese</p>
//             <p className="text-red-500 font-bold">$5.99</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <img src="ice-cream.jpg" alt="Ice Cream" className="w-full h-40 object-cover rounded-lg mb-2" />
//             <h3 className="text-xl font-semibold">Vanilla Ice Cream</h3>
//             <p className="text-gray-600">Creamy vanilla ice cream</p>
//             <p className="text-red-500 font-bold">$3.99</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-8">
//         {Object.keys(sortedFoodItems).map((category) => (
//           <Element key={category} name={category}>
//             <h2 id={category} className="text-2xl font-bold mb-4">
//               {category}
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {sortedFoodItems[category]
//                 .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//                 .sort((a, b) => {
//                   if (filterOption === 'price-low-to-high') {
//                     return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
//                   } else if (filterOption === 'price-high-to-low') {
//                     return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
//                   } else {
//                     return 0;
//                   }
//                 })
//                 .map((item, index) => (
//                   <div key={index} className="bg-white p-4 rounded-lg shadow">
//                     <h3 className="text-xl font-semibold">{item.name}</h3>
//                     <p className="text-gray-600">{item.description}</p>
//                     <p className="text-red-500 font-bold">
//                       {offers.some((offer) => offer.item === item.category)
//                         ? calculateDiscountedPrice(
//                             item.price,
//                             offers.find((offer) => offer.item === item.category).discount
//                           )
//                         : item.price}
//                     </p>
//                     <div className="flex justify-between mt-2">
//                       <button
//                         onClick={() => addToOrder(category, item)}
//                         className="text-green-500 font-bold"
//                       >
//                         Add
//                       </button>
//                       {order[category] &&
//                         order[category].find((i) => i.name === item.name) && (
//                           <button
//                             onClick={() => removeFromOrder(category, item)}
//                             className="text-red-500 font-bold"
//                           >
//                             Remove
//                           </button>
//                         )}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </Element>
//         ))}
//       </div>
//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
//         <h2 className="text-2xl font-bold mb-4">Your Order</h2>
//         {Object.keys(order).map((category) =>
//           order[category].map((item, index) => (
//             <div key={index} className="flex justify-between items-center mb-2">
//               <div>
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">
//                   {item.quantity} x {item.price}
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => addToOrder(category, item)}
//                   className="text-green-500 font-bold mx-2"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => removeFromOrder(category, item)}
//                   className="text-red-500 font-bold"
//                 >
//                   -
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold">Total:</h3>
//           <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
//         </div>
//         <button
//           onClick={placeOrder}
//           className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuPage;

















// const [error, setError] = useState("");
//   const [result, setResult] = useState("");
//   const [flag, setFlag] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [showOTP, setShowOTP] = useState(false);
//   const [confirmError, setConfirmError] = useState('');
//   const [code, setCode] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(45);

//   React.useEffect(() => {
//     if (showOTP) {
//       const interval = setInterval(() => {
//         setTimer(prev => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [showOTP]);

//   const setUpRecaptcha = (phone) => {
//     try {
//       const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
//         'size': 'normal',
//         'callback': (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//         },
//         'expired-callback': () => {
//           // Response expired. Ask user to solve reCAPTCHA again.
//         }
//       }, auth);
//       recaptchaVerifier.render();
//       return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
//     } catch (error) {
//       console.error("Recaptcha setup error:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(phone);
//     setError("");
//     if (phone === "" || phone === undefined)
//       return setError("Please enter a valid phone number!");
//     try {
//       const response = await setUpRecaptcha(phone);
//       setResult(response);
//       setShowOTP(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const otp = code.join('');
//     setConfirmError("");
//     if (otp.length !== 6) {
//       setConfirmError("Please enter a valid 6-digit OTP code.");
//       return;
//     }
//     try {
//       await result.confirm(otp);
//       navigate("/menu");
//     } catch (err) {
//       setConfirmError(err.message);
//     }
//   };

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);
//       if (value && index < 5) {
//         document.getElementById(`code-input-${index + 1}`).focus();
//       }
//     }
//   };








// MENU PAGE
import React, { useEffect, useRef, useState } from 'react';
import {Element, scroller } from 'react-scroll';
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
  const calculateDiscountedPrice = (item) => {
    const offer = offers.find(offer => offer.itemCategory === item.category);
    if (offer && item.special === 'yes') {
      const discountPrice = parseFloat(item.price.slice(1)) * (1 - offer.discount / 100);
      return discountPrice.toFixed(2);
    }
    return item.price; // Return original price if no discount applies
  };
  

  const goToBasket = () => {
    navigate('/mybasket', { state: { order } });
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
        <option className="max-w-full overflow-hidden" value="none">Sort</option>
        <option className="max-w-full overflow-hidden" value="price-low-to-high">Price: Low to High</option>
        <option className="max-w-full overflow-hidden" value="price-high-to-low">Price: High to Low</option>
      </select>
    </div>

    {/* Category Component */}
    <Categories />

    {/* Food Items */}
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
                      {console.log("order", order)}
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