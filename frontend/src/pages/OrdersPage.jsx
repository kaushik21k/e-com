import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Calendar, CheckCircle2, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersPage() {
  const { orders, products } = useShop();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50 dark:bg-green-950/20';
      case 'Cancelled': return 'text-red-500 bg-red-50 dark:bg-red-950/20';
      default: return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 transition-colors dark:text-white">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 mb-6 flex items-center gap-2.5">
          <ShoppingBag size={20} className="text-flipkart-blue dark:text-blue-400" />
          <h2 className="text-lg font-black text-slate-850 dark:text-white uppercase tracking-tight">My Purchases & Orders</h2>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div 
                  key={order.id}
                  className="bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 overflow-hidden transition-all duration-300"
                >
                  {/* Order summary row */}
                  <div 
                    onClick={() => toggleExpand(order.id)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-750/30 transition-colors select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{order.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
                        <span className="flex items-center gap-1"><Calendar size={12} /> Placed: {order.date}</span>
                        <span>•</span>
                        <span>Pay: {order.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Total Paid: ₹{order.totalPrice.toLocaleString()}
                      </span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Tracker timeline */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 dark:border-slate-750 p-4 sm:p-5 bg-slate-50/20 dark:bg-slate-900/10 space-y-6"
                      >
                        {/* Items list */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Ordered Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => {
                              const prod = products.find(p => p.id === item.productId);
                              return (
                                <div key={idx} className="flex justify-between items-center gap-4 text-xs">
                                  <div className="flex items-center gap-3">
                                    <img src={prod?.images[0]} alt="" className="w-8 h-8 object-contain bg-white dark:bg-slate-800 border p-1 rounded-sm shrink-0" />
                                    <span className="truncate max-w-[240px] font-semibold">{prod?.name || item.productId}</span>
                                  </div>
                                  <div className="font-bold text-gray-400">
                                    {item.quantity} x <span className="text-slate-850 dark:text-white">₹{item.price.toLocaleString()}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Milestones timeline */}
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Milestone Delivery Timeline</h4>
                          
                          <div className="relative pl-6 space-y-6 border-l border-gray-200 dark:border-slate-700 ml-3 text-xs">
                            {order.timeline.map((event, idx) => (
                              <div key={idx} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-green-600 border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-sm">
                                  <CheckCircle2 size={8} className="text-white fill-green-600" />
                                </div>
                                <div>
                                  <span className="font-extrabold text-slate-800 dark:text-white block">{event.status}</span>
                                  <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{event.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Destination */}
                        <div className="pt-4 border-t border-gray-100 dark:border-slate-750 text-xs font-semibold text-slate-650 dark:text-slate-350 space-y-1.5">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Shipping Address</h4>
                          <p className="font-bold text-slate-850 dark:text-white">{order.address.name} ({order.address.phone})</p>
                          <p className="font-medium text-[11px] text-gray-400 leading-normal">
                            {order.address.addressText}, {order.address.locality}, {order.address.city}, {order.address.state} - {order.address.pincode}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded border p-8 shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-400">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Purchase catalog items from checkout to populate live milestone trackers.</p>
          </div>
        )}

      </div>
    </div>
  );
}
