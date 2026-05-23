import React, { createContext, useState, useEffect, useContext } from 'react';
import { allProducts } from '../data/sampleProducts';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // Database States
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('fk_products_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length >= 60000) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse cached fk_products_v2, resetting to full catalog", e);
      }
    }
    // Cache was outdated or stale, clear it to load our new massive 60,000+ items catalog
    localStorage.removeItem('fk_products_v2');
    return allProducts;
  });

  // User/Auth States
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fk_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Cart & Wishlist States
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fk_cart');
    return saved ? JSON.parse(saved) : {};
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fk_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Order History & Status
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fk_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "ORD-FK9482103",
        date: "2026-05-10",
        items: [
          { productId: "mob-001", quantity: 1, price: 127999 }
        ],
        totalPrice: 127999,
        address: {
          name: "Vignesh Kumar",
          phone: "9876543210",
          pincode: "560001",
          locality: "Koramangala",
          addressText: "Flat 402, Royal Residency, 4th Block",
          city: "Bengaluru",
          state: "Karnataka",
          addressType: "Home"
        },
        paymentMethod: "UPI",
        status: "Delivered",
        timeline: [
          { status: "Ordered", date: "2026-05-10 10:30 AM" },
          { status: "Packed", date: "2026-05-10 02:15 PM" },
          { status: "Shipped", date: "2026-05-11 09:00 AM" },
          { status: "Out for Delivery", date: "2026-05-12 08:30 AM" },
          { status: "Delivered", date: "2026-05-12 01:45 PM" }
        ]
      }
    ];
  });

  // UI & Personalization States
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('fk_darkmode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [language, setLanguage] = useState("en"); // "en" | "hi"
  const [notifications, setNotifications] = useState([
    { id: 1, type: "offer", text: "🔥 Welcome to Flipkart! Enjoy extra ₹500 off on your first UPI purchase.", read: false },
    { id: 2, type: "system", text: "⚡ Big Billion Days sale starts next week! Add items to wishlist.", read: false }
  ]);

  // Active Promo Code
  const [activeCoupon, setActiveCoupon] = useState(null);
  
  // Search and Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sync to LocalStorage
  useEffect(() => {
    try {
      // Standard large-scale databases are loaded directly from memory (allProducts).
      // We only save to local storage if it's small (e.g. customized test state lists),
      // protecting against browser storage QuotaExceededError crashes with 50,000+ items.
      if (products.length < 1000) {
        localStorage.setItem('fk_products_v2', JSON.stringify(products));
      }
    } catch (e) {
      console.warn("Storage quota limit reached or localStorage disabled. Bypassing cache.", e);
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fk_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fk_darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Notifications helper
  const addNotification = (text, type = "system") => {
    setNotifications(prev => [
      { id: Date.now(), type, text, read: false },
      ...prev
    ]);
  };

  // Auth Operations
  const login = (email, password, role = "user") => {
    // Admin Override Simulation
    if (email === "admin@flipkart.com" && password === "admin123") {
      const adminUser = { name: "Admin Manager", email: "admin@flipkart.com", role: "admin", rewardPoints: 250 };
      setUser(adminUser);
      addNotification("🔑 Logged in successfully as Administrator", "system");
      return { success: true, user: adminUser };
    }
    
    // Normal User Login
    const name = email.split('@')[0];
    const normalUser = { 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      email, 
      role, 
      rewardPoints: 120,
      referralCode: "FLIP_" + Math.random().toString(36).substring(2, 7).toUpperCase()
    };
    setUser(normalUser);
    addNotification(`👋 Welcome back, ${normalUser.name}!`, "system");
    return { success: true, user: normalUser };
  };

  const logout = () => {
    setUser(null);
    setCart({});
    addNotification("🚪 Logged out successfully", "system");
  };

  // Cart Operations
  const addToCart = (productId, qty = 1) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      return { ...prev, [productId]: currentQty + qty };
    });
    addNotification("🛒 Added item to Cart!", "offer");
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    addNotification("🗑️ Removed item from Cart", "system");
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => ({ ...prev, [productId]: qty }));
  };

  const clearCart = () => {
    setCart({});
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addNotification("💔 Removed item from Wishlist", "system");
        return prev.filter(id => id !== productId);
      } else {
        addNotification("💖 Added item to Wishlist!", "offer");
        return [...prev, productId];
      }
    });
  };

  // Review Operations
  const addProductReview = (productId, rating, comment, name = "Verified Shopper") => {
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        if (prod.id === productId) {
          const newReview = {
            id: prod.reviews.length + 1,
            name,
            rating,
            comment,
            date: new Date().toISOString().split('T')[0],
            verified: true,
            likes: 0,
            dislikes: 0
          };
          const updatedReviews = [newReview, ...prod.reviews];
          // Recalculate average rating
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));

          return {
            ...prod,
            reviews: updatedReviews,
            rating: newAvgRating,
            ratingCount: prod.ratingCount + 1,
            reviewCount: prod.reviewCount + 1
          };
        }
        return prod;
      });
    });
    addNotification("✍️ Review published successfully!", "system");
  };

  // Admin Product Operations
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: "prod-" + Date.now(),
      rating: 4.0,
      ratingCount: 1,
      reviewCount: 0,
      reviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification(`📦 Product "${newProduct.name}" added to stock!`, "system");
  };

  const editProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedData } : p));
    addNotification("✏️ Product updated successfully!", "system");
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification("🗑️ Product deleted from inventory", "system");
  };

  // Order Operations
  const createOrder = (address, paymentMethod) => {
    const orderItems = Object.keys(cart).map(id => {
      const prod = products.find(p => p.id === id);
      return {
        productId: id,
        quantity: cart[id],
        price: prod ? prod.price : 0
      };
    });

    const subTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstAmount = Math.round(subTotal * 0.18);
    const couponDiscount = activeCoupon ? activeCoupon.value : 0;
    const deliveryCharge = subTotal > 500 ? 0 : 40;
    const finalTotal = subTotal + gstAmount - couponDiscount + deliveryCharge;

    const newOrder = {
      id: "ORD-FK" + Math.floor(Math.random() * 9000000 + 1000000),
      date: new Date().toISOString().split('T')[0],
      items: orderItems,
      totalPrice: finalTotal,
      address,
      paymentMethod,
      status: "Ordered",
      timeline: [
        { status: "Ordered", date: new Date().toLocaleString() }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveCoupon(null);
    addNotification("🎉 Order placed successfully! Tracking number generated.", "system");

    // Add reward points for premium fidelity
    if (user) {
      setUser(prev => prev ? { ...prev, rewardPoints: prev.rewardPoints + Math.round(finalTotal * 0.01) } : null);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          timeline: [...ord.timeline, { status: newStatus, date: new Date().toLocaleString() }]
        };
      }
      return ord;
    }));
    addNotification(`🚚 Order ${orderId} marked as ${newStatus}`, "system");
  };

  return (
    <ShopContext.Provider value={{
      products,
      user,
      cart,
      wishlist,
      orders,
      darkMode,
      language,
      notifications,
      activeCoupon,
      searchQuery,
      selectedCategory,
      setSearchQuery,
      setSelectedCategory,
      setDarkMode,
      setLanguage,
      setActiveCoupon,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      toggleWishlist,
      addProductReview,
      addProduct,
      editProduct,
      deleteProduct,
      createOrder,
      updateOrderStatus,
      addNotification
    }}>
      {children}
    </ShopContext.Provider>
  );
};
