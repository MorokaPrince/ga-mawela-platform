import mongoose, { Schema, Document } from 'mongoose';

export interface ILegalFramework extends Document {
  title: string;
  actName: string;
  actNumber: string;
  description: string;
  keyProvisions: string[];
  relevanceToCommunity: string;
  violations: string[];
  governmentDepartment: string;
  website: string;
  lastUpdated: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LegalFrameworkSchema: Schema = new Schema({
  title: { type: String, required: true },
  actName: { type: String, required: true },
  actNumber: { type: String, required: true },
  description: { type: String, required: true },
  keyProvisions: [{ type: String }],
  relevanceToCommunity: { type: String, required: true },
  violations: [{ type: String }],
  governmentDepartment: { type: String, required: true },
  website: { type: String, required: true },
  lastUpdated: { type: Date },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.LegalFramework || mongoose.model<ILegalFramework>('LegalFramework', LegalFrameworkSchema);