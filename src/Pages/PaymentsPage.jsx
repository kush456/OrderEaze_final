// src/components/PaymentsPage.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentsPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const isInitialMount = useRef(true);
  const [cards, setCards] = useState([]); 
  const navigate = useNavigate();

  const location = useLocation();
  const { order={} } = location.state || {};

  //Load
  useEffect(() => {
    const savedCard = localStorage.getItem('card');
    const savedPayment = localStorage.getItem('payment');
    if (savedCard) {
      setCards(JSON.parse(savedCard));
      console.log('savedCard',savedCard);
    }
    if (savedPayment) {
      setSelectedPayment(savedPayment);
      console.log('savedPayment',savedPayment);
    }
  }, []);

  //save 
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      //console.log("was run");
      localStorage.setItem('card', JSON.stringify(cards));
      localStorage.setItem('payment', JSON.stringify(selectedPayment));//might have to remove stringify here
    }
  }, [cards, selectedPayment]);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    if (method === 'Card'){
      setIsAddingCard(false);
      setSelectedCard(null);
    } 
  };

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleSaveCardClick = () => {
    //havent made database yet so used local storage 
    const newCard = {
      number: cardNumber,
      id: cards.length + 1, // Assigning a unique ID for the card
    };
    setCards([...cards, newCard]); // Updating the cards array
    setIsAddingCard(false);
    setCardNumber('');
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setSelectedCardId(card.id);
  };

  const handleCancelClick = () => {
    setIsAddingCard(false);
    setCardNumber('');
  };

  const goToBasket = () => {
    if (selectedPayment === 'Card') {
      // If a card is selected, send the selected card and the selected payment method as state
      navigate('/mybasket', { state: { order, selectedCard , selectedPayment: selectedPayment } });
    } else {
      // If a payment method other than card is selected, send the selected payment method as state
      navigate('/mybasket', { state: { order, selectedPayment: selectedPayment } });
    }

  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Payment Methods</h2>
        <ul className="space-y-4">
          {['Cash', 'PayTM', 'Google Pay', 'PhonePe'].map((method) => (
            <li key={method} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer text-lg" onClick={() => handlePaymentSelect(method)}>
              <span>{method}</span>
              <input type="radio" name="payment" checked={selectedPayment === method} readOnly />
            </li>
          ))}
          <li className="p-4 border rounded-lg">
            <div className="flex items-center justify-between text-lg" onClick={() => handlePaymentSelect('Card')}>
              <span>Card</span>
              <input type="radio" name="payment" checked={selectedPayment === 'Card'} readOnly />
            </div>
            {selectedPayment === 'Card' && (
              <div className="mt-4">
                {isAddingCard ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex space-x-4">
                      <button onClick={handleSaveCardClick} className="w-full p-2 bg-green-500 text-white rounded-lg">
                        Save
                      </button>
                      <button onClick={handleCancelClick} className="w-full p-2 bg-red-500 text-white rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={handleAddCardClick} className="mt-4 w-full p-2 bg-gray-200 rounded-lg">
                    + Add New Card
                  </button>
                )}
                {cards.length > 0 && ( // Displaying the cards if there are any
                  <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Cards</h3>
                    <ul className="space-y-2">
                      {cards.map((card) => (
                        <li key={card.id} className={`p-2 border rounded-lg cursor-pointer ${card.id === selectedCardId ? 'bg-red-200' : ''}`} onClick={() => handleCardSelect(card)}>
                          {card.number}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
        
      </div>
      <button onClick={goToBasket} className="mt-6 bg-red-400 text-white rounded-lg shadow-md p-6 w-full max-w-sm md:max-w-md lg:max-w-lg">Apply</button>
    </div>
  );
};

export default PaymentsPage;