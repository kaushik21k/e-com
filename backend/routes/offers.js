import express from 'express';
import { supabase, isSupabaseConnected } from '../config/supabase.js';

const router = express.Router();

// Sandbox Offer cache database
const sandboxOffers = [
  { code: 'WELCOME100', type: 'flat', value: 100, minAmount: 500, active: true },
  { code: 'BIGBILLION', type: 'percent', value: 10, minAmount: 1000, active: true }
];

// GET ALL COUPONS
router.get('/', async (req, res) => {
  try {
    if (isSupabaseConnected()) {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('active', true);

      if (error) throw error;
      return res.status(200).json(data);
    } else {
      return res.status(200).json(sandboxOffers);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST VALIDATE COUPON CODE
router.post('/validate', async (req, res) => {
  const { code, amount } = req.body;
  try {
    if (isSupabaseConnected()) {
      const { data: offer, error } = await supabase
        .from('offers')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('active', true)
        .maybeSingle();

      if (error) throw error;
      if (!offer) return res.status(404).json({ message: 'Invalid or expired coupon code' });
      
      if (amount < offer.minAmount) {
        return res.status(400).json({ message: `Minimum order amount to apply is ₹${offer.minAmount}` });
      }
      
      return res.status(200).json(offer);
    } else {
      const offer = sandboxOffers.find(o => o.code === code.toUpperCase() && o.active);
      if (!offer) return res.status(404).json({ message: 'Invalid or expired coupon code in sandbox' });
      
      if (amount < offer.minAmount) {
        return res.status(400).json({ message: `Minimum order amount to apply is ₹${offer.minAmount}` });
      }
      
      return res.status(200).json(offer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
