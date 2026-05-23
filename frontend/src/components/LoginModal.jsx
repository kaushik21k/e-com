import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Phone, Key, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useShop();
  const [activeTab, setActiveTab] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP States
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [errorMessage, setErrorMessage] = useState('');

  // Count down for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    const res = login(email, password);
    if (res.success) {
      onClose();
      resetForm();
    } else {
      setErrorMessage("Invalid credentials.");
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    setOtpSent(true);
    setTimer(30);
    setErrorMessage('');
    // Mock notification for OTP
    alert("🔐 [MOCK SECURE SYSTEM]: Your OTP is 1234");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === "1234") {
      login(`${phone}@vibecart.com`, 'otppassword');
      onClose();
      resetForm();
    } else {
      setErrorMessage("Invalid OTP code. Try entering 1234");
    }
  };

  const handleGoogleLogin = () => {
    login("google.user@gmail.com", "google123");
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhone('');
    setOtpSent(false);
    setOtpCode('');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-50 max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-slate-800 dark:hover:text-white z-10 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Left panel: Info Sidebar */}
          <div className="bg-flipkart-blue text-white p-8 md:w-2/5 flex flex-col justify-between select-none">
            <div>
              <h2 className="text-2xl font-extrabold mb-3">Login</h2>
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                Get access to your Orders, Wishlist, Recommendations, and Rewards.
              </p>
            </div>
            {/* Graphics mockup */}
            <div className="hidden md:block py-6 text-center text-7xl select-none">
              🛒📦🚚
            </div>
            <p className="text-xs text-blue-200">
              VibeCart Secure Login. Protected by JWT and encryption standards.
            </p>
          </div>

          {/* Right panel: Tab Forms */}
          <div className="p-8 md:w-3/5 flex flex-col justify-center dark:text-white">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-700 mb-6">
              <button
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'password'
                    ? 'border-flipkart-blue text-flipkart-blue dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => { setActiveTab('password'); setErrorMessage(''); }}
              >
                Password Login
              </button>
              <button
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'otp'
                    ? 'border-flipkart-blue text-flipkart-blue dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => { setActiveTab('otp'); setErrorMessage(''); }}
              >
                OTP Verification
              </button>
            </div>

            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-2.5 rounded text-xs font-semibold mb-4 border border-red-100 dark:border-red-900/30">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Password Login Form */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-300 font-bold block mb-1.5">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter Email (e.g. admin@vibecart.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 input-focus font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs text-gray-400 dark:text-gray-300 font-bold">PASSWORD</label>
                    <button type="button" className="text-xs text-flipkart-blue dark:text-blue-400 hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="Enter Password (e.g. admin123)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 input-focus font-medium"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-medium">
                  💡 Tip: Use <strong className="text-indigo-600 dark:text-indigo-400">admin@vibecart.com</strong> and password <strong className="text-indigo-600 dark:text-indigo-400">admin123</strong> to experience full Admin privileges.
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-flipkart-orange hover:bg-[#e05615] text-white font-semibold py-2.5 rounded shadow transition-all active:scale-98"
                >
                  Continue
                </button>
              </form>
            )}

            {/* OTP Login Form */}
            {activeTab === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 dark:text-gray-300 font-bold block mb-1.5">PHONE NUMBER</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="Enter 10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))}
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 input-focus font-medium"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-flipkart-blue hover:bg-blue-600 text-white font-semibold py-2.5 rounded shadow transition-all active:scale-98"
                    >
                      Send OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 dark:text-gray-300 font-bold block mb-1.5">ENTER OTP CODE</label>
                      <div className="relative">
                        <Key size={16} className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          maxLength="4"
                          placeholder="Enter 4-digit code (Use 1234)"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 text-center tracking-widest font-extrabold text-lg input-focus"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Didn't receive?</span>
                      {timer > 0 ? (
                        <span className="text-gray-400">Resend in {timer}s</span>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => { setTimer(30); alert("🔑 OTP is 1234"); }}
                          className="text-flipkart-blue font-bold hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded shadow transition-all active:scale-98 flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck size={16} /> Verify & Log In
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Social / SSO Divider */}
            <div className="relative my-6 text-center select-none">
              <span className="absolute inset-x-0 top-2.5 border-b border-gray-200 dark:border-slate-700" />
              <span className="relative bg-white dark:bg-slate-800 px-3 text-xs text-gray-400 font-semibold uppercase">Or Sign In With</span>
            </div>

            {/* Google Sign-in */}
            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold py-2.5 rounded shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <img 
                src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&auto=format&fit=crop&q=80" 
                alt="Google" 
                className="w-4 h-4 object-cover rounded-full" 
              />
              <span>Google One-Tap Account</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
