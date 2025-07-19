import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  const [page, setPage] = useState(1);
  const [weightSelections, setWeightSelections] = useState({});
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('https://shop-easy-backend-b3fb.onrender.com/api/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));

    fetch('https://shop-easy-backend-b3fb.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setPage(1);
  };

  const handleWeightChange = (productId, value) => {
    setWeightSelections(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleAddToCart = (product) => {
    const weight = weightSelections[product._id] || '1 kg';
    let finalPrice = product.price;

    if (weight === '500 g') {
      finalPrice = Math.ceil(product.price / 2);
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = storedCart.find(item => item.id === product._id && item.weight === weight);

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map(item =>
        item.id === product._id && item.weight === weight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...storedCart, {
        id: product._id,
        title: product.title,
        image: product.image,
        price: finalPrice,
        weight,
        quantity: 1
      }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const sortedProducts = [...products]
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div
      className="min-h-screen w-full px-6 py-10 font-sans"
      style={{ background: '#e8f6e9' }}
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-[#b2d8b8] border border-[#a4cfa7] p-10 rounded-3xl shadow-md">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-10 uppercase tracking-wide">Filters</h2>
          <div>
            <h3 className="text-2xl font-semibold text-[#333333] mb-6 uppercase tracking-widest">Categories</h3>
            {categories.map((cat, i) => (
              <div key={i} className="mb-4">
                <label className="inline-flex items-center text-xl text-[#222]">
                  <input
                    type="checkbox"
                    className="mr-3 accent-black scale-125"
                    onChange={() => handleCategoryClick(cat)}
                    checked={selectedCategories.includes(cat)}
                  />
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </aside>

        {/* Product Grid Section */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
            <h1 className="text-4xl font-semibold text-[#1A1A1A]">All Products</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#D1D1D1] bg-white rounded-xl px-5 py-3 text-lg text-[#444444] shadow-sm"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {paginatedProducts.map((product) => {
              const weight = weightSelections[product._id] || '1 kg';
              const displayPrice = weight === '500 g' ? Math.ceil(product.price / 2) : product.price;
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product._id}
                  className="bg-white border border-[#D1D1D1] rounded-3xl shadow-lg p-6 hover:shadow-xl transition flex flex-col justify-between min-h-[480px] relative"
                >
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {discount}% OFF
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-contain mb-4 rounded-xl transition-transform duration-300 hover:scale-105"
                  />

                  <p className="text-sm text-[#888] mb-1 font-medium">• 5 MINS</p>
                  <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-3">{product.title}</h2>

                  <select
                    className="text-base border border-gray-300 rounded-lg px-4 py-2 mb-3"
                    onChange={(e) => handleWeightChange(product._id, e.target.value)}
                    value={weight}
                  >
                    <option value="1 kg">1 kg</option>
                    <option value="500 g">500 g</option>
                  </select>

                  <p className="text-xl font-bold text-[#1A1A1A]">
                    ₹{displayPrice}{' '}
                    <span className="text-gray-400 line-through text-sm ml-2">
                      ₹{product.originalPrice}
                    </span>
                  </p>

                  <p className="text-[#555] text-sm mt-2 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <button
                    className="w-full bg-[#1A1A1A] hover:bg-gray-900 text-white py-3 rounded-xl text-lg font-medium transition"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-14">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition duration-200 ${
                page === 1
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              Prev
            </button>

            <span className="text-xl text-[#1A1A1A] font-bold">Page {page}</span>

            <button
              onClick={() =>
                setPage(prev =>
                  prev * itemsPerPage < sortedProducts.length ? prev + 1 : prev
                )
              }
              disabled={page * itemsPerPage >= sortedProducts.length}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition duration-200 ${
                page * itemsPerPage >= sortedProducts.length
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductCategory;
