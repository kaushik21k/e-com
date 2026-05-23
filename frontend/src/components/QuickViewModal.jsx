import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Star, Award, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { cart, wishlist, toggleWishlist, addToCart } = useShop();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const isInWishlist = wishlist.includes(product.id);
  const isInCart = cart[product.id] > 0;

  const handleFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-white dark:bg-[#121926] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-50 max-h-[90vh] md:max-h-[85vh] border border-slate-100 dark:border-slate-800/80"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-slate-800 dark:hover:text-white z-10 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Left Side: Images Section */}
          <div className="md:w-1/2 p-6 bg-slate-50 dark:bg-slate-900/20 flex flex-col justify-between border-r border-slate-100 dark:border-slate-800">
            <div className="flex-1 flex items-center justify-center min-h-[250px] max-h-[350px]">
              <img 
                src={product.images[activeImageIndex]} 
                alt="" 
                className="max-h-[280px] max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded" 
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 p-1 rounded-xl border bg-white dark:bg-slate-900 transition-all ${
                      idx === activeImageIndex 
                        ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/25' 
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details & Actions */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full dark:text-white">
            <div>
              {/* Brand and category */}
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-450 dark:text-slate-500 block mb-1">{product.brand} | {product.category}</span>
              
              {/* Title */}
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug mb-2">
                {product.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-sm">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400 font-bold">
                  ({product.ratingCount.toLocaleString()} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through font-semibold">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-rose-500 dark:text-rose-400 font-extrabold bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-full">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-400 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Key Features</h4>
                <ul className="text-xs space-y-1 text-slate-650 dark:text-slate-350 list-disc pl-4 leading-relaxed font-semibold">
                  {product.highlights.slice(0, 3).map((hl, idx) => (
                    <li key={idx}>{hl}</li>
                  ))}
                </ul>
              </div>

              {/* Delivery and Warranty tags */}
              <div className="grid grid-cols-2 gap-3 border-t border-b border-slate-100 dark:border-slate-800 py-3 mb-6 text-xs text-slate-650 dark:text-slate-350">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-green-600 dark:text-green-400" />
                  <div>
                    <span className="font-bold block">Delivery</span>
                    <span className="text-[11px] text-gray-400">{product.deliveryDays === 1 ? 'Free Tomorrow' : `Free in ${product.deliveryDays} Days`}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-indigo-500" />
                  <div>
                    <span className="font-bold block">Warranty</span>
                    <span className="text-[11px] text-gray-400 truncate max-w-[130px] block">{product.warranty === 'N/A' ? 'No Warranty' : 'Brand Warranty'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  addToCart(product.id);
                  onClose();
                }}
                className={`flex-1 py-3 px-5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-white ${
                  isInCart 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-105' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 shadow-indigo-500/10 shadow-lg'
                }`}
              >
                <ShoppingCart size={15} />
                {isInCart ? 'In Your Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border transition-all active:scale-95 flex items-center justify-center ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500'
                }`}
                title="Add to Wishlist"
              >
                <Heart size={16} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>

              <button
                onClick={handleFullDetails}
                className="py-3 px-5 rounded-full border border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider hover:bg-indigo-50/50 dark:hover:bg-slate-750 transition-all flex items-center justify-center"
              >
                Full View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
