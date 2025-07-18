const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// POST /api/address - Save new address (i.e., transaction)
router.post('/', async (req, res) => {
  try {
    const { fullName, addressLine, city, pinCode, paymentMethod } = req.body;

    const newAddress = new Address({
      fullName,
      addressLine,
      city,
      pinCode,
      paymentMethod
    });

    const saved = await newAddress.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ GET /api/address - Get all address records (all transactions)
router.get('/', async (req, res) => {
  try {
    const allAddresses = await Address.find().sort({ createdAt: -1 });
    res.json(allAddresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
});

// GET /api/address/latest - Get only the latest transaction
router.get('/latest', async (req, res) => {
  try {
    const latest = await Address.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: 'No address found' });
    }
    res.json(latest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching address', error });
  }
});

module.exports = router;
