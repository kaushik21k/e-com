import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  Search, ShoppingCart, Heart, Bell, Sun, Moon, 
  ChevronDown, LogOut, User, Mic, ShieldAlert, Languages, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenLogin }) {
  const { 
    cart, wishlist, user, logout, darkMode, setDarkMode, 
    notifications, language, setLanguage, searchQuery, setSearchQuery,
    products, setSelectedCategory
  } = useShop();

  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('fk_search_history') || '[]');
  });

  const searchRef = useRef(null);

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Update suggestions on search input change
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const matched = products
        .filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions(matched);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  // Voice Search Mock
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceQueries = ["iPhone 15 Pro", "Sony Headphones", "MacBook Pro", "Basmati Rice"];
      const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
      setSearchQuery(randomQuery);
      setShowSuggestions(true);
    }, 2000);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      // Add to search history
      const updatedHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('fk_search_history', JSON.stringify(updatedHistory));
      
      setSelectedCategory("All");
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    // Add to history
    const updatedHistory = [name, ...searchHistory.filter(h => h !== name)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('fk_search_history', JSON.stringify(updatedHistory));
    
    navigate(`/search?q=${encodeURIComponent(name)}`);
  };

  const unreadNotifications = notifications.length;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1527]/90 dark:bg-slate-950/90 backdrop-blur-md text-white shadow-lg border-b border-white/10 dark:border-slate-800/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none shrink-0" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
          <span className="font-extrabold text-2xl italic tracking-tight text-white flex items-center gap-1">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent not-italic font-black">VibeCart</span>
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] not-italic font-extrabold px-1.5 py-0.5 rounded-full shadow-sm ml-0.5">Vibe</span>
          </span>
          <span className="text-[9px] text-gray-400 italic hover:underline flex items-center gap-0.5 mt-1 select-none">
            Explore <span className="text-indigo-400 font-semibold">Premium Selection ✨</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl bg-white/10 text-white border border-white/15 rounded-full shadow-inner flex items-center overflow-hidden transition-all focus-within:bg-white focus-within:text-slate-900 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search for premium products, brands and collections..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full px-5 py-2.5 pr-10 text-sm font-semibold border-none focus:outline-none rounded-l-full bg-transparent placeholder-slate-400 focus-within:placeholder-slate-500"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none mr-1"
              >
                ✕
              </button>
            )}
            <button 
              type="button" 
              onClick={handleVoiceSearch}
              className="p-2.5 text-slate-400 hover:text-indigo-400 focus:outline-none border-l border-white/10 focus-within:border-slate-200 flex items-center justify-center"
              title="Voice Search"
            >
              <Mic size={16} />
            </button>
            <button 
              type="submit" 
              className="p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-full transition-colors border-l border-indigo-700 px-5 flex items-center justify-center shrink-0"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (searchQuery.trim().length > 0 || searchHistory.length > 0) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded shadow-xl overflow-hidden z-50 text-sm"
              >
                {/* Search History */}
                {searchHistory.length > 0 && !searchQuery.trim() && (
                  <div className="p-2 border-b border-gray-100 dark:border-slate-700">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">Recent Searches</div>
                    {searchHistory.map((h, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(h)}
                        className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center gap-2 text-slate-700 dark:text-slate-200"
                      >
                        <Search size={12} className="text-gray-400" />
                        <span>{h}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Live Product Suggestions */}
                {suggestions.length > 0 ? (
                  <div className="p-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">Products & Brands</div>
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setShowSuggestions(false);
                          navigate(`/product/${item.id}`);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center justify-between gap-3 border-b border-gray-50 last:border-0 dark:border-slate-700"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.images[0]} alt="" className="w-8 h-8 object-cover rounded-sm border border-gray-100 dark:border-slate-600" />
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[320px]">{item.name}</div>
                            <div className="text-[11px] text-gray-400">{item.brand} | {item.category}</div>
                          </div>
                        </div>
                        <span className="text-flipkart-blue font-bold dark:text-blue-400">₹{item.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  searchQuery.trim().length > 0 && (
                    <div className="p-4 text-center text-gray-400">No matching products found</div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* User Menu */}
          <div className="relative">
            {user ? (
              <div 
                className="flex items-center gap-1.5 cursor-pointer py-1 px-2 hover:bg-blue-600 dark:hover:bg-slate-800 rounded transition-colors"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="w-7 h-7 rounded-full bg-flipkart-yellow text-slate-800 font-bold text-xs flex items-center justify-center shadow">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold max-w-[100px] truncate hidden md:inline">{user.name}</span>
                <ChevronDown size={14} className="text-gray-200" />
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-white text-flipkart-blue dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700 font-semibold text-sm px-5 py-1.5 rounded-sm shadow hover:bg-slate-50 transition-all flex items-center gap-1"
              >
                <User size={15} /> Login
              </button>
            )}

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {showUserDropdown && user && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded shadow-xl py-2 z-50 text-slate-800 dark:text-slate-100 text-sm"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700 font-medium">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="font-bold truncate text-slate-800 dark:text-slate-100">{user.email}</p>
                      {user.rewardPoints && (
                        <div className="flex items-center gap-1 text-[11px] text-flipkart-orange font-bold mt-1">
                          <Award size={12} /> {user.rewardPoints} Coins Earned
                        </div>
                      )}
                    </div>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold border-b border-gray-100 dark:border-slate-700"
                      >
                        <ShieldAlert size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/orders" 
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <ShoppingCart size={16} className="text-gray-400" /> My Orders
                    </Link>
                    <Link 
                      to="/wishlist" 
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Heart size={16} className="text-gray-400" /> Wishlist ({wishlist.length})
                    </Link>
                    <hr className="my-1 border-gray-100 dark:border-slate-700" />
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Link */}
          <Link to="/wishlist" className="relative p-1.5 hover:bg-blue-600 dark:hover:bg-slate-800 rounded transition-colors hidden sm:block" title="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <motion.span 
                initial={{ scale: 0.5 }} 
                animate={{ scale: 1 }} 
                className="absolute -top-1 -right-1 bg-flipkart-orange text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow border border-white"
              >
                {wishlist.length}
              </motion.span>
            )}
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-1.5 hover:bg-blue-600 dark:hover:bg-slate-800 rounded transition-colors"
              title="Notifications"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-2xl overflow-hidden z-50 text-slate-800 dark:text-slate-100 text-xs"
                  >
                    <div className="px-4 py-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700 font-bold flex justify-between items-center">
                      <span>Notifications ({unreadNotifications})</span>
                      <button className="text-flipkart-blue text-[10px] hover:underline" onClick={() => addNotification("Cleaned all inbox", "system")}>Clear All</button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div key={notif.id} className="p-3 border-b border-gray-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-start gap-2.5">
                            <span className="text-base mt-0.5">
                              {notif.type === 'offer' ? '🎁' : '🔔'}
                            </span>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-700 dark:text-slate-200 leading-normal">{notif.text}</p>
                              <span className="text-[10px] text-gray-400 block mt-1">Just now</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-400">All caught up! No notifications.</div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 text-sm py-1.5 px-2 hover:bg-blue-600 dark:hover:bg-slate-800 rounded transition-colors"
            >
              <Languages size={17} />
              <span>{language === 'en' ? 'EN' : 'HI'}</span>
              <ChevronDown size={12} />
            </button>

            <AnimatePresence>
              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded shadow-xl py-1 z-50 text-slate-800 dark:text-slate-100 text-xs w-28"
                  >
                    <button 
                      onClick={() => { setLanguage("en"); setShowLangDropdown(false); }}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold ${language === 'en' ? 'text-flipkart-blue' : ''}`}
                    >
                      English (EN)
                    </button>
                    <button 
                      onClick={() => { setLanguage("hi"); setShowLangDropdown(false); }}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold ${language === 'hi' ? 'text-flipkart-blue' : ''}`}
                    >
                      हिंदी (HI)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* Cart Icon Link */}
          <Link to="/cart" className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-slate-800 dark:to-slate-900 hover:brightness-110 py-1.5 px-4 rounded-full shadow-md transition-all active:scale-95">
            <div className="relative">
              <ShoppingCart size={17} className="text-white" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0.2 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white font-extrabold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow border border-indigo-500"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span className="text-xs font-bold hidden sm:inline text-white tracking-wider">Cart</span>
          </Link>

        </div>
      </div>
      
      {/* Voice Listening Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex flex-col items-center justify-center text-white"
          >
            <div className="p-8 bg-slate-900 rounded-2xl flex flex-col items-center gap-6 shadow-2xl border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-ping text-xl mb-2">
                🎤
              </div>
              <p className="text-lg font-bold">Listening now...</p>
              <p className="text-sm text-gray-400">Say product names like "iPhone" or "Headphones"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
