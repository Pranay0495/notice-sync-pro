import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firmName: { type: String, required: true },
  phone: { type: String },
  plan: { type: String, enum: ['FREE', 'PRO', 'ENTERPRISE'], default: 'FREE' },
  credits: { type: Number, default: 0 },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'past_due'], default: 'inactive' },
  razorpayCustomerId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
