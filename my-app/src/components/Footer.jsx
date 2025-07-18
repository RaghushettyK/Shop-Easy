import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#023D54] text-white py-8 px-6 mt-10 border-none shadow-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">ShopEasy</h2>
          <p className="mt-2 text-sm">
            Fresh Vegetables & Fruits Delivered to Your Door
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-400 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/category" className="hover:text-blue-400 transition">
                Category
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-400 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/billing" className="hover:text-blue-400 transition">
                Billing
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-sm">
            📧 Email:{' '}
            <a
              href="mailto:ShopEasy@gmail.com"
              className="text-blue-400 hover:underline"
            >
              ShopEasy@gmail.com
            </a>
          </p>
          <p className="text-sm mt-2">
            📞 Phone:{' '}
            <a
              href="tel:+919353449422"
              className="text-blue-400 hover:underline"
            >
              +91 9353449422
            </a>
          </p>
        </div>
      </div>

      <div className="text-center text-xs mt-8 text-gray-400">
        © {new Date().getFullYear()} ShopEasy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
