import React from 'react';

const About = () => {
  return (
    <div className="px-6 py-12 md:py-16 bg-white text-gray-800 text-[1.05rem] leading-relaxed">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <img
            src="https://res.cloudinary.com/dyj3rywju/image/upload/f_auto,q_auto,w_450,dpr_auto,c_fill,g_center/v1740632706/about_aom5tc.avif"
            alt="Fresh Produce"
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* About Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-blue-600">ABOUT US</h2>
          <p className="mb-5">
            Welcome to <strong>ShopEasy</strong>, your trusted source for farm-fresh vegetables and fruits!
            We're more than just an online grocery store – we're your direct connection to local farmers and
            fresh, organic produce.
          </p>
          <p className="mb-5">
            At ShopEasy, our mission is to make healthy eating accessible by delivering nature's best directly
            to your doorstep. We carefully select each fruit and vegetable, partnering with local farmers who
            share our commitment to sustainable farming.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">Our Mission</h3>
          <p>
            We believe everyone deserves access to farm-fresh produce without compromising on quality or
            convenience. By connecting customers directly with farmers, we support a sustainable food system
            that benefits all.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">WHY CHOOSE US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-semibold text-lg mb-2 text-blue-600">Farm Fresh Quality</h4>
            <p className="text-sm text-gray-600">
              We partner with local farmers to bring you the freshest seasonal produce harvested at peak ripeness.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-semibold text-lg mb-2 text-blue-600">Same Day Delivery</h4>
            <p className="text-sm text-gray-600">
              Order before noon for same-day delivery! Your produce arrives within hours of harvest.
            </p>
          </div>
          <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="font-semibold text-lg mb-2 text-blue-600">100% Organic & Natural</h4>
            <p className="text-sm text-gray-600">
              Guaranteed 100% organic and pesticide-free produce for a healthier lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-amber-50 mt-20 py-10 px-6 rounded-lg max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Stay Updated with Fresh Deals</h2>
        <p className="mb-6 text-gray-600 text-sm">
          Subscribe to our newsletter and receive updates on new products and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring w-full"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
