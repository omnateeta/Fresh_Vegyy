## FreshVeggie Platform Overview 

FreshVeggie is a real-time vegetable shopping platform that connects urban customers with fresh local produce. The system consists of three main components:

- Mobile shopper app (`mobile-app/`)
- Delivery partner app (`delivery-app/`)
- Backend API and real-time services (`backend/`)

Key capabilities include 10-minute delivery tracking, dynamic inventory updates, AI-based recommendations, and multi-channel payment processing.

### Repository Structure

- `backend/` – Express/TypeScript API, Socket.IO real-time gateway, MongoDB data layer, background workers, and admin tooling
- `mobile-app/` – React Native (Expo) shopper application with FCM notifications, Razorpay integration placeholder, and AI recommendation UI
- `delivery-app/` – React Native (Expo) delivery partner application with route guidance and job management
- `infrastructure/` – Deployment manifests, environment examples, and architecture diagrams
- `docs/` – Product requirement docs, API schemas, and state diagrams

### Core Features

- Real-time inventory sync with stock reservations
- Smart homepage with seasonal trends and personalized suggestions
- 10-minute delivery tracker powered by live geolocation updates
- Unified payment service abstraction supporting Razorpay/Stripe/COD
- Admin dashboard APIs for catalog, offers, coupons, and analytics
- Delivery partner assignment, routing, and performance metrics

### Getting Started

Prerequisites:

1. Node.js 18+
2. Yarn 1.22+
3. MongoDB 6+
4. Expo CLI (`npm install -g expo`)

Setup:

```bash
cp backend/.env.example backend/.env
yarn install --immutable
```

Run services locally:

```bash
# backend API + socket server
cd backend
yarn dev

# shopper mobile app
cd ../mobile-app
yarn start

# delivery partner app
cd ../delivery-app
yarn start
```

Testing:

```bash
cd backend
yarn test
```

See `docs/architecture.md` for high-level architecture, data flow, and deployment guidance.


