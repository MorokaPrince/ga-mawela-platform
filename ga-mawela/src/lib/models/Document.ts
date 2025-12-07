import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  filename: string;
  type: string;
  url: string;
  size: number;
  description?: string;
  category?: string;
  investigationId?: mongoose.Types.ObjectId;
  lineageId?: mongoose.Types.ObjectId;
  uploadedAt: Date;
  uploadedBy: string; // user ID
}

const DocumentSchema: Schema = new Schema({
  filename: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  investigationId: { type: Schema.Types.ObjectId, ref: 'Investigation' },
  lineageId: { type: Schema.Types.ObjectId, ref: 'Lineage' },
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: String, required: true },
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);