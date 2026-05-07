import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  caId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  portal: { type: String, enum: ['INCOME_TAX', 'GST'], required: true },
  
  referenceNumber: { type: String, required: true },
  issueDate: { type: Date },
  dueDate: { type: Date },
  
  section: { type: String }, // e.g. 143(1), 148, etc.
  description: { type: String },
  documentUrl: { type: String }, // Link to downloaded PDF/HTML
  
  status: { type: String, enum: ['NEW', 'ONGOING', 'CLOSED', 'OVERDUE'], default: 'NEW' },
  
  fetchedAt: { type: Date, default: Date.now },
});

// Ensure we don't duplicate notices
NoticeSchema.index({ clientId: 1, portal: 1, referenceNumber: 1 }, { unique: true });

export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
