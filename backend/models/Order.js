import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  locality: { type: String },
  addressText: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  addressType: { type: String, default: 'Home' }
});

const TimelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userEmail: { type: String },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  address: AddressSchema,
  paymentMethod: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Ordered', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'], 
    default: 'Ordered' 
  },
  timeline: [TimelineSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
