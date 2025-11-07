import mongoose, { Schema, Document } from 'mongoose';

export interface ILineage extends Document {
  name: string;
  ancestors: string[];
  documents: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const LineageSchema: Schema = new Schema({
  name: { type: String, required: true },
  ancestors: [{ type: String }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
}, {
  timestamps: true,
});

export default mongoose.models.Lineage || mongoose.model<ILineage>('Lineage', LineageSchema);