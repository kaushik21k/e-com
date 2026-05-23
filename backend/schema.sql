-- ====================================================================
-- SUPABASE POSTGRESQL DATABASE SCHEMAS & INITIAL SEEDING
-- Copy and paste this script directly into the SQL Editor of your 
-- Supabase Dashboard to instantly setup your e-commerce tables.
-- ====================================================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  reward_points INT DEFAULT 100,
  referral_code VARCHAR(100) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  images TEXT[] DEFAULT '{}',
  originalPrice NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 4.0,
  ratingCount INT DEFAULT 0,
  reviewCount INT DEFAULT 0,
  stock INT DEFAULT 10,
  deliveryDays INT DEFAULT 2,
  emiOption VARCHAR(255) DEFAULT 'N/A',
  warranty VARCHAR(255) DEFAULT '1 Year Warranty',
  seller VARCHAR(255) DEFAULT 'SuperCom Net',
  highlights TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  reviews JSONB DEFAULT '[]'
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  items JSONB NOT NULL DEFAULT '[]',
  total_price NUMERIC NOT NULL,
  address JSONB NOT NULL DEFAULT '{}',
  payment_method VARCHAR(100) NOT NULL,
  status VARCHAR(100) DEFAULT 'Ordered',
  timeline JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Offers Table
CREATE TABLE IF NOT EXISTS offers (
  code VARCHAR(100) PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'flat' | 'percent'
  value NUMERIC NOT NULL,
  minAmount NUMERIC DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- ====================================================================
-- SEED DATA SECTION
-- ====================================================================

-- Seed initial coupon offers
INSERT INTO offers (code, type, value, minAmount, active) VALUES
('WELCOME100', 'flat', 100, 500, TRUE),
('BIGBILLION', 'percent', 10, 1000, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Seed initial flagship products
INSERT INTO products (
  id, name, category, brand, images, originalPrice, price, discount, 
  rating, ratingCount, reviewCount, stock, deliveryDays, emiOption, 
  warranty, seller, highlights, specs, reviews
) VALUES
(
  'mob-001', 
  'Apple iPhone 15 Pro (Natural Titanium, 256 GB)', 
  'Mobiles', 
  'Apple', 
  ARRAY['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'], 
  139900, 
  127999, 
  8, 
  4.7, 
  8492, 
  924, 
  24, 
  1, 
  'Starting from ₹6,200/month', 
  '1 Year Domestic Warranty', 
  'SuperCom Net', 
  ARRAY['256 GB ROM | 6.1 inch Super Retina XDR Display', 'A17 Pro Chip with 6-core GPU', '48MP + 12MP + 12MP Camera system'], 
  '{"Display": "6.1 inch", "Processor": "A17 Pro", "Camera": "48MP Primary"}'::jsonb, 
  '[{"name": "Aarav M.", "rating": 5, "comment": "Absolutely breathtaking titanium finish! The custom actions and high-speed processing are fantastic.", "date": "2026-05-10", "verified": true, "likes": 142, "dislikes": 4}]'::jsonb
),
(
  'elec-002', 
  'Sony WH-1000XM5 Wireless Headphones', 
  'Electronics', 
  'Sony', 
  ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'], 
  34990, 
  26999, 
  22, 
  4.6, 
  15902, 
  1824, 
  50, 
  2, 
  'Starting from ₹1,290/month', 
  '1 Year Brand Warranty', 
  'SonyStore', 
  ARRAY['Industry-leading Active Noise Cancellation', 'Up to 30 Hours of continuous battery life', 'Optimized multi-point bluetooth connection'], 
  '{"Connectivity": "Bluetooth 5.2", "Battery Life": "30 hrs"}'::jsonb, 
  '[]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
