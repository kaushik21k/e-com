import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldAlert, Plus, Trash2, Edit, CheckCircle, Package, 
  ShoppingBag, Users, DollarSign, Percent, TrendingUp, X
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// Analytical Mock Data for Recharts
const salesData = [
  { name: 'Mon', sales: 42000, users: 450 },
  { name: 'Tue', sales: 58000, users: 510 },
  { name: 'Wed', sales: 62000, users: 490 },
  { name: 'Thu', sales: 75000, users: 580 },
  { name: 'Fri', sales: 90000, users: 670 },
  { name: 'Sat', sales: 110000, users: 800 },
  { name: 'Sun', sales: 125000, users: 890 }
];

const categoryDistribution = [
  { name: 'Mobiles', value: 450000, color: '#2874f0' },
  { name: 'Electronics', value: 320000, color: '#6366f1' },
  { name: 'Fashion', value: 180000, color: '#ec4899' },
  { name: 'Grocery', value: 95000, color: '#22c55e' },
  { name: 'Furniture', value: 75000, color: '#f59e0b' }
];

export default function AdminDashboard() {
  const { products, orders, addProduct, editProduct, deleteProduct, updateOrderStatus, user } = useShop();
  
  // Navigation tabs: 'overview' | 'products' | 'orders'
  const [activeTab, setActiveTab] = useState('overview');

  // Product CRUD states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminPage, setAdminPage] = useState(1);
  const adminPageSize = 15;
  
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'Mobiles',
    subcategory: '',
    originalPrice: '',
    price: '',
    discount: '0',
    stock: '50',
    deliveryDays: '2',
    emiOption: 'N/A',
    warranty: '1 Year Brand Warranty',
    seller: 'SuperCom Net',
    imageUrls: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    highlights1: 'Dual SIM connectivity',
    highlights2: 'High capacity long battery life',
    highlights3: 'Pre-installed custom interface OS',
    specificationsText: 'Model Name: Pro Series\nBrand: Apple\nCategory: Mobiles'
  });

  // Security Wall
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-red-200 text-center dark:text-white">
        <ShieldAlert size={48} className="mx-auto text-red-500 mb-3 animate-pulse" />
        <h2 className="text-xl font-black uppercase text-slate-850 dark:text-white">Access Denied!</h2>
        <p className="text-xs text-gray-400 mt-2 mb-6 font-medium">
          Only registered e-commerce administrators can access charts and inventory telemetry.
        </p>
        <p className="text-xs text-indigo-500 font-bold">
          💡 Tip: Click Login in Navbar and submit using pre-filled admin email & password credentials.
        </p>
      </div>
    );
  }

  // Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    // Parse image URLs list
    const parsedImages = newProd.imageUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // Parse specs grid from multiline text
    const parsedSpecs = {};
    newProd.specificationsText.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim();
        if (key && value) {
          parsedSpecs[key] = value;
        }
      }
    });

    const productPayload = {
      name: newProd.name,
      brand: newProd.brand,
      category: newProd.category,
      subcategory: newProd.subcategory || newProd.category,
      originalPrice: Number(newProd.originalPrice),
      price: Number(newProd.price),
      discount: Number(newProd.discount),
      stock: Number(newProd.stock),
      deliveryDays: Number(newProd.deliveryDays),
      emiOption: newProd.emiOption,
      warranty: newProd.warranty,
      seller: newProd.seller,
      images: parsedImages.length > 0 ? parsedImages : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'],
      highlights: [newProd.highlights1, newProd.highlights2, newProd.highlights3].filter(Boolean),
      specs: Object.keys(parsedSpecs).length > 0 ? parsedSpecs : {
        "Model Name": newProd.name,
        "Brand": newProd.brand,
        "Category": newProd.category
      }
    };

    if (editingProduct) {
      editProduct(editingProduct.id, productPayload);
      setEditingProduct(null);
    } else {
      addProduct(productPayload);
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);

    // Construct specs text lines back from object
    const specsLines = Object.entries(prod.specs || {})
      .map(([key, val]) => `${key}: ${val}`)
      .join('\n');

    setNewProd({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      subcategory: prod.subcategory || prod.category,
      originalPrice: prod.originalPrice.toString(),
      price: prod.price.toString(),
      discount: prod.discount.toString(),
      stock: prod.stock.toString(),
      deliveryDays: prod.deliveryDays.toString(),
      emiOption: prod.emiOption,
      warranty: prod.warranty,
      seller: prod.seller,
      imageUrls: (prod.images || []).join(', '),
      highlights1: prod.highlights[0] || 'Premium Build',
      highlights2: prod.highlights[1] || 'Includes Warranty',
      highlights3: prod.highlights[2] || 'Multi-device compatible',
      specificationsText: specsLines || `Model Name: ${prod.name}\nBrand: ${prod.brand}\nCategory: ${prod.category}`
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setNewProd({
      name: '',
      brand: '',
      category: 'Mobiles',
      subcategory: '',
      originalPrice: '',
      price: '',
      discount: '0',
      stock: '50',
      deliveryDays: '2',
      emiOption: 'N/A',
      warranty: '1 Year Brand Warranty',
      seller: 'SuperCom Net',
      imageUrls: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
      highlights1: 'Dual SIM connectivity',
      highlights2: 'High capacity long battery life',
      highlights3: 'Pre-installed custom interface OS',
      specificationsText: 'Model Name: Pro Series\nBrand: Apple\nCategory: Mobiles'
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-6 transition-colors dark:text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Nav (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded p-4 shadow-sm border border-gray-150 dark:border-slate-700/60 transition-colors">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Command Tower</h2>
            
            <div className="flex flex-col gap-2 font-bold text-xs select-none">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded flex items-center gap-2.5 transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-flipkart-blue text-white shadow' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                📊 Dashboard Analytics
              </button>
              
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-3 rounded flex items-center gap-2.5 transition-all ${
                  activeTab === 'products' 
                    ? 'bg-flipkart-blue text-white shadow' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                📦 Manage Inventory
              </button>

              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-3 rounded flex items-center gap-2.5 transition-all ${
                  activeTab === 'orders' 
                    ? 'bg-flipkart-blue text-white shadow' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                🚚 Dispatch & Orders ({orders.length})
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Panels (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Telemetry counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-flipkart-blue rounded-full">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Revenue</span>
                    <span className="text-sm font-black text-slate-850 dark:text-white">₹3.48 Lakh</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 rounded-full">
                    <Package size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Products</span>
                    <span className="text-sm font-black text-slate-850 dark:text-white">{products.length} Items</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 text-pink-500 rounded-full">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Customers</span>
                    <span className="text-sm font-black text-slate-850 dark:text-white">500 Users</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-gray-150 dark:border-slate-700/60 flex items-center gap-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 text-green-500 rounded-full">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Conversion</span>
                    <span className="text-sm font-black text-slate-850 dark:text-white">3.4 %</span>
                  </div>
                </div>
              </div>

              {/* Sales line graph */}
              <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase mb-6 tracking-wide">Weekly Transaction Volumes</h3>
                <div className="h-64 select-none">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#a0aec0" fontSize={11} fontWeight="bold" />
                      <YAxis stroke="#a0aec0" fontSize={11} fontWeight="bold" />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#2874f0" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Grid with category distribution & monthly revenue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Category distribution */}
                <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase mb-6 tracking-wide">Category Revenues</h3>
                  <div className="h-64 select-none flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistribution}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 text-xs font-bold text-slate-650 pr-4 select-none">
                      {categoryDistribution.map(cat => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span>{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User registration growth */}
                <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase mb-6 tracking-wide">User Registration Growth</h3>
                  <div className="h-64 select-none">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#a0aec0" fontSize={11} fontWeight="bold" />
                        <YAxis stroke="#a0aec0" fontSize={11} fontWeight="bold" />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stroke="#10b981" fill="#e6f4ea" fillOpacity={0.4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MANAGE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 transition-colors">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-lg font-black text-slate-850 dark:text-white uppercase tracking-tight">Stock & Inventory Catalog</h2>
                <button
                  onClick={() => { resetForm(); setEditingProduct(null); setShowAddModal(true); }}
                  className="px-4 py-2 bg-flipkart-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded shadow flex items-center gap-1 active:scale-95 transition-all"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>

              {/* Table of items */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 text-gray-400 font-extrabold select-none">
                      <th className="py-3 px-2">IMAGE</th>
                      <th className="py-3 px-2">PRODUCT TITLE</th>
                      <th className="py-3 px-2">CATEGORY</th>
                      <th className="py-3 px-2">PRICE</th>
                      <th className="py-3 px-2">STOCK</th>
                      <th className="py-3 px-2 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-slate-750 font-semibold text-slate-700 dark:text-slate-200">
                    {products.slice((adminPage - 1) * adminPageSize, adminPage * adminPageSize).map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-750/30">
                        <td className="py-3 px-2 shrink-0">
                          <img src={prod.images[0]} alt="" className="w-9 h-9 object-contain bg-slate-50 dark:bg-slate-900 border rounded" />
                        </td>
                        <td className="py-3 px-2 max-w-[200px] truncate leading-normal" title={prod.name}>
                          {prod.name}
                        </td>
                        <td className="py-3 px-2 uppercase text-[10px] tracking-wide text-gray-400">{prod.category}</td>
                        <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">₹{prod.price.toLocaleString()}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${prod.stock < 15 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                            {prod.stock} Left
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => handleEditClick(prod)}
                              className="p-1 text-slate-400 hover:text-flipkart-blue transition-colors"
                              title="Edit item"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-4 gap-4 select-none">
                <span className="text-xs text-gray-400 font-bold">
                  Showing {Math.min(products.length, (adminPage - 1) * adminPageSize + 1).toLocaleString()} - {Math.min(products.length, adminPage * adminPageSize).toLocaleString()} of {products.length.toLocaleString()} items
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={adminPage === 1}
                    onClick={() => { setAdminPage(prev => Math.max(1, prev - 1)); }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-[11px] font-extrabold uppercase tracking-wider rounded transition-all"
                  >
                    Previous
                  </button>
                  <button
                    disabled={adminPage * adminPageSize >= products.length}
                    onClick={() => { setAdminPage(prev => prev + 1); }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-[11px] font-extrabold uppercase tracking-wider rounded transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISPATCH & ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-slate-800 rounded p-6 shadow-sm border border-gray-150 dark:border-slate-700/60 transition-colors">
              <h2 className="text-lg font-black text-slate-850 dark:text-white uppercase tracking-tight border-b pb-4 mb-6">
                Active Shipping Shipments
              </h2>

              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-slate-700 text-gray-400 font-extrabold select-none">
                        <th className="py-3 px-2">ORDER ID</th>
                        <th className="py-3 px-2">DATE Placed</th>
                        <th className="py-3 px-2">CONSIGNEE</th>
                        <th className="py-3 px-2">TOTAL</th>
                        <th className="py-3 px-2">STATUS</th>
                        <th className="py-3 px-2 text-center">CHANGE TRACK STATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-750 font-semibold text-slate-700 dark:text-slate-200">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-750/30">
                          <td className="py-3 px-2 font-bold uppercase">{order.id}</td>
                          <td className="py-3 px-2 text-gray-400">{order.date}</td>
                          <td className="py-3 px-2 font-bold leading-normal">
                            {order.address.name}<br/>
                            <span className="text-[10px] text-gray-400">{order.address.city}, {order.address.state}</span>
                          </td>
                          <td className="py-3 px-2 font-black text-slate-900 dark:text-white">₹{order.totalPrice.toLocaleString()}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                              order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="px-2 py-1 text-[10px] font-extrabold border rounded dark:bg-slate-900 dark:border-slate-700 select-none cursor-pointer text-indigo-600"
                            >
                              <option value="Ordered">Ordered</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">No order files found in database.</p>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Product Modal Overlays */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white dark:bg-slate-800 rounded shadow-2xl p-6 relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-slate-800 dark:text-white"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-slate-850 dark:hover:text-white p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black uppercase border-b pb-3 mb-4 flex items-center gap-2">
                <Package className="text-flipkart-blue" size={20} />
                {editingProduct ? `Edit Catalog: ${editingProduct.brand}` : "Add New Stock Product"}
              </h3>

              <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs font-semibold">
                
                {/* Titles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">PRODUCT TITLE *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple iPad Pro 11"
                      value={newProd.name}
                      onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">BRAND NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple"
                      value={newProd.brand}
                      onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                </div>

                {/* Categories & Price */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">CATEGORY</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-extrabold cursor-pointer"
                    >
                      <option value="Mobiles">Mobiles</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Home Appliances">Home Appliances</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Sports">Sports</option>
                      <option value="Books">Books</option>
                      <option value="Toys">Toys</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">SUBCATEGORY *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iOS or Android"
                      value={newProd.subcategory}
                      onChange={(e) => setNewProd({ ...newProd, subcategory: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">ORIGINAL PRICE *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={newProd.originalPrice}
                      onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">OFFER PRICE *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 12000"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">DISCOUNT (%)</label>
                    <input
                      type="number"
                      placeholder="e.g. 20"
                      value={newProd.discount}
                      onChange={(e) => setNewProd({ ...newProd, discount: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                </div>

                {/* Stock, delivery, EMI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">STOCK CAPACITY</label>
                    <input
                      type="number"
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">DELIVERY LEAD DAYS</label>
                    <input
                      type="number"
                      value={newProd.deliveryDays}
                      onChange={(e) => setNewProd({ ...newProd, deliveryDays: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1">EMI TAG LINE</label>
                    <input
                      type="text"
                      value={newProd.emiOption}
                      onChange={(e) => setNewProd({ ...newProd, emiOption: e.target.value })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-bold"
                    />
                  </div>
                </div>

                {/* Image URLs list */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">PRODUCT IMAGES (Comma separated URLs for gallery) *</label>
                  <textarea
                    required
                    rows={2}
                    value={newProd.imageUrls}
                    onChange={(e) => setNewProd({ ...newProd, imageUrls: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-medium font-mono text-[10px]"
                    placeholder="e.g. URL-1, URL-2, URL-3"
                  />
                </div>

                {/* bullet highlights */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 block">KEY BULLET HIGHLIGHTS *</label>
                  <input
                    type="text"
                    required
                    placeholder="Highlight 1 (e.g. 10.9-inch Liquid Retina Display)"
                    value={newProd.highlights1}
                    onChange={(e) => setNewProd({ ...newProd, highlights1: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Highlight 2 (e.g. A14 Bionic chip with Neural Engine)"
                    value={newProd.highlights2}
                    onChange={(e) => setNewProd({ ...newProd, highlights2: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Highlight 3 (e.g. Support for Apple Pencil)"
                    value={newProd.highlights3}
                    onChange={(e) => setNewProd({ ...newProd, highlights3: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus"
                  />
                </div>

                {/* Specifications Multiline Editor */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">TECHNICAL SPECIFICATIONS GRID (One Key:Value per line) *</label>
                  <textarea
                    required
                    rows={4}
                    value={newProd.specificationsText}
                    onChange={(e) => setNewProd({ ...newProd, specificationsText: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 input-focus font-medium font-mono text-[10px]"
                    placeholder="Model Name: iPhone 15 Pro&#10;Color: Natural Titanium&#10;Display Size: 6.1 inch&#10;RAM: 8 GB"
                  />
                </div>

                {/* Submit panel */}
                <div className="flex justify-end gap-3 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded uppercase font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded uppercase font-bold shadow active:scale-95 transition-all"
                  >
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
