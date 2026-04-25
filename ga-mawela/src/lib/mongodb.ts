/**
 * SQL Server Database Connection for Ga-Mawela Platform
 * Connects to local SQL Server database
 */

import sql from 'mssql';
import { COLLECTIONS } from './mongodb-schemas';

// SQL Server connection configuration
const sqlConfig: sql.config = {
  server: process.env.DB_SERVER || 'DESKTOP-48MI1BR',
  database: process.env.DB_NAME || 'ga_mawela_platform',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false, // Set to true for Azure
    trustServerCertificate: true, // Set to false for production
    enableArithAbort: true,
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Connection pool
let pool: sql.ConnectionPool | null = null;

// Define types to satisfy imports (keeping MongoDB interface for compatibility)
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

// SQL Server compatible types
export type Db = {
  collection: (name: string) => Collection;
};

export type Collection = {
  name: string;
  find: (query?: any) => { toArray: () => Promise<any[]> };
  findOne: (query?: any) => Promise<any>;
  insertOne: (doc: any) => Promise<{ insertedId: string }>;
  updateOne: (query: any, update: any) => Promise<{ modifiedCount: number }>;
  deleteOne: (query: any) => Promise<{ deletedCount: number }>;
  countDocuments: (query?: any) => Promise<number>;
  createIndex: (key: any, options?: any) => Promise<void>;
};

// SQL Server table operations
function buildWhereClause(query: any): { whereClause: string; parameters: any[] } {
  if (!query || Object.keys(query).length === 0) {
    return { whereClause: '', parameters: [] };
  }

  const conditions: string[] = [];
  const parameters: any[] = [];

  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) {
      conditions.push(`${key} = @param${index}`);
      parameters.push({ name: `param${index}`, value });
    }
  });

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    parameters
  };
}

