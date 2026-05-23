import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String, required: true },
  images: [{ type: String }],
  originalPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.0 },
  ratingCount: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  deliveryDays: { type: Number, default: 2 },
  emiOption: { type: String, default: 'N/A' },
  warranty: { type: String, default: '1 Year Warranty' },
  seller: { type: String, default: 'SuperCom Net' },
  highlights: [{ type: String }],
  specs: { type: Map, of: String },
  reviews: [ReviewSchema]
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
