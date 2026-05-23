import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/flipkart_db";
    
    // Set connection options
    const options = {
      serverSelectionTimeoutMS: 3000, // Timeout after 3 seconds instead of 30s
    };

    console.log(`🔌 Attempting connection to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri, options);
    console.log('✅ MongoDB connected successfully! Ready for database transactions.');
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB Connection Failed. Details:', error.message);
    console.warn('📦 [FALLBACK SECURE MODE ACTIVATED]: Express will continue in secure JSON mock/sandbox mode.');
    return false;
  }
};
