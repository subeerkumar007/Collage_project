# Socket.IO Real-Time Order Flow

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Next.js)                            │
│                     http://localhost:3000                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           │ WebSocket Connection
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    SOCKET.IO SERVER                                 │
│                    http://localhost:4000                            │
│                     (socket-server.js)                              │
└─────────────────────────────────────────────────────────────────────┘
```

## Event Flow Sequence

```
┌──────────┐                 ┌──────────────┐                ┌─────────┐
│  Client  │                 │ Socket Server│                │ Delivery│
│ (Browser)│                 │ (Node.js)    │                │  Agent  │
└─────┬────┘                 └──────┬───────┘                └────┬────┘
      │                             │                             │
      │ 1. Place Order              │                             │
      ├────────────────────────────►│                             │
      │ emit('order:start')          │                             │
      │ {lat, lng}                   │                             │
      │                             │                             │
      │ 2. Immediate Confirm        │                             │
      │◄────────────────────────────┤                             │
      │ on('status')                │                             │
      │ "Order received"            │                             │
      │ ETA: 10 mins                │                             │
      │                             │                             │
      │                      [Wait 4 seconds]                     │
      │                             │                             │
      │ 3. Assign Agent             │                             │
      │◄────────────────────────────┤ 3a. Find Nearest           │
      │ on('agentAssigned')         ├────────────────────────────►│
      │ {name, phone, vehicle}      │ Calculate Haversine Distance│
      │                             │◄────────────────────────────┤
      │                             │ Return Agent Details        │
      │ 4. Packing Status           │                             │
      │◄────────────────────────────┤                             │
      │ on('status')                │                             │
      │ "Getting packed"            │                             │
      │ ETA: 8 mins                 │                             │
      │                             │                             │
      │                      [Wait 4 seconds]                     │
      │                             │                             │
      │ 5. Out for Delivery         │                             │
      │◄────────────────────────────┤                             │
      │ on('status')                │                             │
      │ "Out for delivery"          │                             │
      │ ETA: 5 mins                 │                             │
      │                             │                             │
      │ 6. Start Live Tracking      │                             │
      │◄────────────────────────────┤ 6a. Generate Path          │
      │ on('location') [Loop]       ├────────────────────────────►│
      │ {lat, lng}                  │ 10 waypoints               │
      │ Every 2 seconds             │                             │
      │                             │                             │
      │ ├─► Update 1                │                             │
      │ ├─► Update 2                │                             │
      │ ├─► Update 3                │                             │
      │ ├─► ...                     │                             │
      │ └─► Update 10               │                             │
      │                             │                             │
      │ 7. Delivery Complete        │                             │
      │◄────────────────────────────┤                             │
      │ on('status')                │                             │
      │ "Delivered"                 │                             │
      │ ETA: 0 mins                 │                             │
      │                             │                             │
      │ 8. Disconnect               │                             │
      │────────────────────────────►│                             │
      │ Close modal                 │                             │
      │                             │                             │
```

## Data Flow Details

### 1. Order Start Event

```typescript
// Client sends
socket.emit("order:start", {
  lat: 28.6139, // Customer latitude
  lng: 77.209, // Customer longitude
});
```

### 2. Status Update Event

```typescript
// Server sends
socket.emit("status", {
  status: "Your order will be delivered soon",
  etaMinutes: 10,
});
```

### 3. Agent Assignment Event

```typescript
// Server sends
socket.emit("agentAssigned", {
  agent: {
    id: "agent_1",
    name: "Ramesh Kumar",
    phone: "+91 98765 43210",
    vehicle: "Bike",
    vehicleNumber: "DL 3S AB 1234",
    lat: 28.6145,
    lng: 77.215,
  },
});
```

### 4. Location Update Event

```typescript
// Server sends (repeated every 2s)
socket.emit("location", {
  lat: 28.6145,
  lng: 77.215,
});
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                       OrderModal.tsx                        │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                  State Management                     │ │
│  │  - status: string                                     │ │
│  │  - estimatedMins: number                              │ │
│  │  - deliveryPartner: DeliveryAgent | null              │ │
│  │  - agentPosition: {lat, lng} | null                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                           │                                 │
│                           ▼                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Socket Event Listeners                   │ │
│  │  socket.on('status', handleStatus)                    │ │
│  │  socket.on('agentAssigned', handleAgentAssigned)      │ │
│  │  socket.on('location', handleLocation)                │ │
│  └───────────────────────────────────────────────────────┘ │
│                           │                                 │
│                           ▼                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                  UI Components                        │ │
│  │  - ETA Display (estimatedMins)                        │ │
│  │  - Status Card (status)                               │ │
│  │  - Agent Card (deliveryPartner)                       │ │
│  │  - Live Map (agentPosition) ────────┐                 │ │
│  └──────────────────────────────────────┼────────────────┘ │
└─────────────────────────────────────────┼──────────────────┘
                                          │
                                          ▼
                        ┌─────────────────────────────────┐
                        │       OrderMap.tsx              │
                        │  ┌───────────────────────────┐  │
                        │  │   Mapbox GL Map           │  │
                        │  │   - Marker Updates        │  │
                        │  │   - Camera Panning        │  │
                        │  │   - Smooth Animation      │  │
                        │  └───────────────────────────┘  │
                        └─────────────────────────────────┘
