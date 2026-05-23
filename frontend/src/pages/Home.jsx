import React from 'react';
import { useShop } from '../context/ShopContext';
import CategoriesHeader from '../components/CategoriesHeader';
import HeroSlider from '../components/HeroSlider';
import FlashSale from '../components/FlashSale';
import ProductCard from '../components/ProductCard';
import { Sparkles, Trophy, ShoppingBag, Eye } from 'lucide-react';

export default function Home({ onQuickView }) {
  const { products, selectedCategory, searchQuery } = useShop();
  const [visibleCount, setVisibleCount] = React.useState(24);

  // Reset page pagination size whenever selected tab or query string pivots
  React.useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, searchQuery]);

  // Filter products based on selected category & search input
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sponsored row (arbitrary selection)
  const sponsored = products.filter(p => p.rating >= 4.6).slice(2, 7);
  
  // Trending row
  const trending = products.filter(p => p.discount >= 15).slice(0, 5);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-12 transition-colors">
      {/* Categories header strip */}
      <CategoriesHeader />

      <div className="max-w-7xl mx-auto px-4 mt-4 space-y-6">
        
        {/* If category is ALL and there's no search query, show hero slider and promotion sections */}
        {selectedCategory === "All" && !searchQuery ? (
          <>
            {/* Hero Slider */}
            <HeroSlider />

            {/* Flash Sale countdown deals */}
            <FlashSale onQuickView={onQuickView} />

            {/* Sponsored Products Row */}
            <div className="bg-white dark:bg-[#121926] rounded-2xl p-5 shadow-xl border border-slate-100 dark:border-slate-800/80 transition-all">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <ShoppingBag className="text-indigo-500 dark:text-indigo-400" size={18} />
                <h2 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight">Sponsored Handpicks</h2>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 font-extrabold px-2 py-0.5 rounded-full ml-2 uppercase tracking-wider">Ad Selection</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {sponsored.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
                ))}
              </div>
            </div>

            {/* Banner Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-36 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-6 text-white flex flex-col justify-between shadow-lg border border-indigo-500/10">
                <div>
                  <h3 className="font-extrabold text-lg uppercase tracking-wide">UPI PAYMENT BONANZA</h3>
                  <p className="text-xs text-indigo-100 mt-1">Get instant flat ₹500 off on all orders using direct UPI cards.</p>
                </div>
                <span className="text-xs font-bold text-yellow-300 tracking-wider">Code: VIBEUPI500 | Auto-Applied</span>
              </div>
              <div className="h-36 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 p-6 text-white flex flex-col justify-between shadow-lg border border-rose-500/10">
                <div>
                  <h3 className="font-extrabold text-lg uppercase tracking-wide">VIBE LOYALTY CLUB</h3>
                  <p className="text-xs text-rose-100 mt-1">Earn double loyalty rewards on every purchase today. Save points for free gifts.</p>
                </div>
                <span className="text-xs font-bold text-yellow-300 tracking-wider">Vibe Premium loyalty rewards active!</span>
              </div>
            </div>

            {/* Trending Products Row */}
            <div className="bg-white dark:bg-[#121926] rounded-2xl p-5 shadow-xl border border-slate-100 dark:border-slate-800/80 transition-all">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <Sparkles className="text-rose-500" size={18} />
                <h2 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight">Trending Weekly Deals</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {trending.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search / Filter Results display mode */
          <div className="bg-white dark:bg-[#121926] rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-800/80 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                  {selectedCategory !== "All" ? `${selectedCategory} catalog` : "Search Results"}
                </h2>
                <p className="text-xs text-gray-400 font-bold mt-1 animate-pulse">
                  Showing matches from {filteredProducts.length.toLocaleString()} premium products in catalog
                </p>
              </div>

              {/* Breadcrumb path */}
              <div className="text-xs font-black text-slate-400 flex items-center gap-1.5 select-none uppercase tracking-wider">
                <span>Catalog</span>
                <span>/</span>
                <span className="text-indigo-500 dark:text-indigo-400">{selectedCategory}</span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.slice(0, visibleCount).map(product => (
                    <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
                  ))}
                </div>
                
                {filteredProducts.length > visibleCount && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 24)}
                      className="btn-premium px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                      Load More Products (Showing {visibleCount} of {filteredProducts.length.toLocaleString()})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-lg font-black text-slate-700 dark:text-gray-300">No matching products found</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Try checking your spelling, choosing a different category tab, or removing search query filters.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
