# Socket.IO Real-Time Order Tracking Implementation

## Overview

This project now includes **Socket.IO** for real-time order tracking with live delivery updates, agent assignment, and map tracking.

## Architecture

### Client Side (Next.js)

- **Socket Client**: `src/lib/socketClient.ts` - Singleton Socket.IO client
- **Order Modal**: `src/components/OrderModal.tsx` - Handles order flow with real-time updates
- **Order Map**: `src/components/OrderMap.tsx` - Mapbox integration for live tracking
- **Delivery Logic**: `src/lib/delivery.ts` - Agent assignment utilities

### Server Side

- **Socket Server**: `socket-server.js` - Standalone Node.js server on port 4000

## Features Implemented

### ✅ Real-Time Order Status Updates

- **Order Received** → Immediate confirmation
- **Getting Packed** (4 seconds) → Delivery agent assigned
- **Out for Delivery** (8 seconds) → Live map tracking begins
- **Delivered** → Final status after agent reaches customer

### ✅ Live Agent Tracking

- Real-time location updates every 2 seconds
- Mapbox marker animation showing agent movement
- Automatic path generation from agent location to customer
- Smooth map panning following the delivery agent

### ✅ Agent Assignment

- Nearest available agent selection using Haversine distance formula
- Agent details: name, phone, vehicle type, vehicle number
- Direct call-to-action button for contacting delivery partner

### ✅ Customer Location

- Integration with `LocationDetector` component
- Reads saved coordinates from localStorage
- Fallback to default New Delhi coordinates if not available

## Socket.IO Events

### Client → Server

```javascript
// Start order tracking with customer coordinates
socket.emit("order:start", { lat: 28.6139, lng: 77.209 });
```

### Server → Client

```javascript
// 1. Status updates with ETA
socket.on("status", (payload) => {
  // payload: { status: string, etaMinutes: number }
});

// 2. Agent assignment notification
socket.on("agentAssigned", (payload) => {
  // payload: { agent: DeliveryAgent }
});

// 3. Live location updates (during delivery)
socket.on("location", (payload) => {
  // payload: { lat: number, lng: number }
});
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs:

- `socket.io@4.8.1` (server)
- `socket.io-client@4.8.1` (client)

### 2. Environment Configuration

Add to `.env.local`:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 3. Run the Application

**Terminal 1 - Socket.IO Server:**

```bash
npm run socket
```

This starts the Socket.IO server on `http://localhost:4000`

**Terminal 2 - Next.js App:**

```bash
npm run dev
```

This starts the Next.js app on `http://localhost:3000`

## File Structure

```
RushNow/
├── socket-server.js              # Socket.IO server
├── src/
│   ├── lib/
│   │   ├── socketClient.ts       # Client-side Socket.IO connection
│   │   └── delivery.ts           # Agent assignment logic
│   ├── components/
│   │   ├── OrderModal.tsx        # Order tracking UI
│   │   ├── OrderMap.tsx          # Mapbox live tracking
│   │   └── LocationDetector.tsx  # Customer location detection
│   └── context/
│       └── CartContext.tsx       # Shopping cart state
└── .env.local                    # Environment variables
```

## Demo Delivery Agents

The system includes 2 demo agents:

### Agent 1: Ramesh Kumar

- Phone: +91 98765 43210
- Vehicle: Bike (DL 3S AB 1234)
- Location: 28.6145, 77.215

### Agent 2: Priya Sharma

- Phone: +91 98765 67890
- Vehicle: Scooter (DL 8C CD 5678)
- Location: 28.62, 77.225

## Order Flow Timeline

```
0s   → Order Placed
       ↓ (Socket: order:start)

4s   → Status: "Getting Packed"
       ↓ (Socket: status + agentAssigned)
       - Agent assigned (nearest available)
       - ETA: 8 mins

8s   → Status: "Out for Delivery"
       ↓ (Socket: status + location updates every 2s)
       - Map tracking begins
       - ETA: 5 mins
       - Live marker movement

20s  → Status: "Delivered"
       ↓ (Socket: status)
       - Order complete
       - ETA: 0 mins
```

## UI Components

### Order Modal States

#### Pre-Order (Payment Selection)

- Order summary with items
- Payment method selection (Card/UPI/COD)
- Total calculation with delivery fee

#### Post-Order (Tracking)

- **ETA Display**: Large purple countdown
- **Status Card**: Gradient card with status message
- **Delay Warning**: Conditional yellow banner
- **Agent Info**: Card with avatar, name, vehicle, call button
- **Live Map**: Mapbox with animated marker (during delivery)

### Real-Time Updates

All updates are pushed via Socket.IO:

- Status text changes automatically
- ETA countdown updates
- Agent details populate when assigned
- Map marker moves with live location data

## Production Deployment

### Socket Server Deployment

Deploy `socket-server.js` to a Node.js hosting service:

- Heroku
- Railway
- DigitalOcean
- AWS EC2

Update `.env.local`:

```env
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

### CORS Configuration

The Socket server allows all origins by default. For production, update `socket-server.js`:

```javascript
const io = new Server(4000, {
  cors: {
    origin: "https://your-nextjs-app.com",
    methods: ["GET", "POST"],
  },
});
```

## Troubleshooting

### Issue: Socket not connecting

**Solution**: Ensure Socket server is running on port 4000

```bash
npm run socket
```

### Issue: Map not showing

**Solution**: Check `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`

### Issue: Agent position not updating

**Solution**:

1. Check browser console for Socket.IO connection errors
2. Verify Socket server logs show "Order start from client"
3. Ensure order status reaches "Out for delivery"

### Issue: Build fails with module not found

**Solution**: Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

### Suggested Features

- [ ] Real-time ETA countdown (decrement every minute)
- [ ] Order history with tracking replay
- [ ] Multiple simultaneous order tracking
- [ ] Push notifications for status changes
- [ ] Agent rating system
- [ ] Real GPS integration (replace demo coordinates)
- [ ] WebSocket fallback for older browsers
- [ ] Delivery photo upload on completion

## Code Quality

✅ TypeScript strict mode enabled
✅ No build errors
✅ Client-side rendering for Socket components
✅ Proper cleanup on unmount
✅ Error handling for missing tokens
✅ Fallback values for coordinates

## Testing

### Manual Testing Steps

1. Add items to cart
2. Click "Proceed to Checkout"
3. Select payment method (or COD)
4. Click "Pay" or "Cash on Delivery"
5. Observe status changes:
   - Immediate: "Order will be delivered soon" (10 mins)
   - 4s later: "Getting packed" (8 mins) + Agent card appears
   - 8s later: "Out for delivery" (5 mins) + Map appears
   - Watch marker move on map
   - ~20s total: "Delivered" (0 mins)

### Expected Results

- ✅ Status updates automatically
- ✅ ETA countdown changes
- ✅ Agent details populate
- ✅ Map shows and marker animates
- ✅ Cart clears after order
- ✅ No console errors

## Notes

- Socket connection is lazy-loaded (only when modal opens)
- Map is dynamically imported (SSR disabled)
- Location permissions are optional (has fallback)
- Agent assignment is simulated (not persistent in DB)
- Payment processing is simulated (no real gateway)

---

**Built with**: Next.js 14, Socket.IO 4.8, Mapbox GL, TypeScript, Tailwind CSS
