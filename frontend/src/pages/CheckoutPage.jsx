import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, CreditCard, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { cart, products, createOrder, activeCoupon, addNotification } = useShop();
  const navigate = useNavigate();

  // Multi-step: 1 = Address, 2 = Shipping, 3 = Payment, 4 = Success
  const [step, setStep] = useState(1);

  // Address State
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    addressText: '',
    city: '',
    state: '',
    addressType: 'Home' // 'Home' | 'Work'
  });

  // Shipping Speed State
  const [shippingSpeed, setShippingSpeed] = useState('standard'); // 'standard' | 'express'

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'COD' | 'NetBanking'
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // Fetch product items in cart
  const cartItems = Object.keys(cart).map(id => {
    const prod = products.find(p => p.id === id);
    return {
      product: prod,
      quantity: cart[id]
    };
  }).filter(item => item.product !== undefined);

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 text-center dark:text-white">
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-800 rounded shadow border border-gray-200">
          <h2 className="text-xl font-bold uppercase mb-2">No active items for checkout!</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-flipkart-blue hover:bg-blue-600 text-white rounded font-bold text-xs mt-4 transition-all"
          >
            Go to Catalog
          </button>
        </div>
      </div>
    );
  }

  // Invoice calculations
  const subTotalDiscounted = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const gstAmount = Math.round(subTotalDiscounted * 0.18);
  
  let couponSavings = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'flat') {
      couponSavings = activeCoupon.value;
    } else if (activeCoupon.type === 'percent') {
      couponSavings = Math.round(subTotalDiscounted * (activeCoupon.value / 100));
    }
  }

  const deliveryCharge = subTotalDiscounted > 500 ? 0 : 40;
  const shippingSurcharge = shippingSpeed === 'express' ? 49 : 0;
  const grandTotal = subTotalDiscounted + gstAmount - couponSavings + deliveryCharge + shippingSurcharge;

  // Address Submit Handler
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.pincode || !address.addressText) {
      alert("Please fill in all required address fields.");
      return;
    }
    setStep(2);
  };

  // Process checkout order
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && !upiId) {
      alert("Please enter a valid UPI address.");
      return;
    }
    if (paymentMethod === 'Card' && (!cardInfo.number || cardInfo.number.length < 16)) {
      alert("Please enter a valid card credentials.");
      return;
    }

    // Place the order
    createOrder(address, paymentMethod);
    setStep(4);

    // Fire Confetti explosion!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 transition-colors dark:text-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Step Progress Indicators */}
        {step < 4 && (
          <div className="flex justify-between items-center max-w-xl mx-auto mb-10 select-none">
            <button 
              onClick={() => setStep(1)} 
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${step >= 1 ? 'text-flipkart-blue dark:text-blue-400' : 'text-gray-400'}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 1 ? 'bg-flipkart-blue text-white border-flipkart-blue dark:bg-blue-400 dark:border-blue-400' : 'border-gray-300'}`}>1</div>
              <span>Address</span>
            </button>
            <span className={`flex-1 h-0.5 border-t mx-3 ${step >= 2 ? 'border-flipkart-blue dark:border-blue-400' : 'border-gray-200'}`} />
            <button 
              onClick={() => step >= 2 && setStep(2)} 
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${step >= 2 ? 'text-flipkart-blue dark:text-blue-400' : 'text-gray-400'}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 2 ? 'bg-flipkart-blue text-white border-flipkart-blue dark:bg-blue-400 dark:border-blue-400' : 'border-gray-300'}`}>2</div>
              <span>Shipping</span>
            </button>
            <span className={`flex-1 h-0.5 border-t mx-3 ${step >= 3 ? 'border-flipkart-blue dark:border-blue-400' : 'border-gray-200'}`} />
            <button 
              onClick={() => step >= 3 && setStep(3)} 
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${step >= 3 ? 'text-flipkart-blue dark:text-blue-400' : 'text-gray-400'}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold border ${step >= 3 ? 'bg-flipkart-blue text-white border-flipkart-blue dark:bg-blue-400 dark:border-blue-400' : 'border-gray-300'}`}>3</div>
              <span>Payment</span>
            </button>
          </div>
        )}

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Address Form (8 cols) */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60">
                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase mb-4 flex items-center gap-2">
                  <MapPin className="text-flipkart-blue dark:text-blue-400" size={20} /> Shipping Destination Address
                </h2>
                
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">CONSIGNEE NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vignesh Kumar"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">PHONE NUMBER (10 DIGIT) *</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0,10) })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">PINCODE *</label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        placeholder="e.g. 600001"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">LOCALITY / AREA</label>
                      <input
                        type="text"
                        placeholder="e.g. T. Nagar or Koramangala"
                        value={address.locality}
                        onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">CITY *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chennai or Bengaluru"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">ADDRESS (STREET, FLAT NO., BUILDING) *</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="e.g. Flat 42, Royal Residency, 4th Block"
                      value={address.addressText}
                      onChange={(e) => setAddress({ ...address, addressText: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-medium resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">STATE *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tamil Nadu or Karnataka"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1">ADDRESS TYPE</label>
                      <div className="flex gap-2 text-xs font-bold mt-1">
                        <button
                          type="button"
                          onClick={() => setAddress({ ...address, addressType: 'Home' })}
                          className={`px-4 py-2 border rounded transition-all ${address.addressType === 'Home' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white text-slate-800 border-gray-200'}`}
                        >
                          🏠 Home (Delivery 9 AM - 6 PM)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddress({ ...address, addressType: 'Work' })}
                          className={`px-4 py-2 border rounded transition-all ${address.addressType === 'Work' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white text-slate-800 border-gray-200'}`}
                        >
                          🏢 Work (Delivery 10 AM - 5 PM)
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-3 bg-flipkart-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow active:scale-95 transition-all w-max block mt-4"
                  >
                    Save & Continue
                  </button>
                </form>
              </div>

              {/* Side Panel summary (4 cols) */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 font-semibold text-xs space-y-3">
                <h3 className="text-xs font-black uppercase text-gray-400 border-b pb-2 tracking-wider">Purchase Basket</h3>
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-[11px]">
                    <span className="truncate max-w-[180px]">{item.product.name}</span>
                    <span className="font-bold text-slate-800 dark:text-white">x{item.quantity}</span>
                  </div>
                ))}
                <hr className="border-gray-100 dark:border-slate-700" />
                <div className="flex justify-between items-baseline text-slate-850 dark:text-white font-black text-sm">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Shipping Options */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 text-slate-800 dark:text-white"
            >
              <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                <Truck className="text-flipkart-blue dark:text-blue-400" size={20} /> Select Delivery Speed
              </h2>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShippingSpeed('standard')}
                  className={`w-full text-left p-4 rounded border transition-all flex justify-between items-center ${shippingSpeed === 'standard' ? 'border-flipkart-blue bg-blue-50/20 dark:border-blue-400' : 'border-gray-200 dark:border-slate-750'}`}
                >
                  <div>
                    <span className="font-bold block text-sm">🚚 Standard Free Delivery</span>
                    <span className="text-xs text-gray-400 font-medium">Items arrive within 2-3 standard delivery days.</span>
                  </div>
                  <span className="text-xs font-black text-green-600">FREE</span>
                </button>

                <button
                  onClick={() => setShippingSpeed('express')}
                  className={`w-full text-left p-4 rounded border transition-all flex justify-between items-center ${shippingSpeed === 'express' ? 'border-flipkart-blue bg-blue-50/20 dark:border-blue-400' : 'border-gray-200 dark:border-slate-750'}`}
                >
                  <div>
                    <span className="font-bold block text-sm">⚡ Next-Day Express Delivery</span>
                    <span className="text-xs text-gray-400 font-medium">Guaranteed fast delivery tomorrow morning before noon.</span>
                  </div>
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">+₹49</span>
                </button>
              </div>

              <div className="flex gap-3 justify-end border-t pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded font-bold text-xs uppercase"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-flipkart-blue hover:bg-blue-600 text-white rounded font-bold text-xs uppercase shadow active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment Processors */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60"
            >
              <h2 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                <CreditCard className="text-flipkart-blue dark:text-blue-400" size={20} /> Select Payment Method
              </h2>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                
                {/* Method selector */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border dark:border-slate-700 rounded cursor-pointer hover:bg-slate-50/50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'UPI'} 
                      onChange={() => setPaymentMethod('UPI')} 
                    />
                    <div>
                      <span className="text-sm font-bold block">UPI Apps (PhonePe, GPay, Paytm)</span>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            required
                            placeholder="Enter UPI ID (e.g. user@okhdfc)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded w-full bg-slate-50 dark:bg-slate-900 input-focus font-semibold tracking-wide"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border dark:border-slate-700 rounded cursor-pointer hover:bg-slate-50/50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'Card'} 
                      onChange={() => setPaymentMethod('Card')} 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold block">Credit / Debit Card</span>
                      {paymentMethod === 'Card' && (
                        <div className="mt-3 space-y-3 max-w-sm">
                          <input
                            type="text"
                            required
                            maxLength="16"
                            placeholder="Card Number (16 Digits)"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value.replace(/\D/g, '') })}
                            className="px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded w-full bg-slate-50 dark:bg-slate-900 font-semibold tracking-wider input-focus"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              className="px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-semibold text-center"
                            />
                            <input
                              type="password"
                              required
                              maxLength="3"
                              placeholder="CVV"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                              className="px-3 py-2 text-xs border border-gray-200 dark:border-slate-650 rounded bg-slate-50 dark:bg-slate-900 input-focus font-bold text-center"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border dark:border-slate-700 rounded cursor-pointer hover:bg-slate-50/50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'COD'} 
                      onChange={() => setPaymentMethod('COD')} 
                    />
                    <div>
                      <span className="text-sm font-bold block">Cash On Delivery (COD)</span>
                      <span className="text-xs text-gray-400">Pay cash/card when delivery executive arrives.</span>
                    </div>
                  </label>
                </div>

                {/* Secure Invoice Details */}
                <div className="bg-slate-50 dark:bg-slate-900/50 border rounded p-4 text-xs font-semibold space-y-2">
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>{shippingSpeed === 'express' ? '₹49' : 'FREE'}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-2 font-black text-slate-850 dark:text-white">
                    <span>Payable Grand Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-150 pt-4 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded font-bold uppercase"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-bold uppercase shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <ShieldCheck size={16} /> Pay & Complete Order
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Success Step */}
          {step === 4 && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-150 dark:border-slate-700/60"
            >
              <div className="w-16 h-16 rounded-full bg-green-150 text-green-600 flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce">
                🎉
              </div>
              <h2 className="text-xl font-black text-slate-850 dark:text-white uppercase mb-2">Order Confirmed!</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
                Your order has been validated. You can now track its shipping status and delivery milestone timeline directly from your Account Dashboard.
              </p>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full py-3 bg-flipkart-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wide rounded-sm shadow active:scale-95 transition-all"
                >
                  Track My Order
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 border border-gray-200 dark:border-slate-750 text-slate-750 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-extrabold text-xs uppercase tracking-wide rounded-sm active:scale-95 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
