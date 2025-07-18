import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const incrementQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBillingClick = () => {
    navigate('/billing');
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-600 text-xl bg-[#eaf4ea]">
        🛒 Your cart is empty.
      </div>
    );
  }

  return (
    <div className="bg-[#eaf4ea] py-12 px-4 sm:px-6 lg:px-12 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center gap-6 border border-gray-200 rounded-xl p-5 bg-white shadow-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">{product.title}</h2>
                  <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{product.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(product.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
                    >
                      +
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-[#165B33]">
                    ₹{(product.price * product.quantity).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="bg-[#165B33] text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Summary</h2>

            <div className="flex justify-between text-lg mb-4">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t border-white pt-4 mb-6">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleBillingClick}
            className="w-full mt-6 bg-white text-[#165B33] hover:bg-gray-200 py-3 rounded-lg text-lg font-bold transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
