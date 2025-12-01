// app/api/database/route.ts
import clientPromise, { DB_NAME } from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    
    // Use database name from mongodb.ts
    const db = client.db(DB_NAME);
    
    // Test connection with ping
    const pingResult = await db.command({ ping: 1 });
    
    // Get database stats
    const stats = await db.stats();
    
    // List collections
    const collections = await db.listCollections().toArray();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Database connection successful",
        database: DB_NAME,
        ping: pingResult,
        stats: {
          collections: stats.collections,
          dataSize: stats.dataSize,
          storageSize: stats.storageSize,
        },
        collections: collections.map((c) => c.name),
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("[api/database] ❌ Error:", err);
    
    // Provide helpful error messages
    let errorMessage = err.message || String(err);
    let errorType = "Unknown Error";
    
    if (err.message?.includes("MONGODB_URI")) {
      errorType = "Configuration Error";
      errorMessage = "MONGODB_URI is missing in .env.local file. Please add your MongoDB connection string.";
    } else if (err.message?.includes("authentication failed")) {
      errorType = "Authentication Error";
      errorMessage = "MongoDB authentication failed. Please check your username and password in the connection string.";
    } else if (err.message?.includes("ENOTFOUND") || err.message?.includes("getaddrinfo")) {
      errorType = "Network Error";
      errorMessage = "Cannot reach MongoDB server. Please check your internet connection and MongoDB cluster status.";
    } else if (err.message?.includes("timeout")) {
      errorType = "Timeout Error";
      errorMessage = "Connection to MongoDB timed out. Please check your connection string and network.";
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        errorType: errorType,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
