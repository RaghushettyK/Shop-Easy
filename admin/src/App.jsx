import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Products from './pages/Products';
import Transaction from './pages/Transaction';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Admin Pages */}
        <Route path="/products" element={<Products />} />
        <Route path="/transactions" element={<Transaction />} />

        {/* ✅ Redirect unknown routes to /products */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
