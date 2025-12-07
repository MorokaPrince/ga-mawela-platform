import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunity extends Document {
  name: string;
  description: string;
  leadership: {
    kings: string[];
    currentLeaders: string[];
    ancestralLineage: string[];
  };
  territories: string[];
  neighboringCommunities: string[];
  culturalHeritage: {
    praiseSongs: string[];
    traditions: string[];
    landmarks: string[];
  };
  historicalSignificance: string;
  population: number;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  leadership: {
    kings: [{ type: String }],
    currentLeaders: [{ type: String }],
    ancestralLineage: [{ type: String }],
  },
  territories: [{ type: String }],
  neighboringCommunities: [{ type: String }],
  culturalHeritage: {
    praiseSongs: [{ type: String }],
    traditions: [{ type: String }],
    landmarks: [{ type: String }],
  },
  historicalSignificance: { type: String, required: true },
  population: { type: Number },
  languages: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.Community || mongoose.model<ICommunity>('Community', CommunitySchema);