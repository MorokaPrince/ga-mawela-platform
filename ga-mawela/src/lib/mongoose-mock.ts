// Minimal mock for mongoose to satisfy imports for static deployment

// Schema class
class Schema {
  constructor(public definition: any) {}
  static Types = { ObjectId: { fromHexString: (s: string) => s } };
}

// Model cache for mongoose.models
const modelCache: Record<string, any> = {};

// Model function
function model(name: string, schema?: any, collectionName?: string): any {
  // Return cached model if exists
  if (modelCache[name]) {
    return modelCache[name];
  }

  // Create a mock model with common methods
  const mockModel = {
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

  // Cache the model
  modelCache[name] = mockModel;
  return mockModel;
}

// Document dummy value for runtime
const Document = {};

// Connection object
const connection = { readyState: 1 };

// Connect function
async function connect(uri?: string, options?: any): Promise<typeof connection> {
  console.log('[MockDB] mongoose.connect called with', uri);
  return connection;
}

// Disconnect function
async function disconnect(): Promise<void> {
  console.log('[MockDB] mongoose.disconnect called');
}

// Default export with models property
const mongooseMock = {
  Schema,
  model,
  get models() { return modelCache; },
  Document,
  connect,
  disconnect,
  connection,
};

// Named exports
export { Schema, model, Document, connect, disconnect, connection };
// Default export
export default mongooseMock;