```

## State Machine

```
┌──────────────┐
│  NOT_ORDERED │
└──────┬───────┘
       │ Place Order
       │ emit('order:start')
       ▼
┌──────────────────────┐
│  ORDER_RECEIVED      │ ◄─── on('status')
│  ETA: 10 mins        │      "Order will be delivered soon"
└──────┬───────────────┘
       │ 4 seconds
       │
       ▼
┌──────────────────────┐
│  GETTING_PACKED      │ ◄─── on('status') + on('agentAssigned')
│  ETA: 8 mins         │      "Getting packed"
│  Agent: Ramesh Kumar │      + Agent Details
└──────┬───────────────┘
       │ 4 seconds
       │
       ▼
┌──────────────────────┐
│  OUT_FOR_DELIVERY    │ ◄─── on('status') + on('location')
│  ETA: 5 mins         │      "Out for delivery"
│  Live Tracking ON    │      + Location updates every 2s
└──────┬───────────────┘
       │ ~12 seconds (10 location updates)
       │
       ▼
┌──────────────────────┐
│  DELIVERED           │ ◄─── on('status')
│  ETA: 0 mins         │      "Delivered"
│  Order Complete      │
└──────────────────────┘
```

## File Responsibilities

### Client Side

**`src/lib/socketClient.ts`**

- Singleton Socket.IO client instance
- Handles connection to server
- WebSocket transport configuration

**`src/components/OrderModal.tsx`**

- Main order UI component
- Socket event subscriptions
- State management for order flow
- Payment integration

**`src/components/OrderMap.tsx`**

- Mapbox GL integration
- Marker updates from live position
- Camera animation and panning

**`src/lib/delivery.ts`**

- Agent data structure
- Distance calculation (Haversine)
- Agent assignment logic

### Server Side

**`socket-server.js`**

- Socket.IO server setup
- Event handlers (order:start)
- Agent selection algorithm
- Path generation for live tracking
- Timer-based status transitions

## Performance Optimizations

### Client Side

```typescript
// Lazy socket initialization
const socket = useMemo(() => {
  if (typeof window === "undefined") return null;
  return getSocket();
}, []);

// Dynamic map import (no SSR)
const MapboxMap = dynamic(() => import("./OrderMap"), { ssr: false });

// Event cleanup on unmount
useEffect(() => {
  return () => {
    socket.off("status", handleStatus);
    socket.off("agentAssigned", handleAgentAssigned);
    socket.off("location", handleLocation);
  };
}, [socket]);
```

### Server Side

```javascript
// Cleanup on disconnect
socket.on("disconnect", () => {
  if (locationInterval) clearInterval(locationInterval);
  timeouts.forEach(clearTimeout);
});
```

## Security Considerations

### Current (Development)

- CORS: Allow all origins (`*`)
- No authentication on Socket events
- Demo agent data (not persisted)

### Production Recommendations

```javascript
// 1. Restrict CORS
const io = new Server(4000, {
  cors: {
    origin: "https://yourdomain.com",
    credentials: true,
  },
});

// 2. Add authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (isValid(token)) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

// 3. Rate limiting
// 4. Input validation
// 5. Secure agent data in database
```

---

**This diagram shows the complete Socket.IO implementation for real-time order tracking in RushNow.**
