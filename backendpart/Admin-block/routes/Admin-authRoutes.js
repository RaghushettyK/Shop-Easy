// Admin-authRoutes.js

const express = require('express');
const router = express.Router();
const { register, adminLogin } = require('../controller/Admin-authController');

router.post('/admin-register', register);       // ✅ POST /api/admin-auth/register
router.post('/admin-login', adminLogin);  // ✅ POST /api/admin-auth/admin-login

module.exports = router;
