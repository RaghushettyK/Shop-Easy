const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  paymentMethod: { type: String, enum: ['UPI', 'COD'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);
