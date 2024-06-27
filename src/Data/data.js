
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
    { name: 'Ice Cream', icon: '🍨' },
  ];

  const foodItems = [
    { category: 'Burger', name: 'Cheeseburger', description: 'Tasty cheeseburger', price: '$5.99' },
    { category: 'Burger', name: 'Veggie Burger', description: 'Delicious veggie burger', price: '$6.99' },
    { category: 'Pizza', name: 'Pepperoni Pizza', description: 'Cheesy pepperoni pizza', price: '$8.99' },
    { category: 'Pizza', name: 'Margherita Pizza', description: 'Classic margherita pizza', price: '$7.99' },
    { category: 'Ice Cream', name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream', price: '$3.99' },
  ];

  const offers = [
    { title: 'Ice Cream Day', description: 'Get your sweet ice cream', offer: '40% OFF', type: 'discount', item: 'Ice Cream', discount: 40 },
    { title: 'Burger Bonanza', description: 'Buy one get one free', offer: 'BOGO', type: 'bogo', item: 'Burger', discount: 50 },
  ];

module.exports = {
    categories,
    foodItems,
    offers,
  };