const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require('../controller/orderController');

router.post('/create', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;
