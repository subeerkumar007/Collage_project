# 🚀 Socket.IO Quick Reference Card

## ⚡ Start Commands

```bash
# Terminal 1 - Socket Server
npm run socket

# Terminal 2 - Next.js App
npm run dev

# Build for Production
npm run build
```

---

## 🔌 Socket.IO Events

### Client Emits

```typescript
socket.emit("order:start", { lat: number, lng: number });
```

### Client Listens

```typescript
socket.on('status', ({ status, etaMinutes }) => { ... })
socket.on('agentAssigned', ({ agent }) => { ... })
socket.on('location', ({ lat, lng }) => { ... })
```

---

## ⏱️ Order Timeline

| Time | Status           | ETA    | Features       |
| ---- | ---------------- | ------ | -------------- |
| 0s   | Order Received   | 10 min | Confirmation   |
| 4s   | Getting Packed   | 8 min  | Agent Assigned |
| 8s   | Out for Delivery | 5 min  | Live Map       |
| 20s  | Delivered        | 0 min  | Complete       |

---

## 📂 Key Files

```
socket-server.js              # Socket server (port 4000)
src/lib/socketClient.ts       # Connection manager
src/components/OrderModal.tsx # Order UI
src/components/OrderMap.tsx   # Live tracking
.env.local                    # Config
```

---

## 🌍 Environment Variables

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoic3...
DATABASE_URL=mongodb+srv://...
```

---

## 🎯 Quick Test

1. Open http://localhost:3000
2. Add product to cart
3. Click checkout
4. Choose payment method
5. Watch real-time updates!

---

## 🐛 Troubleshooting

| Problem               | Solution                                 |
| --------------------- | ---------------------------------------- |
| Socket not connecting | Run `npm run socket`                     |
| Map not showing       | Check Mapbox token                       |
| Build fails           | Run `npm install`                        |
| Port 4000 busy        | Kill process: `taskkill /F /IM node.exe` |

---

## 📊 Status

✅ Build: **PASSING**  
✅ Types: **VALID**  
✅ Errors: **NONE**  
✅ Status: **READY**

---

## 📚 Documentation

- **SOCKET_IMPLEMENTATION.md** - Full technical docs
- **QUICKSTART.md** - Getting started guide
- **SOCKET_FLOW.md** - Visual diagrams
- **SOCKET_SUMMARY.md** - Complete summary

---

## 🎉 Features

- ✅ Real-time order tracking
- ✅ Live map updates
- ✅ Agent assignment
- ✅ ETA countdown
- ✅ Professional UI
- ✅ Mobile responsive

---

**Ready to go! 🚀**
