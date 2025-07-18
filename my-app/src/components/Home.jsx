import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center gap-14 border-b border-gray-200">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-5 tracking-wide">
            🌿 Fresh & Organic
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-gray-900">
            Fresh Vegetables & <br /> Fruits Delivered <br /> To Your Door
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Enjoy the taste of freshness—straight from trusted local farms to your table.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition duration-300 text-lg font-semibold tracking-wide"
          >
            Shop Now <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src="https://res.cloudinary.com/dyj3rywju/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_center/v1740632582/hero_new0nv.avif"
            alt="Vegetables"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-b border-gray-200">
        {[
          {
            title: '🥕 Fresh from Farm',
            desc: 'Direct from local farmers to ensure maximum freshness.',
          },
          {
            title: '🚚 Free Delivery',
            desc: 'Free delivery on all orders above ₹499 in your area.',
          },
          {
            title: '✅ Quality Guarantee',
            desc: '100% satisfaction guaranteed or your money back.',
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white hover:shadow-md transition p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800 tracking-wide">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Best Sellers Header */}
      <section className="text-center py-16 bg-white border-b border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 tracking-tight">🌟 Best Sellers</h2>
        <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          These items are selling out fast. Grab yours before they're gone!
        </p>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="border border-gray-200 rounded-2xl shadow-sm p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Stay Updated with Fresh Deals</h2>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full px-5 py-3 border border-gray-300 focus:outline-none focus:ring w-full"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition font-medium tracking-wide"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
