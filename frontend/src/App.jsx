import { Routes, Route } from 'react-router-dom';
import { useCartStore } from './store/useCartStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import SuccessModal from './components/SuccessModal';
import { Toaster } from 'react-hot-toast';

function App() {
  const { setIsCartOpen } = useCartStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Overlays / Modals */}
      <CartModal />
      <CheckoutModal />
      <SuccessModal />

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
