import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Page Components
import Home from './components/Home.jsx';
import ProductCategory from './components/ProductCategory.jsx';
import Product from './components/Product.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Checkout from './components/Checkout.jsx';
import Billing from './components/Billing.jsx';
import Address from './components/Address.jsx';
import Delivery from './components/Delivery.jsx';
import UpiPayment from './components/UPIPayment.jsx'; // ✅ Correct casing

import About from './components/About.jsx';

// UI Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Context
import { CartProvider } from './components/CartContext.jsx';

const App = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#edf8ed] text-gray-800">
        <BrowserRouter>
          <ScrollToTop />

          {/* Navbar */}
          <header className="sticky top-0 z-50 bg-white shadow-md">
            <Navbar />
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductCategory />} />
              <Route path="/products/category/:category" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/address" element={<Address />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/upi-payment" element={<UpiPayment />} /> {/* ✅ Added */}
              <Route path="/about" element={<About />} />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="p-12 text-center text-red-600 text-2xl font-semibold">
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
};

export default App;
