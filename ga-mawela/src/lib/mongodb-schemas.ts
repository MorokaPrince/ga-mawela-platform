/**
 * MongoDB Schema Definitions for Ga-Mawela Platform
 * Defines all collections, fields, and validation rules
 */

// ============================================
// DOCUMENTS COLLECTION
// ============================================
export interface Document {
  _id?: string;
  title: string;
  description: string;
  category: 'legal' | 'historical' | 'evidence' | 'testimony' | 'archaeological' | 'other';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  isPublic: boolean;
  requiresAuthentication: boolean;
  tags: string[];
  downloadCount: number;
  lastDownloadedAt?: Date;
  metadata?: {
    author?: string;
    date?: Date;
    source?: string;
    relevance?: string;
  };
}

// ============================================
// USERS COLLECTION
// ============================================
export interface User {
  _id?: string;
  email: string;
  name: string;
  password?: string;
  image?: string;
  role: 'member' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  emailVerified?: boolean;
  profile?: {
    phone?: string;
    address?: string;
    community?: string;
    relationship?: string;
  };
}

// ============================================
// PETITIONS COLLECTION
// ============================================
export interface Petition {
  _id?: string;
  title: string;
  description: string;
  targetSignatures: number;
  currentSignatures: number;
  status: 'active' | 'closed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  category: string;
  signatures: PetitionSignature[];
}

export interface PetitionSignature {
  _id?: string;
  petitionId: string;
  name: string;
  email: string;
  message?: string;
  signedAt: Date;
  ipAddress?: string;
  verified: boolean;
}

// ============================================
// FORMS COLLECTION
// ============================================
export interface FormSubmission {
  _id?: string;
  formType: 'contact' | 'inquiry' | 'report' | 'feedback' | 'other';
  submittedBy: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: string[];
  status: 'new' | 'read' | 'responded' | 'closed';
  submittedAt: Date;
  respondedAt?: Date;
  response?: string;
  respondedBy?: string;
  metadata?: Record<string, any>;
}

// ============================================
// LINEAGE COLLECTION
// ============================================
export interface LineageEntry {
  _id?: string;
  name: string;
  generation: number;
  parentId?: string;
  childrenIds?: string[];
  spouse?: string;
  birthDate?: Date;
  deathDate?: Date;
  birthPlace?: string;
  notes?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  verifiedBy?: string;
  sources?: string[];
}

// ============================================
// INVESTIGATIONS COLLECTION
// ============================================
export interface Investigation {
  _id?: string;
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'archived';
  category: string;
  findings: string;
  evidence: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
  relatedDocuments: string[];
  tags: string[];
}

// ============================================
// MONGODB COLLECTION NAMES
// ============================================
export const COLLECTIONS = {
  DOCUMENTS: 'documents',
  USERS: 'users',
  PETITIONS: 'petitions',
  PETITION_SIGNATURES: 'petition_signatures',
  FORMS: 'forms',
  LINEAGE: 'lineage',
  INVESTIGATIONS: 'investigations',
  SESSIONS: 'sessions',
  ACCOUNTS: 'accounts',
  VERIFICATION_TOKENS: 'verification_tokens',
} as const;

// ============================================
// MONGODB INDEXES
// ============================================
export const INDEXES = {
  documents: [
    { key: { category: 1 } },
    { key: { isPublic: 1 } },
    { key: { uploadedAt: -1 } },
    { key: { tags: 1 } },
    { key: { title: 'text', description: 'text' } },
  ],
  users: [
    { key: { email: 1 }, unique: true },
    { key: { createdAt: -1 } },
  ],
  petitions: [
    { key: { status: 1 } },
    { key: { createdAt: -1 } },
    { key: { category: 1 } },
  ],
  petition_signatures: [
    { key: { petitionId: 1 } },
    { key: { email: 1 } },
    { key: { signedAt: -1 } },
  ],
  forms: [
    { key: { formType: 1 } },
    { key: { status: 1 } },
    { key: { submittedAt: -1 } },
  ],
  lineage: [
    { key: { generation: 1 } },
    { key: { parentId: 1 } },
    { key: { name: 1 } },
  ],
  investigations: [
    { key: { status: 1 } },
    { key: { category: 1 } },
    { key: { createdAt: -1 } },
  ],
} as const;

