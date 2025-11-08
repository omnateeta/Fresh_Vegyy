# FreshVeggie Platform Architecture

## System Overview

FreshVeggie delivers a 10-minute vegetable shopping experience using a tri-application ecosystem:

- Shopper mobile app (`mobile-app/`) built with React Native (Expo) for consumers.
- Rider mobile app (`delivery-app/`) enabling delivery partners to manage assignments in real time.
- Backend API (`backend/`) powered by Express, MongoDB, and Socket.IO for data, business logic, and realtime updates.

### High-Level Flow

1. Users browse inventory, add items to cart, and submit orders.
2. Backend reserves stock, creates orders, and pushes events to user and rider sockets.
3. Admins assign riders; riders track assignments on the delivery app.
4. Realtime updates propagate via Socket.IO to both user tracker and rider dashboards.

## Components

### Backend

- **API Gateway**: Express routes for auth, products, orders, delivery, admin analytics, and notifications.
- **Data Layer**: MongoDB models (Users, Products, Orders, Offers, DeliveryPartners, InventorySnapshot).
- **Real-time Hub**: Socket.IO namespace channels for users (`user:{id}`), orders (`order:{id}`), and riders (`delivery:{id}`).
- **Services**: Encapsulated logic for inventory, orders, delivery, analytics, auth, notifications, recommendations.
- **Middleware**: JWT auth, validation, and error handler.
- **Workers**: Placeholder background job for future optimization.

### Shopper Mobile App

- Built with Expo (React Native) and TypeScript.
- Uses Zustand + Context for auth/session and cart state.
- `axios` client with auth interceptors and environment-driven base URLs.
- Navigation: Native stack + bottom tabs.
- Feature screens: Login, Home (seasonal CTA, product list), Product Detail, Cart, Checkout, Order Tracking (map + sockets), Profile.
- Hooks: Custom Socket hook, theme provider, etc.

### Rider Mobile App

- Expo/React Native TypeScript app tailored for delivery partners.
- Rider context + token management updates centralized API client header.
- Screens: Login, Orders list (availability toggle + GPS capture), Order detail (map preview, status actions).
- Reuses Socket.IO for assignment events.

## Data Model Highlights

- **Users**: hashed passwords, multiple addresses, preference tracking, multi-role (user/admin/delivery).
- **Products**: seasonal tags, freshness score, rating stub, stock levels.
- **Orders**: event history, payment metadata, delivery ETA, live geolocation, assignment reference.
- **Delivery Partners**: online status, performance stats, GPS location.
- **Offers**: coupon scaffolding for future marketing integrations.

## Real-time Strategy

- Shopper app joins `order:{orderId}` for live location and status updates; also `user:{userId}` for notifications.
- Rider app joins `delivery:{partnerId}` to receive assignments.
- Backend emits events when orders created, assigned, status/location updated.

## Deployment Considerations

- Use Yarn workspaces for dependency deduplication and consistent lint/test commands.
- Backend: Host on AWS ECS/Fargate or Render, connect to managed MongoDB (Atlas).
- Mobile: Distribute via Expo EAS, configure environment-specific API and socket URLs.
- Notifications: FCM server key to be set at runtime; placeholder service logs dispatch events.
- Payments: Integrate Razorpay/Stripe SDKs where indicated in services layer.

## Future Enhancements

- Farmer module, subscription flows, AI chatbot, eco-packaging tracking, and offline caching.
- Dedicated admin web dashboard could be added as a web workspace.
- Real-time route optimization via Google Maps Directions API and dispatch engine.