function createSqlCollection(tableName: string): Collection {
  return {
    name: tableName,

    find: async (query?: any) => {
      const { whereClause, parameters } = buildWhereClause(query);
      const sqlQuery = `SELECT * FROM ${tableName} ${whereClause}`;

      return {
        toArray: async () => {
          if (!pool) await connectToDatabase();
          const request = pool!.request();
          parameters.forEach(param => request.input(param.name, param.value));
          const result = await request.query(sqlQuery);
          return result.recordset;
        }
      };
    },

    findOne: async (query?: any) => {
      const { whereClause, parameters } = buildWhereClause(query);
      const sqlQuery = `SELECT TOP 1 * FROM ${tableName} ${whereClause}`;

      if (!pool) await connectToDatabase();
      const request = pool!.request();
      parameters.forEach(param => request.input(param.name, param.value));
      const result = await request.query(sqlQuery);
      return result.recordset[0] || null;
    },

    insertOne: async (doc: any) => {
      const columns = Object.keys(doc).join(', ');
      const placeholders = Object.keys(doc).map((_, i) => `@param${i}`).join(', ');
      const sqlQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}); SELECT SCOPE_IDENTITY() as id;`;

      if (!pool) await connectToDatabase();
      const request = pool!.request();

      Object.entries(doc).forEach(([key, value], index) => {
        request.input(`param${index}`, value);
      });

      const result = await request.query(sqlQuery);
      const insertedId = result.recordset[0]?.id || `gen-${Date.now()}`;
      return { insertedId: insertedId.toString() };
    },

    updateOne: async (query: any, update: any) => {
      const { whereClause: findWhereClause, parameters: findParams } = buildWhereClause(query);

      let updateClause = '';
      const updateParams: any[] = [];

      if (update.$set) {
        const setParts: string[] = [];
        Object.entries(update.$set).forEach(([key, value], index) => {
          setParts.push(`${key} = @setParam${index}`);
          updateParams.push({ name: `setParam${index}`, value });
        });
        updateClause = setParts.join(', ');
      }

      const sqlQuery = `UPDATE ${tableName} SET ${updateClause} ${findWhereClause}`;

      if (!pool) await connectToDatabase();
      const request = pool!.request();

      findParams.forEach(param => request.input(param.name, param.value));
      updateParams.forEach(param => request.input(param.name, param.value));

      const result = await request.query(sqlQuery);
      return { modifiedCount: result.rowsAffected[0] };
    },

    deleteOne: async (query: any) => {
      const { whereClause, parameters } = buildWhereClause(query);
      const sqlQuery = `DELETE FROM ${tableName} ${whereClause}`;

      if (!pool) await connectToDatabase();
      const request = pool!.request();
      parameters.forEach(param => request.input(param.name, param.value));

      const result = await request.query(sqlQuery);
      return { deletedCount: result.rowsAffected[0] };
    },

    countDocuments: async (query?: any) => {
      const { whereClause, parameters } = buildWhereClause(query);
      const sqlQuery = `SELECT COUNT(*) as count FROM ${tableName} ${whereClause}`;

      if (!pool) await connectToDatabase();
      const request = pool!.request();
      parameters.forEach(param => request.input(param.name, param.value));

      const result = await request.query(sqlQuery);
      return result.recordset[0]?.count || 0;
    },

    createIndex: async (key: any, options?: any) => {
      // SQL Server indexes are created at schema level, not runtime
      console.log(`[SQL Server] Index creation requested for ${tableName}:`, key);
    },
  };
}

/**
 * Connect to SQL Server database
 */
export async function connectToDatabase() {
  try {
    if (!pool) {
      pool = await sql.connect(sqlConfig);
      console.log('✅ [SQL Server] Connected to database');
    }

    const db: Db = {
      collection: (name: string) => createSqlCollection(name),
    };

    return { client: pool, db };
  } catch (error) {
    console.error('❌ [SQL Server] Connection failed:', error);
    throw error;
  }
}

/**
 * Get a collection (table)
 */
export async function getCollection<T = any>(tableName: string): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection(tableName) as Collection<T>;
}

/**
 * Close database connection
 */
export async function closeDatabase() {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('✅ [SQL Server] Disconnected');
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
    if (!pool) await connectToDatabase();
    await pool!.request().query('SELECT 1');
    return true;
  } catch (error) {
    console.error('❌ [SQL Server] Health check failed:', error);
    return false;
  }
}

/**
 * Initialize database tables (run this once to create schema)
 */
export async function initializeDatabase() {
  try {
    if (!pool) await connectToDatabase();

    const tables = [
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='documents' AND xtype='U')
       CREATE TABLE documents (
         id INT IDENTITY(1,1) PRIMARY KEY,
         title NVARCHAR(255) NOT NULL,
         description NVARCHAR(MAX),
         category NVARCHAR(50),
         fileUrl NVARCHAR(500),
         fileName NVARCHAR(255),
         fileSize BIGINT,
         fileType NVARCHAR(100),
         uploadedBy NVARCHAR(255),
         uploadedAt DATETIME DEFAULT GETDATE(),
         isPublic BIT DEFAULT 1,
         requiresAuthentication BIT DEFAULT 0,
         tags NVARCHAR(MAX),
         downloadCount INT DEFAULT 0,
         lastDownloadedAt DATETIME,
         metadata NVARCHAR(MAX)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
       CREATE TABLE users (
         id INT IDENTITY(1,1) PRIMARY KEY,
         email NVARCHAR(255) UNIQUE NOT NULL,
         name NVARCHAR(255) NOT NULL,
         password NVARCHAR(255),
         image NVARCHAR(500),
         role NVARCHAR(50) DEFAULT 'member',
         status NVARCHAR(50) DEFAULT 'active',
         createdAt DATETIME DEFAULT GETDATE(),
         updatedAt DATETIME DEFAULT GETDATE(),
         lastLogin DATETIME,
         emailVerified BIT DEFAULT 0,
         profile NVARCHAR(MAX)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='forms' AND xtype='U')
       CREATE TABLE forms (
         id INT IDENTITY(1,1) PRIMARY KEY,
         formType NVARCHAR(50) NOT NULL,
         submittedBy NVARCHAR(255),
         email NVARCHAR(255) NOT NULL,
         phone NVARCHAR(50),
         subject NVARCHAR(500),
         message NVARCHAR(MAX),
         attachments NVARCHAR(MAX),
         status NVARCHAR(50) DEFAULT 'new',
         submittedAt DATETIME DEFAULT GETDATE(),
         respondedAt DATETIME,
         response NVARCHAR(MAX),
         respondedBy NVARCHAR(255),
         metadata NVARCHAR(MAX)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='petitions' AND xtype='U')
       CREATE TABLE petitions (
         id INT IDENTITY(1,1) PRIMARY KEY,
         title NVARCHAR(255) NOT NULL,
         description NVARCHAR(MAX),
         targetSignatures INT DEFAULT 0,
         currentSignatures INT DEFAULT 0,
         status NVARCHAR(50) DEFAULT 'active',
         createdAt DATETIME DEFAULT GETDATE(),
         updatedAt DATETIME DEFAULT GETDATE(),
         expiresAt DATETIME,
         category NVARCHAR(100)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='lineage' AND xtype='U')
       CREATE TABLE lineage (
         id INT IDENTITY(1,1) PRIMARY KEY,
         name NVARCHAR(255) NOT NULL,
         generation INT,
         parentId INT,
         spouse NVARCHAR(255),
         birthDate DATE,
         deathDate DATE,
         birthPlace NVARCHAR(255),
         notes NVARCHAR(MAX),
         imageUrl NVARCHAR(500),
         createdAt DATETIME DEFAULT GETDATE(),
         updatedAt DATETIME DEFAULT GETDATE(),
         verifiedBy NVARCHAR(255),
         sources NVARCHAR(MAX)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='investigations' AND xtype='U')
       CREATE TABLE investigations (
         id INT IDENTITY(1,1) PRIMARY KEY,
         title NVARCHAR(255) NOT NULL,
         description NVARCHAR(MAX),
         status NVARCHAR(50) DEFAULT 'ongoing',
         category NVARCHAR(100),
         findings NVARCHAR(MAX),
         evidence NVARCHAR(MAX),
         createdAt DATETIME DEFAULT GETDATE(),
         updatedAt DATETIME DEFAULT GETDATE(),
         createdBy NVARCHAR(255),
         lastUpdatedBy NVARCHAR(255),
         relatedDocuments NVARCHAR(MAX),
         tags NVARCHAR(MAX)
       )`,

      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='community' AND xtype='U')
       CREATE TABLE community (
         id INT IDENTITY(1,1) PRIMARY KEY,
         category NVARCHAR(100),
         title NVARCHAR(255),
         content NVARCHAR(MAX),
         author NVARCHAR(255),
         createdAt DATETIME DEFAULT GETDATE(),
         updatedAt DATETIME DEFAULT GETDATE(),
         tags NVARCHAR(MAX)
       )`
    ];

    for (const tableSql of tables) {
      await pool!.request().query(tableSql);
    }

    console.log('✅ [SQL Server] Database tables initialized');
  } catch (error) {
    console.error('❌ [SQL Server] Failed to initialize database:', error);
    throw error;
  }
}

