import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onQuickView }) {
  const { cart, wishlist, toggleWishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlist.includes(product.id);
  const isInCart = cart[product.id] > 0;

  return (
    <motion.div 
      className="premium-card bg-white dark:bg-[#121926] rounded-2xl overflow-hidden relative group transition-all duration-300 flex flex-col h-full border border-slate-100 dark:border-slate-800/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow hover:bg-white dark:hover:bg-slate-900 transition-all active:scale-75"
        title="Add to Wishlist"
      >
        <Heart 
          size={16} 
          className={`transition-colors ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'}`} 
        />
      </button>

      {/* Product Image Section */}
      <div className="relative pt-[100%] overflow-hidden bg-gray-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            {product.discount}% OFF
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="p-2.5 bg-white text-slate-800 rounded-full shadow-lg hover:bg-flipkart-blue hover:text-white transition-all transform hover:scale-110"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand Name */}
        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1">{product.brand}</span>
        
        {/* Product Title */}
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-indigo-500 dark:hover:text-blue-400 mb-1.5 leading-snug cursor-pointer flex-1">
          {product.name}
        </h3>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-xs">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
            ({product.ratingCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Pricing Info */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-base font-extrabold text-slate-900 dark:text-white">
            ₹{product.price.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[9px] text-rose-500 dark:text-rose-400 font-extrabold bg-rose-50 dark:bg-rose-950/20 px-1.5 py-0.5 rounded-full">
                {product.discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Badges / Extras */}
        <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mb-4 flex flex-col gap-1 border-t border-gray-50 dark:border-slate-700/50 pt-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-indigo-500 font-black">✓</span>
            <span>{product.deliveryDays === 1 ? 'Free Next-Day Delivery' : `Free Delivery in ${product.deliveryDays} Days`}</span>
          </div>
          {product.emiOption !== 'N/A' && (
            <div className="text-[9px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/10 px-2 py-0.5 rounded w-max">
              💳 {product.emiOption}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart(product.id);
          }}
          className={`w-full py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow active:scale-[0.97] ${
            isInCart 
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-105 text-white' 
              : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:brightness-110 text-white shadow-indigo-500/10 shadow-lg'
          }`}
        >
          <ShoppingCart size={13} />
          {isInCart ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    </motion.div>
  );
}
