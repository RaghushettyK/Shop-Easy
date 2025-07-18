import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Truck, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [timer, setTimer] = useState(10);
  const [delivered, setDelivered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/address/latest');
        setDeliveryInfo(response.data);
      } catch (error) {
        console.error('Error fetching delivery info:', error);
      }
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setDelivered(true);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  // 👇 Clear cart and redirect after delivery
  useEffect(() => {
    let redirectTimer;
    if (delivered) {
      // Clear the cart
      localStorage.removeItem('cart'); // or: localStorage.setItem('cart', JSON.stringify([]))

      // Redirect to home after 5 seconds
      redirectTimer = setTimeout(() => {
        navigate('/');
      }, 5000);
    }
    return () => clearTimeout(redirectTimer);
  }, [delivered, navigate]);

  if (!deliveryInfo) {
    return (
      <div className="p-6 text-center text-red-600 text-lg font-semibold">
        No delivery information found.
      </div>
    );
  }

  const { fullName, addressLine, city, pinCode, paymentMethod } = deliveryInfo;

  const currentStep = delivered ? 3 : timer > 6 ? 1 : timer > 3 ? 2 : 3;

  const steps = [
    { label: 'Order Placed', icon: Package },
    { label: 'On the Way', icon: Truck },
    { label: 'Delivered', icon: CheckCircle },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Delivery Status
      </h1>

      {/* Step Progress Bar */}
      <div className="flex justify-between items-center relative mb-10 px-4">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0 transform -translate-y-1/2"></div>
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const Icon = step.icon;
          return (
            <div key={index} className="relative z-10 flex flex-col items-center text-center w-1/3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-all duration-300 ${
                isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${
                isCompleted ? 'text-green-700' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {!delivered ? (
        <div className="text-center text-xl font-medium text-gray-800 mb-4">
          Delivering to your address in <span className="font-bold">{timer}</span> seconds...
        </div>
      ) : (
        <div className="text-center text-2xl font-semibold text-green-700 mb-4">
          ✅ Product Delivered Successfully!
          <div className="text-sm mt-2 text-gray-600">Redirecting to Home...</div>
        </div>
      )}

      <div className="bg-gray-100 rounded-lg p-4 shadow-sm space-y-2 text-gray-800 text-md">
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Address:</strong> {addressLine}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>PIN Code:</strong> {pinCode}</p>
        <p><strong>Payment Method:</strong> <span className="uppercase">{paymentMethod}</span></p>
      </div>

      {paymentMethod === 'UPI' && !delivered && (
        <div className="mt-4 text-center text-red-600 font-semibold text-lg">
          ⚠ Payment Pending via UPI
        </div>
      )}
    </div>
  );
};

export default Delivery;
