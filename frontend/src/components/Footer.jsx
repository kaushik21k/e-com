import React from 'react';
import { Mail, Phone, MapPin, Globe, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#080d1a] dark:bg-slate-950 text-white font-medium text-xs transition-colors py-12 select-none border-t border-white/5 dark:border-slate-900">
      
      {/* Upper Grid Columns */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-8 border-b border-white/5 pb-8">
        
        {/* About */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">About</h4>
          <ul className="space-y-1.5 font-bold text-slate-350 hoverLinks text-[11px]">
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">VibeCart Stories</li>
            <li className="hover:underline cursor-pointer">Press Articles</li>
            <li className="hover:underline cursor-pointer">Corporate Info</li>
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Help</h4>
          <ul className="space-y-1.5 font-bold text-slate-350 hoverLinks text-[11px]">
            <li className="hover:underline cursor-pointer">Payments</li>
            <li className="hover:underline cursor-pointer">Shipping</li>
            <li className="hover:underline cursor-pointer">Cancellation</li>
            <li className="hover:underline cursor-pointer">Returns</li>
            <li className="hover:underline cursor-pointer">FAQ Hub</li>
          </ul>
        </div>

        {/* Policy */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Consumer Policy</h4>
          <ul className="space-y-1.5 font-bold text-slate-350 hoverLinks text-[11px]">
            <li className="hover:underline cursor-pointer">Return Policy</li>
            <li className="hover:underline cursor-pointer">Terms Of Use</li>
            <li className="hover:underline cursor-pointer">Security Safeguard</li>
            <li className="hover:underline cursor-pointer">Privacy Terms</li>
            <li className="hover:underline cursor-pointer">Sitemap Index</li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Social Channels</h4>
          <ul className="space-y-1.5 font-bold text-slate-350 hoverLinks text-[11px]">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Twitter (X)</li>
            <li className="hover:underline cursor-pointer">YouTube Channels</li>
          </ul>
        </div>

        {/* Mail address */}
        <div className="space-y-3 md:border-l border-white/5 md:pl-6 col-span-1">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Mail size={12} /> Mail Us</h4>
          <p className="text-slate-355 leading-normal text-[11px] font-semibold">
            VibeCart Headquarters,<br/>
            102 Luxury Retail Arcade,<br/>
            High Street Commercial Zone,<br/>
            Vibe City, Chennai, 600001,<br/>
            Tamil Nadu, India
          </p>
        </div>

        {/* Registered office */}
        <div className="space-y-3 col-span-1">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> Registered Office</h4>
          <p className="text-slate-355 leading-normal text-[11px] font-semibold">
            VibeCart Headquarters,<br/>
            102 Luxury Retail Arcade,<br/>
            High Street Commercial Zone,<br/>
            Vibe City, Chennai, 600001,<br/>
            Tamil Nadu, India<br/>
            CIN: U51109TN2026PTC066107<br/>
            Telephone: <span className="text-indigo-400 font-bold hover:underline cursor-pointer">044-45614700</span>
          </p>
        </div>

      </div>

      {/* Lower Copyright Row */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 font-bold text-[11px]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-slate-200">💼 Sell On VibeCart</span>
          <span className="flex items-center gap-1 text-slate-200">⭐ Advertise Brands</span>
          <span className="flex items-center gap-1 text-slate-200">🎁 Gift Cards Portal</span>
          <span className="flex items-center gap-1 text-slate-200">❓ Help Center Support</span>
        </div>

        <div className="text-center md:text-right">
          <p className="text-slate-300">© 2026 VibeCart E-Commerce. Unique custom design by Vignesh.</p>
        </div>

        {/* Secured gateway vector logos */}
        <div className="flex items-center gap-1 text-slate-500 font-black shrink-0">
          <CreditCard size={15} />
          <span>VISA | MasterCard | UPI Verified Payment Gateways</span>
        </div>
      </div>
    </footer>
  );
}
