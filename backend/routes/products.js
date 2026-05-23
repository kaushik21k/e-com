import express from 'express';
import { supabase, isSupabaseConnected } from '../config/supabase.js';

const router = express.Router();

// Sandbox local cache database
let sandboxProducts = [
  {
    id: "mob-001",
    name: "Apple iPhone 15 Pro (Natural Titanium, 256 GB)",
    category: "Mobiles",
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80"],
    originalPrice: 139900,
    price: 127999,
    discount: 8,
    rating: 4.7,
    ratingCount: 8492,
    reviewCount: 924,
    stock: 24,
    deliveryDays: 1,
    emiOption: "Starting from ₹6,200/month",
    warranty: "1 Year Domestic Warranty",
    seller: "SuperCom Net",
    highlights: ["256 GB ROM | 6.1 inch Super Retina XDR Display", "A17 Pro Chip with 6-core GPU"],
    specs: { "Display": "6.1 inch", "Processor": "A17 Pro" },
    reviews: [
      { id: 1, name: "Aarav M.", rating: 5, comment: "Absolutely breathtaking! The titanium finish feels premium.", date: "2026-05-10", verified: true, likes: 142, dislikes: 4 }
    ]
  },
  {
    id: "elec-002",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"],
    originalPrice: 34990,
    price: 26999,
    discount: 22,
    rating: 4.6,
    ratingCount: 15902,
    reviewCount: 1824,
    stock: 50,
    deliveryDays: 1,
    emiOption: "Starting from ₹1,290/month",
    warranty: "1 Year Brand Warranty",
    seller: "SonyStore",
    highlights: ["Industry-leading Active Noise Cancellation", "Up to 30 Hours of continuous battery life"],
    specs: { "Connectivity": "Bluetooth 5.2", "Battery Life": "30 hrs" },
    reviews: []
  }
];

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    if (isSupabaseConnected()) {
      let query = supabase.from('products').select('*');
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    } else {
      let list = [...sandboxProducts];
      if (category && category !== 'All') {
        list = list.filter(p => p.category === category);
      }
      return res.status(200).json(list);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(data);
    } else {
      const item = sandboxProducts.find(p => p.id === id);
      if (!item) return res.status(404).json({ message: 'Product not found in sandbox' });
      return res.status(200).json(item);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST ADD PRODUCT (ADMIN)
router.post('/', async (req, res) => {
  try {
    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...req.body, reviews: [] }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      const item = { ...req.body, id: 'prod-' + Date.now(), reviews: [] };
      sandboxProducts.push(item);
      return res.status(201).json(item);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT EDIT PRODUCT (ADMIN)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('products')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    } else {
      sandboxProducts = sandboxProducts.map(p => p.id === id ? { ...p, ...req.body } : p);
      const updated = sandboxProducts.find(p => p.id === id);
      return res.status(200).json(updated);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE PRODUCT (ADMIN)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isSupabaseConnected()) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ message: 'Product deleted' });
    } else {
      sandboxProducts = sandboxProducts.filter(p => p.id !== id);
      return res.status(200).json({ message: 'Product deleted from sandbox' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST CUSTOMER REVIEW
router.post('/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { name, rating, comment } = req.body;
  try {
    if (isSupabaseConnected()) {
      // Fetch existing reviews
      const { data: prod, error: fetchErr } = await supabase
        .from('products')
        .select('reviews, rating, ratingCount, reviewCount')
        .eq('id', id)
        .single();

      if (fetchErr) throw fetchErr;
      if (!prod) return res.status(404).json({ message: 'Product not found' });

      const reviews = prod.reviews || [];
      const newReview = { name, rating: Number(rating), comment, date: new Date().toISOString().split('T')[0], verified: true };
      reviews.unshift(newReview);

      const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const newAvg = parseFloat((sum / reviews.length).toFixed(1));
      const ratingCount = (prod.ratingCount || 0) + 1;
      const reviewCount = (prod.reviewCount || 0) + 1;

      // Update in Supabase
      const { data: updated, error: updateErr } = await supabase
        .from('products')
        .update({
          reviews,
          rating: newAvg,
          ratingCount,
          reviewCount
        })
        .eq('id', id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      return res.status(201).json(updated);
    } else {
      const prodIdx = sandboxProducts.findIndex(p => p.id === id);
      if (prodIdx === -1) return res.status(404).json({ message: 'Product not found' });
      
      const newReview = { name, rating: Number(rating), comment, date: new Date().toISOString().split('T')[0], verified: true };
      sandboxProducts[prodIdx].reviews.unshift(newReview);
      
      const sum = sandboxProducts[prodIdx].reviews.reduce((acc, curr) => acc + curr.rating, 0);
      sandboxProducts[prodIdx].rating = parseFloat((sum / sandboxProducts[prodIdx].reviews.length).toFixed(1));
      sandboxProducts[prodIdx].ratingCount += 1;
      sandboxProducts[prodIdx].reviewCount += 1;
      
      return res.status(201).json(sandboxProducts[prodIdx]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
