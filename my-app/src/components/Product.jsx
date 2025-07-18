import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [showDescriptionId, setShowDescriptionId] = useState(null);
  const [sortBy, setSortBy] = useState('relevant');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/?category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, [category]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const handleImageClick = (id) => {
    setShowDescriptionId(prevId => (prevId === id ? null : id));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0; // relevant
  });

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold capitalize text-gray-800">{category}</h1>
            <p className="text-gray-500 mt-2">Browse the best products in this category</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                onClick={() => handleImageClick(product._id)}
                className="w-full h-56 object-cover cursor-pointer"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                <p className="text-gray-600 mt-1 text-sm">₹ {product.price} / kg</p>

                {showDescriptionId === product._id && (
                  <div className="mt-3 bg-gray-100 text-gray-700 p-2 rounded text-sm">
                    {product.description}
                  </div>
                )}

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
