import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Star, Heart, ShoppingCart, Tag, Truck, ShieldAlert, Award, 
  MapPin, CheckCircle, ThumbsUp, ThumbsDown, ArrowLeft, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetails() {
  const { id } = useParams();
  const { 
    products, cart, wishlist, toggleWishlist, addToCart, addProductReview, addNotification
  } = useShop();

  const [product, setProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  // Pincode State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // 'checking' | 'available' | 'invalid'
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  // Add Review State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState(null);

  // EMI Calculator state
  const [selectedMonths, setSelectedMonths] = useState(6);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImageIdx(0);
      setPincodeStatus(null);
      setPincode('');
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="text-center py-20 dark:text-white">
        <h2 className="text-xl font-bold">Loading product details...</h2>
        <Link to="/" className="text-flipkart-blue mt-4 inline-block hover:underline">Return to Home</Link>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(product.id);
  const isInCart = cart[product.id] > 0;

  // Pincode Estimation
  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(pincode)) {
      setPincodeStatus('invalid');
      setEstimatedDelivery('');
      return;
    }

    setPincodeStatus('checking');
    setTimeout(() => {
      setPincodeStatus('available');
      const days = product.deliveryDays;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + days);
      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', options));
    }, 800);
  };

  // Submit User Review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addProductReview(
      product.id, 
      newRating, 
      newComment, 
      reviewerName.trim() || "Verified Buyer"
    );

    // Reset Review fields
    setNewComment('');
    setReviewerName('');
    setNewRating(5);
    setReviewPhoto(null);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // EMI Calculation: price / months + interest (14% per annum)
  const calculateEMI = (months) => {
    const principal = product.price;
    const rate = 0.14 / 12; // monthly rate
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi).toLocaleString();
  };

  // Rating count bars
  const totalReviews = product.reviews.length || 1;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  product.reviews.forEach(r => {
    ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-6 transition-colors dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back Link */}
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-flipkart-blue dark:hover:text-blue-400 mb-4 select-none">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 mb-6">
          
          {/* Left Block: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
            
            {/* Gallery Thumbnails (Column) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2 order-2 md:order-1 justify-center md:justify-start">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-14 p-1 rounded border bg-white dark:bg-slate-800 flex items-center justify-center transition-all ${
                      idx === activeImageIdx 
                        ? 'border-flipkart-blue dark:border-blue-400 ring-2 ring-blue-400/20' 
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Showcase Image */}
            <div className="flex-1 border border-gray-100 dark:border-slate-700 rounded bg-white dark:bg-slate-900/40 p-6 flex items-center justify-center min-h-[300px] max-h-[450px] relative order-1 md:order-2 overflow-hidden group">
              <img 
                src={product.images[activeImageIdx]} 
                alt={product.name} 
                className="max-h-[380px] max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105" 
              />
              
              {/* Wishlist Heart overlay */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 shadow-md hover:bg-slate-50 transition-all active:scale-75"
              >
                <Heart size={18} className={isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
              </button>
            </div>
          </div>

          {/* Right Block: Product Info (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Catalog Info */}
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">{product.brand}</span>
                <h1 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-slate-100 leading-snug mt-1">{product.name}</h1>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                  <span>{product.rating}</span>
                  <Star size={10} className="fill-white" />
                </div>
                <span className="text-sm text-gray-400 font-bold">
                  {product.ratingCount.toLocaleString()} Ratings & {product.reviewCount.toLocaleString()} Reviews
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded">
                  🛡️ VibeCart Assured
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 border-b border-gray-100 dark:border-slate-700/60 pb-4">
                <span className="text-3xl font-black text-slate-900 dark:text-white">₹{product.price.toLocaleString()}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-base text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-base text-green-600 dark:text-green-400 font-extrabold">{product.discount}% off</span>
                  </>
                )}
              </div>

              {/* Bank/Promo Offers */}
              <div className="space-y-2 border-b border-gray-100 dark:border-slate-700/60 pb-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Available Offers</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-650 dark:text-slate-350">
                    <Tag size={14} className="text-green-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800 dark:text-white font-semibold">Bank Offer:</strong> 10% instant discount on ICICI Bank Credit Cards, up to ₹1,500. <strong className="text-flipkart-blue dark:text-blue-400 cursor-pointer">T&C</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-650 dark:text-slate-350">
                    <Tag size={14} className="text-green-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800 dark:text-white font-semibold">UPI Offer:</strong> Flat ₹500 off on all order checkouts made using direct UPI apps. <strong className="text-flipkart-blue dark:text-blue-400 cursor-pointer">T&C</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-650 dark:text-slate-350">
                    <Tag size={14} className="text-green-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800 dark:text-white font-semibold">Partner Offer:</strong> Earn 2X SuperCoins on purchase. Redeem them for future rewards.</span>
                  </div>
                </div>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="border-b border-gray-100 dark:border-slate-700/60 pb-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">Delivery & Seller Details</h3>
                <form onSubmit={checkPincode} className="flex gap-2 max-w-sm mb-3">
                  <div className="relative flex-1">
                    <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Enter Delivery Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 input-focus font-semibold"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-flipkart-blue hover:bg-blue-600 text-white font-bold text-sm rounded shadow-md active:scale-95 transition-all"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus === 'checking' && <p className="text-xs text-gray-400 animate-pulse">Checking pincode availability...</p>}
                {pincodeStatus === 'available' && (
                  <div className="text-xs flex items-center gap-1.5 text-green-600 font-bold bg-green-50 dark:bg-green-950/20 p-2 rounded max-w-sm">
                    <CheckCircle size={15} />
                    <span>Serviceable! Estimated Delivery by {estimatedDelivery}</span>
                  </div>
                )}
                {pincodeStatus === 'invalid' && (
                  <p className="text-xs text-red-500 font-bold">⚠️ Please enter a valid 6-digit postal code.</p>
                )}

                <div className="text-xs text-slate-400 mt-2 font-medium">
                  Seller: <strong className="text-flipkart-blue dark:text-blue-400 font-bold">{product.seller}</strong> (Rated 4.8★) | 10 days replacement policy.
                </div>
              </div>

              {/* Specifications & Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-gray-150 dark:border-slate-700/60">
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-2">Highlights</h3>
                  <ul className="text-xs space-y-1 text-slate-650 dark:text-slate-350 list-disc pl-4 leading-relaxed font-semibold">
                    {product.highlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-2">Specs</h3>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded overflow-hidden border border-gray-100 dark:border-slate-750 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 border-b border-gray-100 last:border-0 dark:border-slate-750 p-2">
                        <span className="font-bold text-gray-400">{key}</span>
                        <span className="text-slate-700 dark:text-slate-200 font-semibold truncate">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* No-Cost EMI calculator */}
              {product.emiOption !== 'N/A' && (
                <div className="bg-orange-50/50 dark:bg-slate-900/30 p-4 border border-orange-200/40 dark:border-slate-700 rounded-lg">
                  <h3 className="text-sm font-extrabold text-flipkart-orange mb-2 uppercase">No-Cost EMI Options</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {[3, 6, 9, 12].map(m => (
                        <button
                          key={m}
                          onClick={() => setSelectedMonths(m)}
                          className={`px-3 py-1.5 rounded text-xs font-bold border transition-all ${
                            selectedMonths === m 
                              ? 'bg-flipkart-orange border-flipkart-orange text-white' 
                              : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-slate-650 dark:text-slate-300'
                          }`}
                        >
                          {m} Months
                        </button>
                      ))}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Installment: <span className="text-base text-flipkart-orange font-black">₹{calculateEMI(selectedMonths)}/mo</span> at 14% p.a.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Actions Bar */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/60 sticky bottom-0 bg-white dark:bg-slate-800 py-3 z-10">
              <button
                onClick={() => addToCart(product.id)}
                className={`flex-1 py-3.5 px-6 rounded-sm font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-white ${
                  isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-flipkart-blue hover:bg-[#1a5ec3]'
                }`}
              >
                <ShoppingCart size={18} />
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`px-5 py-3.5 rounded-sm border font-semibold text-sm transition-all active:scale-95 flex items-center justify-center ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-950/20' 
                    : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750 text-gray-400 hover:text-red-500'
                }`}
                title="Add to Wishlist"
              >
                <Heart size={20} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>

          </div>
        </div>

        {/* Reviews & Submission Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 mb-6">
          
          {/* Reviews Graph Breakdown (4 cols) */}
          <div className="lg:col-span-4 border-r border-gray-100 dark:border-slate-700/60 pr-6">
            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase mb-4">Customer Ratings</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black">{product.rating}</span>
              <div>
                <div className="flex text-yellow-400 text-sm">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-bold block mt-1">{product.ratingCount.toLocaleString()} Verified Purchases</span>
              </div>
            </div>

            {/* Ratings Bars */}
            <div className="space-y-2 select-none">
              {[5, 4, 3, 2, 1].map(r => {
                const count = ratingCounts[r] || 0;
                const percentage = Math.round((count / totalReviews) * 100);
                return (
                  <div key={r} className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-3 text-right">{r}★</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-900 rounded overflow-hidden">
                      <div className="h-full bg-green-600 rounded" style={{ width: `${percentage || 5}%` }} />
                    </div>
                    <span className="w-8 text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Reviews List & Add Review Form (8 cols) */}
          <div className="lg:col-span-8 lg:pl-6 space-y-6">
            
            {/* Write a Review Panel */}
            <div className="bg-slate-50 dark:bg-slate-900/30 p-4 border border-gray-100 dark:border-slate-700 rounded">
              <h3 className="text-sm font-extrabold uppercase mb-3">Add Your Rating & Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul S."
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-250 dark:border-slate-600 rounded bg-white dark:bg-slate-900 input-focus font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">RATING</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-gray-250 dark:border-slate-600 rounded bg-white dark:bg-slate-900 input-focus font-extrabold"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                      <option value="2">⭐⭐ 2 Stars</option>
                      <option value="1">⭐ 1 Star</option>
                    </select>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">REVIEW COMMENT</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe your user experience, packaging, performance..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-250 dark:border-slate-600 rounded bg-white dark:bg-slate-900 input-focus font-medium resize-none"
                  />
                </div>

                {/* Photo Upload Mockup & Submit */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-slate-600 transition-colors">
                    <Camera size={16} />
                    <span>Upload Review Photos (Mockup)</span>
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-flipkart-orange hover:bg-[#e05615] text-white font-bold text-xs rounded shadow active:scale-95 transition-all"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>

            {/* Product Reviews List */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase border-b border-gray-100 dark:border-slate-700/60 pb-2">Verified Reviews</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map(rev => (
                  <div key={rev.id} className="border-b border-gray-50 last:border-0 dark:border-slate-700/40 pb-4">
                    {/* Star & Date */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${
                          rev.rating >= 4 ? 'bg-green-600' : rev.rating === 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          <span>{rev.rating}</span>
                          <Star size={7} className="fill-white" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="text-[9px] text-green-600 bg-green-50 dark:bg-green-950/20 px-1.5 py-0.5 rounded-full font-bold">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                      "{rev.comment}"
                    </p>

                    {/* Likes/Dislikes */}
                    <div className="flex items-center gap-3 mt-3 select-none text-[10px] text-gray-400 font-bold">
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <ThumbsUp size={11} /> {rev.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <ThumbsDown size={11} /> {rev.dislikes}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">Be the first to review this product!</p>
              )}
            </div>

          </div>
        </div>

        {/* Related / Similar Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 mb-6 transition-colors">
            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase mb-4 tracking-tight border-b border-gray-100 dark:border-slate-700/60 pb-3">
              Similar Products You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div key={p.id} className="relative">
                  <div className="h-full flex flex-col justify-between border border-gray-50 dark:border-slate-750 p-2 rounded-lg bg-slate-50/30 dark:bg-slate-900/10">
                    <img src={p.images[0]} alt="" className="h-28 object-contain mx-auto mb-2 mix-blend-multiply dark:mix-blend-normal" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">{p.name}</h4>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-xs font-black text-slate-900 dark:text-white">₹{p.price.toLocaleString()}</span>
                        {p.discount > 0 && <span className="text-[10px] text-green-600 font-bold">{p.discount}% Off</span>}
                      </div>
                    </div>
                    <Link 
                      to={`/product/${p.id}`}
                      className="mt-3 block text-center py-1.5 bg-slate-100 hover:bg-flipkart-blue dark:bg-slate-700 dark:hover:bg-blue-600 text-slate-700 dark:text-white hover:text-white rounded text-[11px] font-bold transition-all"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
