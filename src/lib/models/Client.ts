import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  caId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  panNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  
  // Income Tax Details
  itUsername: { type: String },
  itPassword: { type: String }, // In production, this must be encrypted
  itLastSync: { type: Date },
  itSyncFrequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Manual'], default: 'Manual' },
  
  // GST Details
  gstin: { type: String },
  gstUsername: { type: String },
  gstPassword: { type: String },
  gstLastSync: { type: Date },
  gstSyncFrequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Manual'], default: 'Manual' },
  
  createdAt: { type: Date, default: Date.now },
});

export const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);
