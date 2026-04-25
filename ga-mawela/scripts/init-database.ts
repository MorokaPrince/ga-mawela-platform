/**
 * Database Initialization Script
 * Creates SQL Server tables for Ga-Mawela Platform
 */

import { initializeDatabase, closeDatabase } from '../src/lib/mongodb';

async function main() {
  try {
    console.log('🚀 Initializing Ga-Mawela Platform Database...');
    await initializeDatabase();
    console.log('✅ Database initialization completed successfully!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}

main();