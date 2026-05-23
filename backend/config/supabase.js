import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized successfully!');
  } catch (error) {
    console.warn('⚠️ Supabase client initialization failed:', error.message);
  }
} else {
  console.warn('⚠️ SUPABASE_URL or SUPABASE_KEY not defined in .env environment variables.');
  console.warn('📦 [FALLBACK SANDBOX ACTIVE]: Running in high-fidelity sandbox cache mode.');
}

export const isSupabaseConnected = () => {
  return supabase !== null;
};
