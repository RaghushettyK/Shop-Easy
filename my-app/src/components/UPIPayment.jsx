import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UpiPayment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalAmountInPaise = Math.round(parseFloat(state?.totalAmount || '0') * 100);

  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('❌ Razorpay SDK failed to load.');
      return;
    }

    try {
      const orderRes = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmountInPaise,
          cartItems: state?.cartItems || [],
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData?.orderId) {
        alert('❌ Failed to create order');
        return;
      }

      const options = {
        key: 'rzp_test_XUN2HK1j1bSRX7',
        amount: totalAmountInPaise,
        currency: 'INR',
        name: 'EffortOne',
        description: 'Order Payment',
        order_id: orderData.orderId,
        handler: async (response) => {
          const verifyRes = await fetch('http://localhost:5000/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: orderData.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          });

          if (verifyRes.ok) {
            alert(`✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
            navigate('/address', {
              state: {
                cartItems: state?.cartItems,
                totalAmount: state?.totalAmount,
                paymentMethod: 'Online',
                paymentId: response.razorpay_payment_id,
              },
            });
          } else {
            alert('❌ Payment verification failed.');
            navigate('/billing', { state });
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#00C897',
        },
        method: {
          upi: true,
          netbanking: true,
        },
        modal: {
          ondismiss: () => {
            alert('⚠️ Payment was cancelled.');
            navigate('/billing', { state });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Something went wrong!');
      navigate('/billing', { state });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-4">Complete Your Payment</h1>
      <p className="text-center text-gray-600 mb-6">
        Securely pay for your order using UPI or Net Banking.
      </p>

      <div className="border rounded-lg p-4 mb-6 bg-green-50">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Order Summary</h2>
        <div className="flex justify-between text-gray-700">
          <span>Total Amount</span>
          <span className="font-bold text-green-800 text-lg">₹{state?.totalAmount}</span>
        </div>
      </div>

      <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-yellow-700">
          💡 Use test UPI ID <strong>success@razorpay</strong> or select Net Banking → Test Bank for test success.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePayment}
          className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-xl shadow-md transition duration-200"
        >
          Pay ₹{state?.totalAmount} Now
        </button>
      </div>
    </div>
  );
};

export default UpiPayment;
