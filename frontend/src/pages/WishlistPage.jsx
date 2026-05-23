import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function WishlistPage({ onQuickView }) {
  const { wishlist, products } = useShop();

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 transition-colors dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back Link */}
        <Link to="/" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-flipkart-blue dark:hover:text-blue-400 mb-6 select-none">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 mb-6 flex items-center gap-2.5">
          <Heart size={20} className="text-red-500 fill-red-500" />
          <h2 className="text-lg font-black text-slate-850 dark:text-white uppercase tracking-tight">
            My Wishlist ({wishlistedItems.length} Items)
          </h2>
        </div>

        {wishlistedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedItems.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded border p-8 shadow-sm max-w-md mx-auto">
            <div className="text-5xl mb-4 text-red-300">💔</div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-400 mt-1 mb-6 font-medium">Add favorited products to it now to monitor discount drops.</p>
            <Link 
              to="/" 
              className="px-6 py-3 bg-flipkart-blue hover:bg-blue-600 text-white font-extrabold text-xs rounded uppercase tracking-wide shadow-md active:scale-95 transition-all block text-center"
            >
              Explore Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
