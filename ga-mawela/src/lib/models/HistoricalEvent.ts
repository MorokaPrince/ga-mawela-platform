import mongoose, { Schema, Document } from 'mongoose';

export interface IHistoricalEvent extends Document {
  title: string;
  description: string;
  year: number;
  period: string;
  category: 'occupation' | 'land_transfer' | 'oppression' | 'resistance' | 'displacement' | 'leadership';
  location?: string;
  significance: string;
  sources: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HistoricalEventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  period: { type: String, required: true },
  category: {
    type: String,
    enum: ['occupation', 'land_transfer', 'oppression', 'resistance', 'displacement', 'leadership'],
    required: true
  },
  location: { type: String },
  significance: { type: String, required: true },
  sources: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.HistoricalEvent || mongoose.model<IHistoricalEvent>('HistoricalEvent', HistoricalEventSchema);