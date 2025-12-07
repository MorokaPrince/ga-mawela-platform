import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestigation extends Document {
  title: string;
  description: string;
  status: 'draft' | 'pending' | 'approved' | 'published' | 'open' | 'closed';
  evidence: string[];
  signoffBy?: string;
  signoffAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InvestigationSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'published', 'open', 'closed'],
    default: 'draft'
  },
  evidence: [{ type: String }],
  signoffBy: { type: String },
  signoffAt: { type: Date },
}, {
  timestamps: true,
});

export default mongoose.models.Investigation || mongoose.model<IInvestigation>('Investigation', InvestigationSchema);