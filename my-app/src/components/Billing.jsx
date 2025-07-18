import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleUpi = () => {
    navigate('/upi-payment', {
      state: {
        cartItems,
        totalAmount,
        paymentMethod: 'UPI',
      },
    });
  };

  const handleCod = () => {
    navigate('/address', {
      state: {
        cartItems,
        totalAmount,
        paymentMethod: 'COD',
      },
    });
  };

  if (cartItems.length === 0) {
    return <div className="p-6 text-center text-gray-600 text-lg">No items to pay for.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg bg-gradient-to-b from-green-100 to-green-200">
      <h1 className="text-3xl font-bold text-center text-green-900 mb-8">Billing</h1>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2 text-gray-700">
            <span>{item.title} × {item.quantity}</span>
            <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="text-right border-t pt-4 mb-6">
        <h2 className="text-2xl font-bold text-green-800">Total: ₹{totalAmount}</h2>
      </div>

      <div className="text-center space-x-4 mt-6">
        <button
          onClick={handleUpi}
          className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 transition font-medium shadow-md"
        >
          Pay Now via UPI
        </button>
        <button
          onClick={handleCod}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-md"
        >
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};

export default Billing;
