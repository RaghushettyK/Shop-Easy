// controllers/orderController.js
require('dotenv').config(); 

const Razorpay = require('razorpay');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const { cartItems, amount } = req.body;

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: 'INR',
      payment_capture: 1,
    });

    const newOrder = new Order({
      cartItems,
      amount,
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.json({ orderId: razorpayOrder.id });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

// ✅ Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId } = req.body;

    const order = await Order.findOne({ razorpayOrderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'paid';
    order.razorpayPaymentId = razorpayPaymentId;

    await order.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
};

// ✅ Export both
module.exports = {
  createOrder,
  verifyPayment,
};
