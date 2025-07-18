const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
});

// ✅ Use a unique name: "AdminUser" instead of "User"
// ✅ Use mongoose.models to prevent overwriting on hot reload
module.exports = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
