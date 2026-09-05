import { MongoClient, Collection } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add MONGODB_URI to .env.local");
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://");
  }
  return uri;
}

export function getClientPromise() {
  const uri = getMongoUri();
  const connect = () => new MongoClient(uri, {
    serverSelectionTimeoutMS: 8_000,
    connectTimeoutMS: 8_000,
  }).connect();

  // In development reuse the connection across hot-reloads to avoid exhausting connections
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = connect().catch((error) => {
        // Do not retain a rejected promise: Atlas access may be restored while
        // the development server is still running.
        global._mongoClientPromise = undefined;
        throw error;
      });
    }
    return global._mongoClientPromise;
  }

  return connect();
}

export async function getUsersCollection(): Promise<Collection> {
  const c = await getClientPromise();
  const col = c.db("speakforge").collection("users");
  await col.createIndex({ email: 1 }, { unique: true }).catch(() => {});
  return col;
}
