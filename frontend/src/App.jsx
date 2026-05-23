import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginModal from './components/LoginModal';
import QuickViewModal from './components/QuickViewModal';

function AppContent() {
  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleOpenQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Header navbar */}
      <Navbar onOpenLogin={handleOpenLogin} />

      {/* Pages content routes wrapper */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onQuickView={handleOpenQuickView} />} />
          <Route path="/search" element={<Home onQuickView={handleOpenQuickView} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage onQuickView={handleOpenQuickView} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Corporate detailed footer */}
      <Footer />

      {/* Dynamic Overlay Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} />
      
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={quickViewProduct !== null} 
        onClose={handleCloseQuickView} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ShopProvider>
  );
}
