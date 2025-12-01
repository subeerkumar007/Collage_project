# Environment Variables Setup Guide

## Required: Create `.env.local` file

Create a `.env.local` file in the root directory of your project with the following variables:

```env
# MongoDB Connection String
# IMPORTANT: Add database name after the / (e.g., /rushnow)
MONGODB_URI="mongodb+srv://subeerk491_db_user:eEzHDOhwdCYAUmjA@cluster1.p9doqoe.mongodb.net/rushnow?retryWrites=true&w=majority"

# Optional: Database name (if not specified in connection string)
MONGODB_DB_NAME="rushnow"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Important Notes:

1. **MongoDB URI Format**: Your connection string should include the database name:
   - ✅ Correct: `mongodb+srv://...@cluster.mongodb.net/rushnow?retryWrites=true&w=majority`
   - ❌ Wrong: `mongodb+srv://...@cluster.mongodb.net/?retryWrites=true&w=majority`

2. **Generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

3. **After creating `.env.local`**:
   - Restart your Next.js development server
   - The file is automatically ignored by git (already in .gitignore)

## Testing Database Connection

Visit: `http://localhost:3000/api/database`

You should see a JSON response with connection status and database information.

