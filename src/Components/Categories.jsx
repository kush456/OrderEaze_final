import React from "react";
import { useState } from "react";
import { scroller } from "react-scroll";

export default function Categories(){
    const [showAllCategories, setShowAllCategories] = useState(false);

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

      // scroll functionality
        const scrollToCategory = (category) => {
            scroller.scrollTo(category, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
            });
        };

        const initialCategoriesToShow = 8; // to implement more info less info

      return(
        <>
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
        </>
      )
}