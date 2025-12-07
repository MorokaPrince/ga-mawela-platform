import mongoose, { Schema, Document } from 'mongoose';

export interface ISource extends Document {
  title: string;
  url: string;
  type: 'primary_historical' | 'government_legal' | 'corporate_mining' | 'additional_evidence' | 'planned_future';
  description: string;
  category: string;
  reliability: 'high' | 'medium' | 'low';
  lastVerified: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ['primary_historical', 'government_legal', 'corporate_mining', 'additional_evidence', 'planned_future'],
    required: true
  },
  description: { type: String },
  category: { type: String, required: true },
  reliability: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  lastVerified: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Source || mongoose.model<ISource>('Source', SourceSchema);