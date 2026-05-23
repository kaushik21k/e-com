import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Smartphone, Laptop, Shirt, Carrot, Tv, Sofa, 
  Sparkles, Trophy, BookOpen, ToyBrick, Paperclip, Grid
} from 'lucide-react';

const categories = [
  { name: "All", icon: Grid, color: "text-slate-500", bg: "bg-slate-50 dark:bg-slate-900" },
  { name: "Mobiles", icon: Smartphone, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
  { name: "Electronics", icon: Laptop, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/20" },
  { name: "Fashion", icon: Shirt, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/20" },
  { name: "Grocery", icon: Carrot, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" },
  { name: "Home Appliances", icon: Tv, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/20" },
  { name: "Furniture", icon: Sofa, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
  { name: "Beauty", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" },
  { name: "Sports", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
  { name: "Books", icon: BookOpen, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
  { name: "Toys", icon: ToyBrick, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
  { name: "Accessories", icon: Paperclip, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/20" }
];

export default function CategoriesHeader() {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useShop();

  const handleSelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery(""); // Clear search query when browsing by category
  };

  return (
    <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all overflow-x-auto scrollbar-none py-3.5 sticky top-[73px] z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 md:gap-2">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none min-w-[70px] select-none"
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isSelected 
                    ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white scale-110 shadow-indigo-500/20 ring-4 ring-indigo-500/10' 
                    : `${cat.bg} group-hover:scale-105`
                }`}
              >
                <IconComponent 
                  size={18} 
                  className={`transition-colors ${isSelected ? 'text-white' : cat.color} group-hover:scale-110`} 
                />
              </div>
              <span 
                className={`text-[9px] uppercase tracking-widest font-extrabold text-center transition-all ${
                  isSelected 
                    ? 'text-indigo-600 dark:text-indigo-400 scale-105' 
                    : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
