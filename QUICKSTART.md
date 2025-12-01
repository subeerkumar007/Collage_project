# 🚀 RushNow - Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB Atlas account (already configured)
- Mapbox account token (already configured)

## 🎯 Running the Application

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Socket.IO Server

Open **Terminal 1** and run:

```bash
npm run socket
```

You should see:

```
Socket.IO server listening on http://localhost:4000
```

### Step 3: Start Next.js Development Server

Open **Terminal 2** and run:

```bash
npm run dev
```

You should see:

```
- Local:        http://localhost:3000
```

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## 📦 Testing Order Flow with Socket.IO

1. **Add Products to Cart**

   - Browse products on homepage
   - Click "Add to Cart" on any product
   - Cart icon shows item count

2. **Proceed to Checkout**

   - Click cart icon in navbar
   - Review items in cart sidebar
   - Click "Proceed to Checkout"

3. **Place Order**

   - Choose payment method: Card, UPI, or Cash on Delivery
   - Click "Pay" or place COD order
   - **Order tracking begins immediately**

4. **Watch Real-Time Updates** (Socket.IO in action)

   ```
   ⏱️  0 seconds:  "Order will be delivered soon" - ETA: 10 mins

   ⏱️  4 seconds:  "Order is getting packed" - ETA: 8 mins
                   ✅ Delivery partner assigned (Ramesh Kumar/Priya Sharma)
                   ✅ Partner card shows name, vehicle, phone

   ⏱️  8 seconds:  "Out for delivery" - ETA: 5 mins
                   ✅ Live map appears
                   ✅ Agent marker starts moving
                   ✅ Location updates every 2 seconds

   ⏱️ 20 seconds:  "Delivered" - ETA: 0 mins
                   ✅ Order complete
   ```

## 🔍 Verifying Socket.IO Connection

### Check Browser Console

Press `F12` and look for:

```
Socket.IO client connected to http://localhost:4000
```

### Check Socket Server Terminal

You should see:

```
Socket client connected: <socket-id>
Order start from client <socket-id> { lat: 28.6139, lng: 77.209 }
```

## 🛠️ Available Commands

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start Next.js development server (port 3000) |
| `npm run build`  | Build production bundle                      |
| `npm run start`  | Start production server                      |
| `npm run socket` | Start Socket.IO server (port 4000)           |
| `npm run lint`   | Run ESLint                                   |

## 📂 Key Files

```
RushNow/
├── socket-server.js              ⚡ Socket.IO real-time server
├── src/
│   ├── lib/
│   │   ├── socketClient.ts       🔌 Socket connection manager
│   │   └── delivery.ts           🚚 Agent assignment logic
│   ├── components/
│   │   ├── OrderModal.tsx        📦 Order tracking UI
│   │   ├── OrderMap.tsx          🗺️  Live delivery map
│   │   └── LocationDetector.tsx  📍 GPS location capture
│   └── app/
│       └── cart/page.tsx         🛒 Shopping cart
└── .env.local                    🔐 Environment variables
```

## 🌍 Environment Variables

Your `.env.local` should contain:

```env
# Mapbox (for live tracking map)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoic3ViZWVya3IyMDAzIiwiYSI6ImNtaW5kNzRuOTE2OTUzZXIxdnVldHUzeDQifQ.o3oP4_KL24R6v0vGIVafWQ

# Socket.IO server
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# MongoDB
DATABASE_URL=mongodb+srv://subeerk491_db_user:eEzHDOhwdCYAUmjA@cluster1.p9doqoe.mongodb.net/RushNow?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="+SfOJTU3uqLUJaM9rhVRlqoetO3COlAQP9lL8nroGt8="

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dehccrol4
NEXT_PUBLIC_UPLOAD_PRESET=Images
```

## ✅ Success Indicators

### Socket Server Running

```
✅ Socket.IO server listening on http://localhost:4000
```

### Next.js Running

```
✅ Ready on http://localhost:3000
✅ Compiled successfully
```

### Real-Time Features Working

- ✅ Status updates automatically change
- ✅ ETA countdown decreases
- ✅ Delivery partner info appears
- ✅ Map shows and marker moves
- ✅ No errors in browser console

## ❌ Troubleshooting

### Problem: Socket.IO not connecting

**Solution:**

```bash
# Check if port 4000 is available
netstat -ano | findstr :4000

# Kill process if needed
taskkill /PID <process-id> /F

# Restart Socket server
npm run socket
```

### Problem: Map not loading

**Check:**

- ✅ Mapbox token in `.env.local`
- ✅ Order status is "Out for delivery"
- ✅ Browser console for errors

### Problem: Agent not assigned

**Check:**

- ✅ Socket server terminal shows "Order start from client"
- ✅ Wait at least 4 seconds after placing order
- ✅ Browser console shows "agentAssigned" event

### Problem: Build fails

**Solution:**

```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

## 🎨 Features Showcase

### Instant Delivery Style UI

- ✅ Large ETA display (Zepto/Blinkit inspired)
- ✅ Gradient status cards
- ✅ Delivery partner avatar
- ✅ One-tap call button
- ✅ Live map tracking
- ✅ Delay warnings

### Real-Time Updates via Socket.IO

- ✅ Bidirectional communication
- ✅ Event-driven architecture
- ✅ Automatic reconnection
- ✅ Low latency (~50ms)

### Smart Agent Assignment

- ✅ Haversine distance calculation
- ✅ Nearest available agent
- ✅ Agent details (name, phone, vehicle)

## 📱 Mobile Testing

The app is fully responsive:

```bash
# Find your local IP
ipconfig

# Access from mobile on same network
http://192.168.x.x:3000
```

**Note:** Update Socket URL for mobile testing:

```env
NEXT_PUBLIC_SOCKET_URL=http://192.168.x.x:4000
```

## 🚀 Production Deployment

See [SOCKET_IMPLEMENTATION.md](./SOCKET_IMPLEMENTATION.md) for production setup.

---

**Need Help?** Check the console logs in both terminals for detailed information.

**Ready to order?** Visit http://localhost:3000 and enjoy instant delivery! 🎉
