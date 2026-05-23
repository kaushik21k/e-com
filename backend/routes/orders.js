import express from 'express';
import { supabase, isSupabaseConnected } from '../config/supabase.js';

const router = express.Router();

// Sandbox Order cache database
let sandboxOrders = [
  {
    id: "ORD-FK9482103",
    date: "2026-05-10",
    items: [{ productId: "mob-001", quantity: 1, price: 127999 }],
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
      { status: "Delivered", date: "2026-05-12 01:45 PM" }
    ]
  }
];

// GET ALL ORDERS Placed (ADMIN)
router.get('/', async (req, res) => {
  try {
    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    } else {
      return res.status(200).json(sandboxOrders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST CREATE NEW ORDER
router.post('/', async (req, res) => {
  try {
    const orderId = "ORD-FK" + Math.floor(Math.random() * 9000000 + 1000000);
    const dateStr = new Date().toISOString().split('T')[0];
    const timeline = [{ status: "Ordered", date: new Date().toLocaleString() }];

    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          id: orderId,
          user_email: req.body.userEmail || '',
          items: req.body.items,
          total_price: req.body.totalPrice,
          address: req.body.address,
          payment_method: req.body.paymentMethod,
          status: 'Ordered',
          timeline
        }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } else {
      const order = {
        ...req.body,
        id: orderId,
        date: dateStr,
        timeline
      };
      sandboxOrders.unshift(order);
      return res.status(201).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT UPDATE ORDER SHIPPING STATUS (ADMIN)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (isSupabaseConnected()) {
      // Fetch timeline
      const { data: order, error: fetchErr } = await supabase
        .from('orders')
        .select('timeline')
        .eq('id', id)
        .single();

      if (fetchErr) throw fetchErr;

      const timeline = order.timeline || [];
      timeline.push({ status, date: new Date().toLocaleString() });

      const { data: updated, error: updateErr } = await supabase
        .from('orders')
        .update({
          status,
          timeline
        })
        .eq('id', id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      return res.status(200).json(updated);
    } else {
      const orderIdx = sandboxOrders.findIndex(o => o.id === id);
      if (orderIdx === -1) return res.status(404).json({ message: 'Order not found in sandbox' });
      
      sandboxOrders[orderIdx].status = status;
      sandboxOrders[orderIdx].timeline.push({ status, date: new Date().toLocaleString() });
      
      return res.status(200).json(sandboxOrders[orderIdx]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
