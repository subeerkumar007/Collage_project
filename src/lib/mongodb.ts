// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

declare global {
  // for dev hot-reload safety
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI missing in .env.local. Please add your MongoDB connection string.");
}

// Extract database name from URI if not provided separately
// Format: mongodb+srv://...@cluster.mongodb.net/database-name?...
function getDatabaseNameFromUri(uriString: string): string | null {
  try {
    const url = new URL(uriString);
    const pathname = url.pathname;
    if (pathname && pathname.length > 1) {
      return pathname.substring(1).split('?')[0]; // Remove leading / and query params
    }
  } catch (e) {
    // If URI parsing fails, try regex
    const match = uriString.match(/mongodb\+srv:\/\/[^/]+\/([^?]+)/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Get database name from env or extract from URI
export const DB_NAME = process.env.MONGODB_DB_NAME || getDatabaseNameFromUri(uri) || "rushnow";

// MongoDB connection options
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "production") {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(c => {
      console.log("[mongo] ✅ Connected successfully (production)");
      return c;
    })
    .catch(err => {
      console.error("[mongo] ❌ Connection error (production):", err);
      throw err;
    });
} else {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(c => {
        console.log("[mongo] ✅ Connected successfully (dev)");
        return c;
      })
      .catch(err => {
        console.error("[mongo] ❌ Connection error (dev):", err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
