// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Route imports
// const productRouter = require('./Routes/productRoutes');
// const authRouter = require('./Routes/authRoutes');
// const addressRouter = require('./Routes/addressRoutes');
// const orderRouter = require('./Routes/orderRoutes'); // ✅ Ensure this file exists

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // ✅ Routes
// app.use('/api/products', productRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/address', addressRouter);
// app.use('/api/orders', orderRouter); // ✅ Now fully connected

// // ✅ Server Start
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route imports
const productRouter = require('./Routes/productRoutes');
const authRouter = require('./Routes/authRoutes');
const addressRouter = require('./Routes/addressRoutes');
const orderRouter = require('./Routes/orderRoutes');
const adminAuthRouter = require('./Admin-block/routes/Admin-authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/address', addressRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin-auth', adminAuthRouter); // ✅ Admin login route registered

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
