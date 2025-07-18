import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // ✅

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('You have logged out');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#009688' }} className="shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold text-white tracking-wide">
          <Link to="/" className="hover:opacity-80 transition">ShopEasy</Link>
        </div>

        <div className="flex items-center space-x-6 text-base font-medium">
          <Link to="/" className="text-white hover:text-yellow-200">Home</Link>
          <Link to="/products" className="text-white hover:text-yellow-200">Products</Link>
          <Link to="/cart" className="text-white hover:text-yellow-200">Cart</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-[#009688] font-semibold rounded-full hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-[#009688] font-semibold rounded-full hover:bg-yellow-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
