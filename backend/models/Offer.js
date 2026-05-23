import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['flat', 'percent'], required: true },
  value: { type: Number, required: true },
  minAmount: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

export default mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
