import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  type: 'department' | 'corporate' | 'government' | 'legal' | 'cultural';
  organization: string;
  description: string;
  url: string;
  contactInfo?: string;
  relevance: string;
  isActive: boolean;
  lastVerified: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['department', 'corporate', 'government', 'legal', 'cultural'],
    required: true
  },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  contactInfo: { type: String },
  relevance: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastVerified: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);