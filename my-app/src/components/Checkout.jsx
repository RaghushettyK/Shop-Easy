import React from 'react';
import { useCart } from './CartContext.jsx';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert('Order placed successfully! 🎉');
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Your cart is empty 🛒</h2>
          <p className="text-gray-500 mt-2">Add items to continue checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-gray-200 p-4 rounded shadow-sm bg-white"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-lg font-bold text-green-600">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Total: <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </h2>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
