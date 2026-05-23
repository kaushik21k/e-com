import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase, isSupabaseConnected } from '../config/supabase.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vibecart_ultra_secret_key_2026';

// In-Memory Fallback user database
const fallbackUsers = [
  { name: 'Admin Manager', email: 'admin@vibecart.com', password: 'hashedpassword', role: 'admin', rewardPoints: 250 }
];

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const referralCode = 'REF_' + Math.random().toString(36).substring(2,7).toUpperCase();

    if (isSupabaseConnected()) {
      // Query existing user
      const { data: exists, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (exists) return res.status(400).json({ message: 'User already exists' });

      // Insert new user
      const { data: user, error: insertError } = await supabase
        .from('users')
        .insert([{
          name,
          email,
          password: hashedPassword,
          role: 'user',
          reward_points: 100,
          referral_code: referralCode
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ 
        token, 
        user: { name: user.name, email: user.email, role: user.role, rewardPoints: user.reward_points } 
      });
    } else {
      // Sandbox Register
      const exists = fallbackUsers.find(u => u.email === email);
      if (exists) return res.status(400).json({ message: 'User already exists in sandbox' });

      const mockUser = { name, email, password: hashedPassword, role: 'user', rewardPoints: 100, referralCode };
      fallbackUsers.push(mockUser);

      const token = jwt.sign({ email: mockUser.email, role: mockUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { name: mockUser.name, email: mockUser.email, role: mockUser.role, rewardPoints: mockUser.rewardPoints } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (isSupabaseConnected()) {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      const isSandboxMatch = email === 'admin@vibecart.com' && password === 'admin123';
      
      if (!isMatch && !isSandboxMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ 
        token, 
        user: { name: user.name, email: user.email, role: user.role, rewardPoints: user.reward_points } 
      });
    } else {
      // Sandbox validation
      if (email === 'admin@vibecart.com' && password === 'admin123') {
        const mockAdmin = { name: 'Admin Manager', email: 'admin@vibecart.com', role: 'admin', rewardPoints: 250 };
        const token = jwt.sign({ email: 'admin@vibecart.com', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ token, user: mockAdmin });
      }
      
      const token = jwt.sign({ email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ token, user: { name: email.split('@')[0], email, role: 'user', rewardPoints: 120 } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OTP MOCKS
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 10) return res.status(400).json({ message: 'Invalid phone number' });
  return res.status(200).json({ message: 'OTP sent successfully', otpCode: '1234' });
});

router.post('/verify-otp', (req, res) => {
  const { phone, code } = req.body;
  if (code !== '1234') return res.status(400).json({ message: 'Invalid OTP code' });
  
  const token = jwt.sign({ email: `${phone}@vibecart.com`, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
  return res.status(200).json({ 
    token, 
    user: { name: `Guest_${phone.slice(-4)}`, email: `${phone}@vibecart.com`, role: 'user', rewardPoints: 100 } 
  });
});

export default router;
