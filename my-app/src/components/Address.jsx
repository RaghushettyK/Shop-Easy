import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Address = () => {
  const [form, setForm] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    pinCode: '',
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.paymentMethod) {
      alert('⚠️ Payment method not specified. Redirecting to billing.');
      navigate('/billing');
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullPayload = {
      ...form,
      paymentMethod: state?.paymentMethod,
      paymentId: state?.paymentId || null,
      cartItems: state?.cartItems || [],
      totalAmount: state?.totalAmount || 0,
    };

    try {
      await axios.post('http://localhost:5000/api/address', fullPayload);
      alert('✅ Address saved successfully!');
      navigate('/delivery');
    } catch (error) {
      console.error('❌ Error saving address:', error.response?.data || error.message);
      alert('Failed to save address. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md bg-white mt-10">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="addressLine"
          value={form.addressLine}
          onChange={handleChange}
          placeholder="Address Line"
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="pinCode"
          value={form.pinCode}
          onChange={handleChange}
          placeholder="PIN Code"
          pattern="\d{6}"
          title="Enter a valid 6-digit PIN code"
          required
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition"
        >
          Continue to Delivery
        </button>
      </form>
    </div>
  );
};

export default Address;
