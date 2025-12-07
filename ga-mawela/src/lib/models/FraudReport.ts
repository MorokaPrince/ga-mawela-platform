import mongoose, { Schema, Document } from 'mongoose';

export interface IFraudReport extends Document {
  title: string;
  description: string;
  fraudulentParties: string[];
  involvedOfficials: string[];
  corruptionDetails: string;
  evidence: string[];
  legalViolations: string[];
  affectedCommunities: string[];
  economicImpact: string;
  status: 'investigation_pending' | 'under_investigation' | 'resolved' | 'ongoing';
  investigationRequests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FraudReportSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fraudulentParties: [{ type: String }],
  involvedOfficials: [{ type: String }],
  corruptionDetails: { type: String, required: true },
  evidence: [{ type: String }],
  legalViolations: [{ type: String }],
  affectedCommunities: [{ type: String }],
  economicImpact: { type: String },
  status: {
    type: String,
    enum: ['investigation_pending', 'under_investigation', 'resolved', 'ongoing'],
    default: 'investigation_pending'
  },
  investigationRequests: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.FraudReport || mongoose.model<IFraudReport>('FraudReport', FraudReportSchema);