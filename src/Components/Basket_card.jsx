import React from 'react'
import img from "../assests/basket.png"
export const Basket_card = () => {
  return (
    <>
   <div className="border p-4 rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <img src="https://via.placeholder.com/50" alt="Ramen Noodles" className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Ramen Noodles</h3>
              <p className="text-gray-400 line-through">£22.00</p>
              <p className="text-red-500 text-lg">£15.00</p>
            </div>
            <button className="text-gray-400">&times;</button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <button className="px-2 py-1 border rounded-l">-</button>
              <span className="px-4 py-1 border-t border-b">1</span>
              <button className="px-2 py-1 border rounded-r">+</button>
            </div>
          </div>
        </div>



    </>
  )
}

{/* 
    <div class="w-full flex flex-col rounded-lg bg-white border shadow-md">
  <div class="w-[6%] h-[50%] overflow-hidden rounded-lg bg-gray-200">
    <img class="w-[100%] h-[100%] object-fit" src={img} alt="Chicken Burger"/>
  </div>
  <div class="flex flex-col p-6 w-full">
    <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">Chicken Burger</h5>
    <div class="flex flex-row justify-between mt-2">
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">£10.00</p>
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">£6.00</p>
    </div>
    <div class="flex flex-row justify-between mt-1">
      <div class="flex items-center">
        <button type="button" class="focus:outline-none rounded-lg px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-500 dark:text-gray-400">-</button>
        <p class="text-base font-normal text-gray-700 dark:text-gray-400 mx-2">1</p>
        <button type="button" class="focus:outline-none rounded-lg px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-500 dark:text-gray-400">+</button>
      </div>
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">Fill</p>
    </div>
    <div class="flex flex-row justify-between mt-4">
      <div class="flex items-center">
        <input type="checkbox" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded w-4 h-4 text-gray-600 dark:bg-gray-700" id="cheese"/>
        <label for="cheese" class="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">Add Cheese</label>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">£0.50</p>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div class="flex items-center">
        <input type="checkbox" class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded w-4 h-4 text-gray-600 dark:bg-gray-700" id="meat"/>
        <label for="meat" class="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">Add Meat (Extra Patty)</label>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">£2.00</p>
      </div>
    </div>
  </div>
</div> */}