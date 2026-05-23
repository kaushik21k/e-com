import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { isSupabaseConnected } from './config/supabase.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import offerRoutes from './routes/offers.js';

// Load ENV Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*',
  credentials: true
}));

// Payload Parser limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint with Supabase integration status
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    timestamp: new Date(), 
    database: isSupabaseConnected() ? 'supabase-connected' : 'offline/sandbox-active' 
  });
});

// Bind API Routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/offers', offerRoutes);

// Server listener
app.listen(PORT, () => {
  console.log(`🚀 VibeCart Supabase Server running successfully on port ${PORT}!`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
});
