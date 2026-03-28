/**
 * Static MongoDB Mock for Vercel Deployment
 * Uses JSON files instead of a real MongoDB database
 */

import { COLLECTIONS } from './mongodb-schemas';

// Import static data
import documentsData from '../data/platform-documents.json';
import usersData from '../data/platform-users.json';
import engagementData from '../data/platform-engagement.json';

// Define simple types to satisfy imports
export interface Document {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  uploadedBy?: string;
  uploadedAt?: Date;
  isPublic?: boolean;
  requiresAuthentication?: boolean;
  tags?: string[];
  downloadCount?: number;
  lastDownloadedAt?: Date;
  metadata?: any;
  [key: string]: any;
}

export interface User {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  password?: string;
  image?: string;
  role: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  emailVerified?: boolean;
  profile?: any;
  [key: string]: any;
}

export interface Petition {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  targetSignatures: number;
  currentSignatures: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  category: string;
  signatures?: any[];
  [key: string]: any;
}

export interface FormSubmission {
  _id?: string;
  id?: string;
  formType: string;
  submittedBy: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: string[];
  status: string;
  submittedAt: Date;
  respondedAt?: Date;
  response?: string;
  respondedBy?: string;
  metadata?: Record<string, any>;
  [key: string]: any;
}

export type Db = {
  collection: (name: string) => Collection;
};

export type Collection = {
  name: string;
  data: any[];
  find: (query?: any) => { toArray: () => any[] };
  findOne: (query?: any) => any;
  insertOne: (doc: any) => { insertedId: string };
  updateOne: (query: any, update: any) => { modifiedCount: number };
  deleteOne: (query: any) => { deletedCount: number };
  countDocuments: (query?: any) => Promise<number>;
  createIndex: (key: any, options?: any) => Promise<void>;
};

export type Document = any;

// Mock data storage (in-memory)
const mockData: Record<string, any[]> = {
  [COLLECTIONS.DOCUMENTS]: documentsData.map((doc, idx) => ({ ...doc, _id: doc.id || `doc-${idx}` })),
  [COLLECTIONS.USERS]: usersData.map((user, idx) => ({ ...user, _id: user.id || `user-${idx}` })),
  [COLLECTIONS.COMMUNITY]: engagementData.community || [],
  [COLLECTIONS.PETITIONS]: [],
  [COLLECTIONS.FORMS]: [],
  [COLLECTIONS.LINEAGE]: [],
  [COLLECTIONS.INVESTIGATIONS]: [],
  [COLLECTIONS.SESSIONS]: [],
  [COLLECTIONS.ACCOUNTS]: [],
  [COLLECTIONS.VERIFICATION_TOKENS]: [],
  [COLLECTIONS.HISTORICAL_EVENTS]: [],
  [COLLECTIONS.FRAUD_REPORTS]: [],
  [COLLECTIONS.SOURCES]: [],
  [COLLECTIONS.LEGAL_FRAMEWORKS]: [],
  [COLLECTIONS.RESOURCES]: [],
};

// Create mock collection
function createMockCollection(name: string): Collection {
  return {
    name,
    data: mockData[name] || [],
    find: (query?: any) => {
      let result = this.data;
      if (query) {
        // Simple query matching for exact fields
        Object.keys(query).forEach((key) => {
          if (query[key] !== undefined) {
            result = result.filter((item) => item[key] === query[key]);
          }
        });
      }
      return {
        toArray: () => result,
      };
    },
    findOne: (query?: any) => {
      if (!query) return this.data[0] || null;
      return this.data.find((item) => {
        return Object.keys(query).every((key) => item[key] === query[key]);
      }) || null;
    },
    insertOne: (doc: any) => {
      const newDoc = { ...doc, _id: doc._id || `gen-${Date.now()}` };
      this.data.push(newDoc);
      return { insertedId: newDoc._id };
    },
    updateOne: (query: any, update: any) => {
      const index = this.data.findIndex((item) => {
        return Object.keys(query).every((key) => item[key] === query[key]);
      });
      if (index !== -1) {
        // Apply update (support $set)
        if (update.$set) {
          this.data[index] = { ...this.data[index], ...update.$set };
        }
        return { modifiedCount: 1 };
      }
      return { modifiedCount: 0 };
    },
    deleteOne: (query: any) => {
      const index = this.data.findIndex((item) => {
        return Object.keys(query).every((key) => item[key] === query[key]);
      });
      if (index !== -1) {
        this.data.splice(index, 1);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    },
    countDocuments: async (query?: any) => {
      if (!query) return this.data.length;
      return this.data.filter((item) => {
        return Object.keys(query).every((key) => item[key] === query[key]);
      }).length;
    },
    createIndex: async (key: any, options?: any) => {
      // Mock index creation - no-op
      console.log(`[MockDB] Index created on ${name}: ${JSON.stringify(key)}`);
    },
  };
}

// Create mock database
const mockDb: Db = {
  collection: (name: string) => createMockCollection(name),
};

// Mock client
let cachedDb = mockDb;

/**
 * Connect to database (mock - does nothing)
 */
export async function connectToDatabase() {
  if (cachedDb) {
    return { client: null, db: cachedDb };
  }
  cachedDb = mockDb;
  return { client: null, db: mockDb };
}

/**
 * Get a collection
 */
export async function getCollection<T = any>(collectionName: string): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection<T>(collectionName);
}

/**
 * Close database connection (mock - does nothing)
 */
export async function closeDatabase() {
  console.log('✅ [MockDB] Disconnected');
}

/**
 * Get database instance
 */
export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

/**
 * Health check
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  return true;
}

