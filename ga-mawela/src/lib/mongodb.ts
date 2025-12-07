/**
 * MongoDB Connection Utility
 * Handles database connection and collection initialization
 */

import { MongoClient, Db, Collection, Document } from 'mongodb';
import { COLLECTIONS, INDEXES } from './mongodb-schemas';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'ga-mawela';

// Only check for MONGODB_URI in runtime, not build time
if (typeof window === 'undefined' && !MONGODB_URI) {
  console.warn('MONGODB_URI environment variable not set. Database operations will fail.');
}

/**
 * Connect to MongoDB
 */
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(DB_NAME);

    // Verify connection
    await db.admin().ping();
    console.log('✅ Connected to MongoDB');

    cachedClient = client;
    cachedDb = db;

    // Initialize collections and indexes
    await initializeCollections(db);

    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Initialize collections and create indexes
 */
async function initializeCollections(db: Db) {
  try {
    // Create collections if they don't exist
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map((c) => c.name);

    for (const [key, collectionName] of Object.entries(COLLECTIONS)) {
      if (!existingNames.includes(collectionName)) {
        await db.createCollection(collectionName);
        console.log(`✅ Created collection: ${collectionName}`);
      }
    }

    // Create indexes
    for (const [collectionName, indexList] of Object.entries(INDEXES)) {
      const collection = db.collection(collectionName);
      for (const indexSpec of indexList) {
        try {
          await collection.createIndex(indexSpec.key, {
            unique: (indexSpec as any).unique || false,
          });
        } catch (error) {
          // Index might already exist, which is fine
          console.log(`Index creation note for ${collectionName}:`, (error as Error).message);
        }
      }
    }

    console.log('✅ Collections and indexes initialized');
  } catch (error) {
    console.error('❌ Error initializing collections:', error);
    throw error;
  }
}

/**
 * Get a collection
 */
export async function getCollection<T extends Document = Document>(collectionName: string): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection<T>(collectionName);
}

/**
 * Close database connection
 */
export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log('✅ Disconnected from MongoDB');
  }
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
  try {
    const { db } = await connectToDatabase();
    await db.admin().ping();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

