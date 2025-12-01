// app/api/database/route.ts
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // Test Prisma connection by querying user count
    const userCount = await prisma.user.count();
    
    // Get database info
    const dbUrl = process.env.DATABASE_URL || "";
    const dbName = dbUrl.split("/").pop()?.split("?")[0] || "unknown";
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Prisma connection successful",
        database: dbName,
        orm: "Prisma",
        stats: {
          userCount,
        },
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
    
    if (err.message?.includes("DATABASE_URL")) {
      errorType = "Configuration Error";
      errorMessage = "DATABASE_URL is missing in .env.local file. Please add your MongoDB connection string.";
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
