import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FlashSale({ onQuickView }) {
  const { products } = useShop();
  
  // Flash Sale Timer state (starts at 2 hours 14 mins 59 secs)
  const [timeLeft, setTimeLeft] = useState(8099);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 8099));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter products that have high discounts (> 20%) for the flash sale list
  const flashProducts = products.filter(p => p.discount >= 22).slice(0, 5);

  return (
    <div className="w-full bg-white dark:bg-[#121926] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden mb-6 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-rose-500/5">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <h2 className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase flex items-center gap-1.5">
            Flash Sale Deals 
            <span className="text-rose-500 font-bold text-[10px] bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full animate-pulse tracking-wide">Ending Soon</span>
          </h2>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Remaining:</span>
          <div className="bg-[#0b0f19] text-rose-500 font-extrabold text-sm px-4.5 py-1.5 rounded-full tracking-widest font-mono shadow-md border border-slate-800/80 shadow-rose-500/10">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Grid of Flash Products */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {flashProducts.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} onQuickView={onQuickView} />
            
            {/* Limited stock banner */}
            <div className="absolute top-14 left-0 right-0 bg-red-600/90 text-white text-[9px] font-bold py-0.5 text-center shadow transform -rotate-2 select-none pointer-events-none opacity-90">
              🔥 ONLY {product.stock % 8 + 2} UNITS LEFT!
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
