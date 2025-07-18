const User = require('../models/Admin-userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Admin Registration
exports.register = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashed,
      isAdmin: !!isAdmin, // ensure boolean
    });

    await newUser.save();
    res.json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isAdmin)
      return res.status(403).json({ error: 'Access denied' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, isAdmin: true },
      'your_jwt_secret'
    );

    res.json({ message: 'Admin login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
