import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "THE EXCLUSIVE VIBE CARNIVAL",
    subtitle: "ELEVATE YOUR LIFESTYLE & TECH",
    desc: "Experience high-fidelity audio, flagship smartphones, and premium computing deals up to 50% Off.",
    bg: "from-[#1d1f3d] to-[#0c0d21]",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    buttonText: "Explore Vibe Tech"
  },
  {
    id: 2,
    title: "PREMIUM COUTURE RELEASE",
    subtitle: "UP TO 60% OFF ON LUXURY BRANDS",
    desc: "Handpicked premium designer wear, curated streetwear, and timeless watches.",
    bg: "from-[#3e1b2f] to-[#1a0a13]",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
    buttonText: "Shop the Collection"
  },
  {
    id: 3,
    title: "LUXURY SUITES & LIVING",
    subtitle: "DESIGN A BREATHTAKING SPACE",
    desc: "Solid wood Scandinavian furniture, smart home devices, and culinary essentials starting from ₹1,499.",
    bg: "from-[#122e2b] to-[#071311]",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    buttonText: "Browse Gallery"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c === slides.length - 1 ? 0 : c + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent(c => (c === slides.length - 1 ? 0 : c + 1));
  };

  const handlePrev = () => {
    setCurrent(c => (c === 0 ? slides.length - 1 : c - 1));
  };

  return (
    <div className="relative w-full h-[260px] md:h-[360px] bg-slate-950 rounded-2xl overflow-hidden shadow-xl select-none group border border-slate-100 dark:border-slate-800/80">
      
      {/* Slide Container */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg} flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white`}
          >
            {/* Slide Content */}
            <div className="max-w-xl flex flex-col justify-center h-full text-left z-10">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-indigo-600 text-white font-extrabold text-[9px] md:text-[10px] px-3.5 py-1 rounded-full w-max tracking-widest uppercase mb-3 shadow-md border border-indigo-400/30"
              >
                ⚡ Limited Time Special
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase font-sans drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h1>
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs md:text-sm text-indigo-300 font-extrabold tracking-widest uppercase mt-1.5 mb-2.5"
              >
                {slides[current].subtitle}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs md:text-sm text-slate-350 leading-relaxed font-semibold hidden sm:block max-w-lg mb-6"
              >
                {slides[current].desc}
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs md:text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 w-max"
              >
                {slides[current].buttonText}
              </motion.button>
            </div>

            {/* Slide Image */}
            <div className="h-full hidden md:flex items-center justify-end w-1/2 relative">
              {/* Decorative glass backing blur */}
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl" />
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                src={slides[current].image} 
                alt="" 
                className="h-[250px] w-full max-w-[420px] object-cover rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-y-0.5 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
