// Minimal mock for mongoose to satisfy imports for static deployment
export class Schema {
  constructor(public definition: any) {}
  static Types = { ObjectId: { fromHexString: (s: string) => s } };
}

export function model<T>(name: string, schema: any, collectionName?: string): any {
  // Return a mock model with common methods
  return {
    find: (query?: any) => ({
      sort: () => ({ toArray: () => Promise.resolve([]) }),
      limit: () => ({ toArray: () => Promise.resolve([]) }),
    }),
    findOne: (query?: any) => null,
    findById: (id: any) => null,
    create: (doc: any) => Promise.resolve({ ...doc, _id: 'mock-id' }),
    updateOne: (query: any, update: any) => ({ modifiedCount: 0 }),
    deleteOne: (query: any) => ({ deletedCount: 0 }),
    countDocuments: (query?: any) => Promise.resolve(0),
    aggregate: (pipeline: any[]) => ({ toArray: () => Promise.resolve([]) }),
    insertMany: (docs: any[]) => Promise.resolve({ insertedCount: docs.length }),
  };
}

export interface Document { _id?: string; [key: string]: any }
// Dummy value for runtime usage
export const Document = {};

export const connection = { readyState: 1 };

export async function connect(uri?: string, options?: any): Promise<typeof connection> {
  console.log('[MockDB] mongoose.connect called with', uri);
  return connection;
}

export async function disconnect(): Promise<void> {
  console.log('[MockDB] mongoose.disconnect called');
}

export default { Schema, model, Document, connect, disconnect, connection };
