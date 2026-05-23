import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { 
    cart, updateCartQty, removeFromCart, products, activeCoupon, setActiveCoupon, addNotification
  } = useShop();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [saveForLater, setSaveForLater] = useState([]);

  // Fetch product items in cart
  const cartItems = Object.keys(cart).map(id => {
    const prod = products.find(p => p.id === id);
    return {
      product: prod,
      quantity: cart[id]
    };
  }).filter(item => item.product !== undefined);

  // Compute pricing
  const subTotalOriginal = cartItems.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const subTotalDiscounted = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const discountSavings = subTotalOriginal - subTotalDiscounted;
  const gstAmount = Math.round(subTotalDiscounted * 0.18);
  
  // Coupon logic
  let couponSavings = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'flat') {
      couponSavings = activeCoupon.value;
    } else if (activeCoupon.type === 'percent') {
      couponSavings = Math.round(subTotalDiscounted * (activeCoupon.value / 100));
    }
  }

  const deliveryCharge = subTotalDiscounted > 500 ? 0 : 40;
  const grandTotal = subTotalDiscounted + gstAmount - couponSavings + deliveryCharge;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (code === "WELCOME100") {
      setActiveCoupon({ code: "WELCOME100", type: "flat", value: 100 });
      setCouponError('');
      setCouponCode('');
      addNotification("🎟️ Applied Coupon WELCOME100! Flat ₹100 discount applied.", "offer");
    } else if (code === "BIGBILLION") {
      setActiveCoupon({ code: "BIGBILLION", type: "percent", value: 10 });
      setCouponError('');
      setCouponCode('');
      addNotification("🎟️ Applied Coupon BIGBILLION! 10% discount applied.", "offer");
    } else {
      setCouponError("Invalid coupon code. Try WELCOME100 or BIGBILLION");
    }
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    addNotification("Removed coupon code.", "system");
  };

  // Save for later simulation
  const handleSaveForLater = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    if (item) {
      setSaveForLater(prev => [...prev, item.product]);
      removeFromCart(productId);
      addNotification(`📌 Stashed "${item.product.name}" in Save for Later`, "system");
    }
  };

  const handleMoveToCart = (product) => {
    updateCartQty(product.id, 1);
    setSaveForLater(prev => prev.filter(p => p.id !== product.id));
    addNotification(`🛒 Restored "${product.name}" to Cart!`, "system");
  };

  if (cartItems.length === 0 && saveForLater.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 text-center transition-colors dark:text-white">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-150 dark:border-slate-700/60">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-black text-slate-850 dark:text-white uppercase mb-2">Your Cart is Empty!</h2>
          <p className="text-xs text-gray-400 mb-6 font-medium">Add items to it now to experience premium shopping rates.</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-flipkart-blue hover:bg-blue-600 text-white font-extrabold text-xs rounded uppercase tracking-wide shadow-md active:scale-95 transition-all block text-center"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-6 transition-colors dark:text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cart Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Cart Header */}
          <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-sm border border-gray-150 dark:border-slate-700/60 flex items-center justify-between transition-colors">
            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <ShoppingCart size={20} className="text-flipkart-blue dark:text-blue-400" />
              VibeCart Cart ({cartItems.length} Items)
            </h2>
            <span className="text-xs font-bold text-gray-400">Secured Checkout</span>
          </div>

          {/* Cart Items List */}
          {cartItems.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 overflow-hidden divide-y divide-gray-100 dark:divide-slate-700/60 transition-colors">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-50 dark:bg-slate-900 rounded border border-gray-100 dark:border-slate-700 p-2 flex items-center justify-center shrink-0">
                    <img src={item.product.images[0]} alt="" className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">{item.product.brand}</span>
                      <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-flipkart-blue dark:hover:text-blue-400 cursor-pointer mb-2 leading-snug">
                        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      
                      {/* Price Row */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base font-bold text-slate-900 dark:text-white">₹{item.product.price.toLocaleString()}</span>
                        {item.product.discount > 0 && (
                          <>
                            <span className="text-xs text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                            <span className="text-xs text-green-600 dark:text-green-400 font-bold">{item.product.discount}% Off</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 dark:border-slate-700/40 pt-3 text-xs">
                      {/* Qty update buttons */}
                      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-sm">
                        <button 
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-slate-750 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Minus size={11} className="text-slate-600 dark:text-white" />
                        </button>
                        <span className="px-3.5 font-extrabold text-xs text-slate-800 dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-slate-750 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Plus size={11} className="text-slate-600 dark:text-white" />
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleSaveForLater(item.product.id)}
                          className="font-bold text-slate-500 hover:text-flipkart-blue dark:hover:text-blue-400 transition-colors uppercase tracking-wider text-[10px]"
                        >
                          Save For Later
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 uppercase tracking-wider text-[10px]"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save For Later Section */}
          {saveForLater.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-sm border border-gray-150 dark:border-slate-700/60 transition-colors">
              <h3 className="text-sm font-extrabold uppercase border-b border-gray-100 dark:border-slate-750 pb-2 mb-4 tracking-wider text-slate-500">
                📌 Saved For Later ({saveForLater.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saveForLater.map((prod) => (
                  <div key={prod.id} className="p-3 border border-gray-100 dark:border-slate-700 rounded-sm flex gap-3 bg-slate-50/20">
                    <img src={prod.images[0]} alt="" className="w-16 h-16 object-contain p-1 bg-white dark:bg-slate-800 rounded border shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 leading-snug">{prod.name}</h4>
                        <span className="text-xs font-black text-slate-900 dark:text-white block mt-0.5">₹{prod.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleMoveToCart(prod)}
                        className="text-[10px] font-extrabold text-flipkart-blue dark:text-blue-400 hover:underline uppercase text-left mt-2 tracking-wider"
                      >
                        Restore to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Checkout Pricing Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Coupon applying module */}
          {cartItems.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-sm border border-gray-150 dark:border-slate-700/60 transition-colors">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-2.5">Apply Promo Coupons</h3>
              
              {!activeCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter Code (WELCOME100, BIGBILLION)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 uppercase font-extrabold input-focus tracking-wider"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-750 dark:hover:bg-slate-700 hover:bg-black text-white font-bold text-xs rounded transition-all active:scale-95"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200/50 p-2.5 rounded flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400 font-bold">
                    <Tag size={14} />
                    <span>Applied: {activeCoupon.code}</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-500 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && <p className="text-[10px] text-red-500 font-bold mt-1.5">⚠️ {couponError}</p>}
              
              <div className="text-[10px] text-slate-400 mt-3 font-semibold leading-relaxed">
                💡 Available coupon deals:<br/>
                - <strong className="text-indigo-500">WELCOME100</strong>: Flat ₹100 discount.<br/>
                - <strong className="text-indigo-500">BIGBILLION</strong>: Flat 10% off entire checkout basket.
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          {cartItems.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 p-4 transition-colors space-y-4 select-none">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider border-b border-gray-100 dark:border-slate-750 pb-2">
                Price Breakdown
              </h3>
              
              <div className="space-y-2.5 text-xs font-semibold text-slate-650 dark:text-slate-350">
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} Items)</span>
                  <span className="text-slate-800 dark:text-white">₹{subTotalOriginal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Discounts</span>
                  <span className="text-green-600 dark:text-green-400">-₹{discountSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>18% GST Sales Tax</span>
                  <span className="text-slate-800 dark:text-white">₹{gstAmount.toLocaleString()}</span>
                </div>
                {activeCoupon && (
                  <div className="flex justify-between">
                    <span>Coupon Code ({activeCoupon.code})</span>
                    <span className="text-green-600 dark:text-green-400">-₹{couponSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">FREE Delivery</span>
                    ) : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="border-t border-dashed border-gray-200 dark:border-slate-700 pt-3 flex justify-between items-baseline font-black text-sm text-slate-850 dark:text-white">
                <span>Grand Total</span>
                <span className="text-lg">₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* Savings disclaimer */}
              {discountSavings + couponSavings > 0 && (
                <div className="bg-green-50/80 dark:bg-green-950/10 p-2.5 border border-green-200/20 rounded-sm text-[11px] text-green-600 dark:text-green-400 font-extrabold text-center">
                  🎉 You will save ₹{(discountSavings + couponSavings).toLocaleString()} on this order!
                </div>
              )}

              {/* Proceed to checkout */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-flipkart-orange hover:bg-[#e05615] text-white font-extrabold text-xs py-3 rounded-sm shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShieldCheck size={16} />
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
