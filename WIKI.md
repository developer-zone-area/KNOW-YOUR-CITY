# 📚 Know Your City - Project Wiki

> **Complete Documentation and Reference Guide**

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Components Reference](#components-reference)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [Map Features](#map-features)
10. [Deployment Guide](#deployment-guide)
11. [Development Guide](#development-guide)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)
14. [Contributing](#contributing)

---

## 🌐 Project Overview

### What is Know Your City?

Know Your City is a comprehensive MERN (MongoDB, Express, React, Node.js) stack application designed to help users discover and explore cities and places around the world. The platform features a robust admin management system, user authentication, reviews, ratings, and interactive map integration.

### Key Statistics

| Metric | Value |
|--------|-------|
| **Cities** | 18+ |
| **Places** | 49+ |
| **Technologies** | 15+ |
| **API Endpoints** | 20+ |
| **Components** | 30+ |
| **Status** | Production Ready ✅ |

### Live Deployment

- **🌐 Frontend:** [https://know-your-city-theta.vercel.app/](https://know-your-city-theta.vercel.app/)
- **⚙️ Backend API:** [https://know-your-city.onrender.com/](https://know-your-city.onrender.com/)
- **📊 Admin Panel:** [https://know-your-city-theta.vercel.app/admin](https://know-your-city-theta.vercel.app/admin)

### Tech Stack Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                         │
│  React 18 + Tailwind CSS + React Query             │
│  React Router + Leaflet Maps                        │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│                    Backend API                      │
│  Node.js + Express + MongoDB                        │
│  Passport.js + JWT Authentication                   │
└─────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────┐
│                    Database                         │
│  MongoDB Atlas (Cloud)                              │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

| Requirement | Minimum Version | Recommended |
|-------------|----------------|-------------|
| **Node.js** | 18.0+ | 20.0+ |
| **npm** | 8.0+ | 10.0+ |
| **MongoDB** | 5.0+ | 7.0+ (Atlas) |
| **Git** | 2.0+ | Latest |

### Quick Installation

#### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/know-your-city.git
cd know-your-city
```

#### Step 2: Install Dependencies

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

#### Step 3: Environment Configuration

**Server Environment** (`server/.env`):
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/know-your-city

# Authentication
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

**Client Environment** (`client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000
```

#### Step 4: Start Application

```bash
# From root directory - runs both frontend and backend
npm run dev

# OR run separately:
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend
cd client && npm start
```

#### Step 5: Access Application

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend** | http://localhost:5000 | API server |
| **Admin Panel** | http://localhost:3000/admin | Admin dashboard |

### First-Time Setup

1. **Create Admin User:**
   - Register a new account
   - Manually update role in MongoDB: `{ role: 'admin' }`
   - Or use provided seed scripts

2. **Seed Database (Optional):**
   ```bash
   cd server
   node scripts/seed.js
   ```

3. **Verify Installation:**
   - Visit http://localhost:3000
   - Check cities and places load correctly
   - Test login/register functionality

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │  React    │  │  React    │  │  State Management  │  │
│  │ Components│  │  Router   │  │  (React Query)     │  │
│  └───────────┘  └───────────┘  └────────────────────┘  │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │ Tailwind  │  │  Leaflet  │  │  Auth Context      │  │
│  │   CSS     │  │   Maps    │  │                    │  │
│  └───────────┘  └───────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────┐
│                   Server Layer                          │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │  Express  │  │  Passport │  │  JWT Auth          │  │
│  │  Router   │  │   Auth    │  │  Middleware        │  │
│  └───────────┘  └───────────┘  └────────────────────┘  │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │ Validator │  │   CORS    │  │  Error Handler     │  │
│  │           │  │           │  │                    │  │
│  └───────────┘  └───────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────┐
│                  Database Layer                         │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │   Users   │  │   Cities  │  │      Places        │  │
│  │Collection │  │Collection │  │    Collection      │  │
│  └───────────┘  └───────────┘  └────────────────────┘  │
│  ┌───────────┐                                          │
│  │  Reviews  │         MongoDB Atlas                   │
│  │Collection │                                          │
│  └───────────┘                                          │
└─────────────────────────────────────────────────────────┘
```

### Project Structure

```
know-your-city/
│
├── client/                          # React Frontend Application
│   ├── public/                      # Static Assets
│   │   ├── index.html              # HTML template
│   │   ├── manifest.json           # PWA manifest
│   │   └── logo*.jpg               # Logo assets
│   │
│   ├── src/                        # Source Code
│   │   ├── components/             # Reusable Components
│   │   │   ├── admin/              # Admin-specific components
│   │   │   ├── auth/               # Authentication components
│   │   │   │   ├── OAuthButtons.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── layout/             # Layout components
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   ├── MapView.js          # Map display component
│   │   │   ├── MapModal.js         # Map modal component
│   │   │   ├── LocationPicker.js   # Location selector
│   │   │   ├── AnimatedButton.js
│   │   │   ├── AnimatedCard.js
│   │   │   ├── Carousel.js
│   │   │   └── SkeletonCard.js
│   │   │
│   │   ├── pages/                  # Page Components
│   │   │   ├── admin/              # Admin pages
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminCities.js
│   │   │   │   ├── AdminPlaces.js
│   │   │   │   ├── AdminUsers.js
│   │   │   │   └── AdminReviews.js
│   │   │   ├── Home.js
│   │   │   ├── Cities.js
│   │   │   ├── CityDetail.js
│   │   │   ├── Places.js
│   │   │   ├── PlaceDetail.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   └── AuthCallback.js
│   │   │
│   │   ├── contexts/               # React Contexts
│   │   │   └── AuthContext.js      # Authentication state
│   │   │
│   │   ├── config/                 # Configuration
│   │   │   └── api.js              # Axios configuration
│   │   │
│   │   ├── App.js                  # Main App component
│   │   ├── index.js                # Entry point
│   │   └── index.css               # Global styles
│   │
│   ├── package.json                # Dependencies
│   ├── tailwind.config.js          # Tailwind configuration
│   └── postcss.config.js           # PostCSS configuration
│
├── server/                         # Node.js Backend Application
│   ├── config/                     # Configuration Files
│   │   └── passport.js             # Passport strategies
│   │
│   ├── middleware/                 # Express Middleware
│   │   └── auth.js                 # Authentication middleware
│   │
│   ├── models/                     # Mongoose Models
│   │   ├── User.js                 # User schema
│   │   ├── City.js                 # City schema
│   │   ├── Place.js                # Place schema
│   │   └── Review.js               # Review schema
│   │
│   ├── routes/                     # API Routes
│   │   ├── auth.js                 # Authentication routes
│   │   ├── cities.js               # City routes
│   │   ├── places.js               # Place routes
│   │   └── admin.js                # Admin routes
│   │
│   ├── scripts/                    # Utility Scripts
│   │   └── seed.js                 # Database seeding
│   │
│   ├── uploads/                    # File Uploads
│   │   ├── cities/                 # City images
│   │   └── places/                 # Place images
│   │
│   ├── index.js                    # Server entry point
│   └── package.json                # Dependencies
│
├── Documentation/                  # Project Documentation
│   ├── MAP_FEATURES_OVERVIEW.md
│   ├── MAP_IMPLEMENTATION_SUMMARY.md
│   ├── MAP_FEATURE_GUIDE.md
│   ├── LOCATION_PICKER_USAGE.md
│   └── MAP_QUICK_START.md
│
├── package.json                    # Root dependencies
├── vercel.json                     # Vercel configuration
├── render.yaml                     # Render configuration
├── railway.json                    # Railway configuration
├── README.md                       # Project README
└── WIKI.md                         # This wiki document
```

### Data Flow

#### User Request Flow

```
User Action (Browser)
       ↓
React Component
       ↓
API Call (Axios)
       ↓
Express Router
       ↓
Middleware (Auth, Validation)
       ↓
Route Handler
       ↓
Mongoose Model
       ↓
MongoDB Database
       ↓
Response
       ↓
React Query Cache
       ↓
UI Update
```

#### Authentication Flow

```
1. User submits credentials
         ↓
2. POST /api/auth/login
         ↓
3. Validate credentials
         ↓
4. Generate JWT token
         ↓
5. Return token + user data
         ↓
6. Store in AuthContext
         ↓
7. Store in localStorage
         ↓
8. Include in future requests
         ↓
9. Middleware verifies token
         ↓
10. Grant/Deny access
```

---

## ✨ Features

### 🌐 Public Features

#### 1. City Discovery
- Browse 18+ cities from around the world
- View city details including population, description, and images
- Filter cities by country or region
- Search cities by name
- View featured cities on homepage

**Technical Implementation:**
- Component: `Cities.js`
- API: `GET /api/cities`
- Model: `City.js`

#### 2. Place Exploration
- Discover 49+ places across cities
- View detailed information with images
- Read reviews and ratings
- Filter by category (restaurants, attractions, hotels, etc.)
- Search by location, name, or area
- Sort by rating, popularity, or newest

**Technical Implementation:**
- Component: `Places.js`, `PlaceDetail.js`
- API: `GET /api/places`, `GET /api/places/:id`
- Model: `Place.js`

#### 3. Advanced Search & Filters
- Search by:
  - Place name
  - Area/neighborhood
  - Pincode
  - Description keywords
- Filter by:
  - Category
  - City
  - Minimum rating
  - Price range
- Pagination support

**Technical Implementation:**
- Query parameters: `?search=&category=&city=&rating=&pincode=`
- MongoDB text search with regex
- Indexed fields for performance

#### 4. Rating & Review System
- View place ratings (1-5 stars)
- Read user reviews
- Submit reviews (authenticated users)
- Star rating with visual feedback
- Review moderation by admins

**Technical Implementation:**
- Component: `PlaceDetail.js`
- API: `POST /api/places/:id/reviews`
- Model: `Review.js`
- Auto-calculation of average ratings

#### 5. Interactive Maps 🗺️ **NEW!**
- View place locations on interactive maps
- OpenStreetMap integration
- Click-to-navigate to Google Maps
- Coordinate display
- Admin location verification

**Technical Implementation:**
- Components: `MapView.js`, `MapModal.js`, `LocationPicker.js`
- Library: Leaflet + React-Leaflet
- Features: Pan, zoom, markers, popups

### 👨‍💼 Admin Features

#### 1. Admin Dashboard
- Overview statistics:
  - Total users, cities, places, reviews
  - Active vs pending content
  - User registrations over time
- Quick actions panel
- Recent activity feed

**Access:** `/admin/dashboard`
**API:** `GET /api/admin/dashboard`

#### 2. City Management
- View all cities
- Add new cities
- Edit city details
- Update city status (active/inactive)
- Upload city images
- Set featured cities

**Access:** `/admin/cities`
**API:** 
- `GET /api/admin/cities`
- `POST /api/admin/cities`
- `PUT /api/admin/cities/:id`
- `DELETE /api/admin/cities/:id`

#### 3. Place Management
- View all places (pending, active, inactive)
- Approve/reject place submissions
- Edit place details
- View place location on map 🗺️ **NEW!**
- Update place status
- Manage place images

**Access:** `/admin/places`
**API:**
- `GET /api/admin/places`
- `PUT /api/admin/places/:id/status`
- `PUT /api/admin/places/:id`

#### 4. User Management
- View all registered users
- Edit user roles (user, admin)
- View user statistics
- Manage user accounts
- Ban/unban users

**Access:** `/admin/users`
**API:**
- `GET /api/admin/users`
- `PUT /api/admin/users/:id/role`
- `DELETE /api/admin/users/:id`

#### 5. Review Moderation
- View all reviews
- Approve/reject reviews
- Delete inappropriate reviews
- Filter by status (pending, active, inactive)
- View review details

**Access:** `/admin/reviews`
**API:**
- `GET /api/admin/reviews`
- `PUT /api/admin/reviews/:id/status`
- `DELETE /api/admin/reviews/:id`

### 🔐 Authentication & Security Features

#### 1. User Authentication
- Email/password registration
- Secure login
- JWT token-based authentication
- Password hashing with bcrypt
- Token expiration and refresh

#### 2. OAuth Integration (Ready)
- Google OAuth 2.0
- Facebook OAuth
- Callback handling
- Profile creation from OAuth data

#### 3. Protected Routes
- Client-side route protection
- Server-side middleware authentication
- Role-based access control
- Admin-only endpoints

#### 4. Security Measures
- Password hashing (bcrypt)
- JWT secret key
- CORS configuration
- Input validation
- SQL injection prevention (Mongoose)
- XSS protection
- Rate limiting (ready for implementation)

---

## 🧩 Components Reference

### Layout Components

#### Navbar.js
**Purpose:** Main navigation bar

**Features:**
- Responsive design
- User authentication status
- Admin panel link (for admins)
- Mobile menu
- Logo and branding

**Props:** None (uses AuthContext)

```javascript
import Navbar from '../components/layout/Navbar';
<Navbar />
```

#### Footer.js
**Purpose:** Site footer

**Features:**
- Links to pages
- Social media links
- Copyright information
- Responsive layout

```javascript
import Footer from '../components/layout/Footer';
<Footer />
```

### Map Components 🗺️

#### MapView.js
**Purpose:** Display location on interactive map

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `latitude` | Number | Yes | - | Latitude coordinate |
| `longitude` | Number | Yes | - | Longitude coordinate |
| `placeName` | String | No | - | Name to display in popup |
| `address` | String | No | - | Address to display |
| `height` | String | No | '400px' | Map container height |
| `zoom` | Number | No | 15 | Initial zoom level |

**Example:**
```javascript
import MapView from '../components/MapView';

<MapView
  latitude={28.6139}
  longitude={77.2090}
  placeName="India Gate"
  address="Rajpath, New Delhi"
  height="450px"
  zoom={16}
/>
```

#### MapModal.js
**Purpose:** Modal popup with map

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | Boolean | Yes | Modal visibility |
| `onClose` | Function | Yes | Close handler |
| `place` | Object | Yes | Place object with coordinates |

**Example:**
```javascript
import MapModal from '../components/MapModal';

const [showMap, setShowMap] = useState(false);

<MapModal
  isOpen={showMap}
  onClose={() => setShowMap(false)}
  place={placeObject}
/>
```

#### LocationPicker.js
**Purpose:** Interactive location selector for forms

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `initialLat` | Number | No | 28.6139 | Initial latitude |
| `initialLng` | Number | No | 77.2090 | Initial longitude |
| `onLocationSelect` | Function | Yes | - | Callback with {latitude, longitude} |
| `height` | String | No | '400px' | Map height |

**Features:**
- Click map to set location
- Search address (geocoding)
- Manual coordinate entry
- Real-time validation

**Example:**
```javascript
import LocationPicker from '../components/LocationPicker';

const [coords, setCoords] = useState({ latitude: null, longitude: null });

<LocationPicker
  onLocationSelect={(coords) => setCoords(coords)}
  height="500px"
/>
```

### UI Components

#### AnimatedButton.js
**Purpose:** Button with animation effects

**Props:** Standard button props + animation variants

#### AnimatedCard.js
**Purpose:** Card component with hover animations

#### Carousel.js
**Purpose:** Image carousel for hero section

#### SkeletonCard.js
**Purpose:** Loading placeholder

### Authentication Components

#### ProtectedRoute.js
**Purpose:** Protect routes requiring authentication

**Usage:**
```javascript
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

#### OAuthButtons.js
**Purpose:** Google/Facebook login buttons

---

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:5000`
- **Production:** `https://know-your-city.onrender.com`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response 201:
{
  "message": "User registered successfully",
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt.token.here"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response 200:
{
  "message": "Login successful",
  "user": { ... },
  "token": "jwt.token.here"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### City Endpoints

#### Get All Cities
```http
GET /api/cities?search=&country=&featured=&page=1&limit=10

Response 200:
{
  "cities": [
    {
      "_id": "cityId",
      "name": "New Delhi",
      "country": "India",
      "population": 11000000,
      "description": "Capital city...",
      "images": ["url1", "url2"],
      "featured": true,
      "status": "active"
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 2,
    "total": 18
  }
}
```

#### Get City by ID
```http
GET /api/cities/:id

Response 200:
{
  "_id": "cityId",
  "name": "New Delhi",
  ...
}
```

#### Get Places in City
```http
GET /api/cities/:id/places

Response 200:
{
  "places": [...],
  "pagination": { ... }
}
```

### Place Endpoints

#### Get All Places
```http
GET /api/places?search=&category=&city=&minRating=&pincode=&page=1&limit=20

Response 200:
{
  "places": [
    {
      "_id": "placeId",
      "name": "India Gate",
      "description": "War memorial...",
      "city": {
        "_id": "cityId",
        "name": "New Delhi"
      },
      "category": "monument",
      "address": {
        "fullAddress": "Rajpath, New Delhi"
      },
      "coordinates": {
        "latitude": 28.6129,
        "longitude": 77.2295
      },
      "rating": {
        "average": 4.5,
        "count": 120
      },
      "featured": true,
      "status": "active"
    }
  ],
  "pagination": { ... }
}
```

#### Get Place by ID
```http
GET /api/places/:id

Response 200:
{
  "_id": "placeId",
  "name": "India Gate",
  "description": "...",
  "city": { ... },
  "coordinates": {
    "latitude": 28.6129,
    "longitude": 77.2295
  },
  ...
}
```

#### Create Place (Authenticated)
```http
POST /api/places
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Place Name",
  "description": "Description...",
  "city": "cityId",
  "category": "restaurant",
  "coordinates": {
    "latitude": 28.6129,
    "longitude": 77.2295
  },
  "address": {
    "fullAddress": "Full address"
  }
}

Response 201:
{
  "message": "Place created successfully and is pending approval",
  "place": { ... }
}
```

#### Add Review
```http
POST /api/places/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "title": "Amazing place!",
  "comment": "Had a great experience..."
}

Response 201:
{
  "message": "Review added successfully",
  "review": { ... }
}
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>

Response 200:
{
  "totalUsers": 150,
  "totalCities": 18,
  "totalPlaces": 49,
  "totalReviews": 230,
  "pendingPlaces": 5,
  "pendingReviews": 12,
  "activeUsers": 120
}
```

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <admin-token>

Response 200:
[
  {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### Update User Role
```http
PUT /api/admin/users/:id/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin"
}

Response 200:
{
  "message": "User role updated successfully",
  "user": { ... }
}
```

#### Update Place Status
```http
PUT /api/admin/places/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "active"
}

Response 200:
{
  "message": "Place status updated successfully",
  "place": { ... }
}
```

### Error Responses

All endpoints may return these error responses:

```http
400 Bad Request:
{
  "message": "Validation error",
  "errors": [...]
}

401 Unauthorized:
{
  "message": "Authentication required"
}

403 Forbidden:
{
  "message": "Admin access required"
}

404 Not Found:
{
  "message": "Resource not found"
}

500 Internal Server Error:
{
  "message": "Server error"
}
```

---

## 🗄️ Database Schema

### User Schema

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.oauth; // Required if not OAuth user
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String
  },
  oauth: {
    provider: String, // 'google' or 'facebook'
    providerId: String
  },
  favorites: [{
    type: ObjectId,
    ref: 'Place'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### City Schema

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  state: String,
  description: {
    type: String,
    required: true
  },
  population: Number,
  area: Number,
  images: [{
    url: String,
    caption: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  metadata: {
    timezone: String,
    language: String,
    currency: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Place Schema

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: ObjectId,
    ref: 'City',
    required: true
  },
  category: {
    type: String,
    required: true,
    // e.g., 'restaurant', 'hotel', 'attraction', 'shopping'
  },
  address: {
    street: String,
    area: String,
    pincode: String,
    fullAddress: String
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  timings: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  images: [{
    url: String,
    caption: String
  }],
  amenities: [String],
  priceRange: String, // e.g., '$', '$$', '$$$'
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema

```javascript
{
  _id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: ObjectId,
    ref: 'Place',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

For optimal performance, the following indexes are recommended:

```javascript
// User indexes
User.index({ email: 1 });

// City indexes
City.index({ name: 1 });
City.index({ country: 1 });
City.index({ featured: 1 });

// Place indexes
Place.index({ city: 1 });
Place.index({ category: 1 });
Place.index({ 'rating.average': -1 });
Place.index({ 'address.pincode': 1 });
Place.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
Place.index({ status: 1 });

// Review indexes
Review.index({ place: 1 });
Review.index({ user: 1 });
Review.index({ status: 1 });
```

---

## 🔐 Authentication & Security

### JWT Authentication

#### Token Generation

```javascript
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
```

#### Token Verification

```javascript
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
```

### Password Security

```javascript
const bcrypt = require('bcryptjs');

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
```

### Role-Based Access Control

```javascript
// Admin middleware
const adminAuth = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Usage
router.get('/admin/dashboard', auth, adminAuth, getDashboard);
```

### OAuth Implementation

#### Google OAuth Strategy

```javascript
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create user
    let user = await User.findOne({ 'oauth.providerId': profile.id });
    
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        oauth: {
          provider: 'google',
          providerId: profile.id
        }
      });
    }
    
    return done(null, user);
  }
));
```

### Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, random JWT secrets
   - Rotate secrets periodically

2. **Password Requirements**
   - Minimum 8 characters
   - Hash with bcrypt (salt rounds: 10)
   - Never store plain text passwords

3. **Input Validation**
   - Use express-validator
   - Sanitize user inputs
   - Validate on both client and server

4. **CORS Configuration**
   ```javascript
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

5. **Rate Limiting** (Recommended)
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

---

## 🗺️ Map Features

### Overview

The map integration provides interactive location visualization using OpenStreetMap and Leaflet. Users can view place locations, admins can verify coordinates, and forms can use the location picker.

### Components

#### 1. MapView
Displays a location on an interactive map.

**Use Cases:**
- Show place location on detail pages
- Display city boundaries
- Visualize multiple locations

**Features:**
- Interactive pan and zoom
- Marker with popup
- Custom height and zoom levels
- OpenStreetMap tiles (free)

#### 2. MapModal
Modal popup with map for quick viewing.

**Use Cases:**
- Admin place verification
- Quick location preview
- Non-intrusive map viewing

**Features:**
- Click-outside to close
- Coordinate display
- Google Maps integration
- Responsive design

#### 3. LocationPicker
Interactive location selector for forms.

**Use Cases:**
- Place submission forms
- Edit location coordinates
- User-contributed content

**Features:**
- Three input methods:
  1. Click on map
  2. Search address (geocoding)
  3. Manual coordinate entry
- Real-time validation
- Visual feedback

### Technical Details

#### Libraries
```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "@types/leaflet": "^1.9.8"
}
```

#### Map Tile Provider
- **Source:** OpenStreetMap
- **Cost:** Free
- **License:** ODbL
- **Tiles URL:** `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

#### Coordinate System
- **Format:** WGS 84 (World Geodetic System 1984)
- **Latitude:** -90 to 90
- **Longitude:** -180 to 180
- **Precision:** 6 decimal places (~0.11 meters)

### Integration Examples

#### Display Place Location

```javascript
import MapView from '../components/MapView';

function PlaceDetail() {
  const place = usePlaceData();
  
  return (
    <div>
      <h2>Location</h2>
      {place.coordinates && (
        <MapView
          latitude={place.coordinates.latitude}
          longitude={place.coordinates.longitude}
          placeName={place.name}
          address={place.address?.fullAddress}
        />
      )}
    </div>
  );
}
```

#### Admin Location Verification

```javascript
import MapModal from '../components/MapModal';

function AdminPlaces() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);
  
  return (
    <>
      <button onClick={() => {
        setSelectedPlace(place);
        setShowMap(true);
      }}>
        View on Map
      </button>
      
      <MapModal
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        place={selectedPlace}
      />
    </>
  );
}
```

#### Form with Location Picker

```javascript
import LocationPicker from '../components/LocationPicker';

function AddPlaceForm() {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null
  });
  
  const handleSubmit = async (data) => {
    await api.post('/api/places', {
      ...data,
      coordinates
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <LocationPicker
        onLocationSelect={setCoordinates}
      />
    </form>
  );
}
```

### Geocoding

The LocationPicker uses OpenStreetMap's Nominatim service for address search:

**API Endpoint:**
```
https://nominatim.openstreetmap.org/search?format=json&q={query}
```

**Rate Limits:**
- 1 request per second
- Include descriptive User-Agent
- Consider caching results

**Example Response:**
```json
[
  {
    "place_id": 12345,
    "lat": "28.6139",
    "lon": "77.2090",
    "display_name": "India Gate, Rajpath, New Delhi, India"
  }
]
```

### Google Maps Integration

For navigation, the app provides direct links to Google Maps:

```javascript
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
window.open(googleMapsUrl, '_blank');
```

### Customization

#### Change Map Tiles

```javascript
// In MapView.js, replace TileLayer URL:

// OpenStreetMap (current)
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

// Mapbox (requires API key)
url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"

// CartoDB
url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
```

#### Custom Marker Icons

```javascript
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: '/path/to/icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

<Marker position={position} icon={customIcon} />
```

---

## 🚀 Deployment Guide

### Prerequisites

- MongoDB Atlas account
- Vercel account (frontend)
- Render account (backend)
- GitHub repository

### Step 1: Database Setup (MongoDB Atlas)

1. **Create Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Click "Build a Database"
   - Choose free tier (M0)
   - Select cloud provider and region
   - Click "Create Cluster"

2. **Configure Access:**
   - Database Access → Add User
     - Username: `know-your-city-admin`
     - Password: Generate secure password
     - Role: Atlas admin
   - Network Access → Add IP Address
     - Choose "Allow Access from Anywhere" (0.0.0.0/0)
     - Or add specific IPs for production

3. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `know-your-city`

### Step 2: Backend Deployment (Render)

1. **Create Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - Name: `know-your-city-api`
     - Root Directory: `server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

2. **Environment Variables:**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/know-your-city?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   CLIENT_URL=https://your-app.vercel.app
   PORT=5000
   ```

3. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (~5 minutes)
   - Note the service URL: `https://your-service.onrender.com`

4. **Verify:**
   - Visit: `https://your-service.onrender.com/`
   - Should see: `{ "message": "Know Your City API" }`

### Step 3: Frontend Deployment (Vercel)

1. **Create Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import GitHub repository
   - Configure:
     - Framework Preset: Other (uses vercel.json)
     - Root Directory: Leave empty
     - Build Command: `cd client && npm install && npm run build`
     - Output Directory: `client/build`

2. **Environment Variable:**
   - Settings → Environment Variables
   - Add:
     ```
     Name:  REACT_APP_API_URL
     Value: https://your-render-service.onrender.com
     
     ✓ Production  ✓ Preview  ✓ Development
     ```

3. **Deploy:**
   - Click "Deploy"
   - Wait for build (~3 minutes)
   - Note the deployment URL

4. **Update Backend CORS:**
   - Go back to Render
   - Update `CLIENT_URL` environment variable
   - Value: Your Vercel URL
   - Click "Save Changes"
   - Service will auto-redeploy

### Step 4: Custom Domain (Optional)

#### Vercel Domain:
1. Settings → Domains
2. Add your domain
3. Configure DNS as instructed

#### Render Domain:
1. Settings → Custom Domain
2. Add your domain
3. Configure DNS CNAME record

### Step 5: SSL/HTTPS

Both Vercel and Render provide automatic SSL certificates. No configuration needed!

### Step 6: Post-Deployment

1. **Create Admin User:**
   - Register account on your site
   - Access MongoDB Atlas
   - Browse Collections → users
   - Find your user
   - Edit: Change `role` to `"admin"`
   - Save

2. **Seed Database (Optional):**
   - Clone repo locally
   - Create `.env` with production MongoDB URI
   - Run: `cd server && node scripts/seed.js`

3. **Test Application:**
   - Browse cities and places
   - Test search and filters
   - Login/register
   - Test admin panel
   - Check maps display correctly
   - Verify API responses

### Monitoring & Maintenance

#### Render
- **Logs:** Dashboard → Logs tab
- **Metrics:** Monitor response times, errors
- **Auto-deploy:** Connects to GitHub (auto-deploys on push)

#### Vercel
- **Logs:** Deployment → View Function Logs
- **Analytics:** Built-in analytics (paid tier)
- **Preview Deployments:** Auto-creates for PRs

#### MongoDB Atlas
- **Monitoring:** Metrics tab
- **Alerts:** Set up email alerts
- **Backups:** Configure automated backups

### Troubleshooting Deployment

**Build Fails:**
- Check build logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`

**CORS Errors:**
- Verify CLIENT_URL matches Vercel URL
- Check CORS configuration in server/index.js
- Ensure URLs include https://

**Database Connection:**
- Verify MongoDB URI is correct
- Check IP whitelist in Atlas
- Test connection locally first

**Environment Variables:**
- Verify all required vars are set
- Check for typos
- Redeploy after changes

---

## 💻 Development Guide

### Code Style

#### JavaScript/React Conventions

```javascript
// Use functional components with hooks
function MyComponent() {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <div>...</div>;
}

// Named exports for non-default exports
export { MyComponent, MyHelper };

// Default export for main component
export default MyComponent;
```

#### Naming Conventions

```javascript
// Components: PascalCase
MyComponent.js
AdminDashboard.js

// Utilities/helpers: camelCase
apiHelper.js
formatDate.js

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = '...';
const MAX_RETRIES = 3;

// CSS classes: kebab-case (or Tailwind)
class="my-component"
className="btn-primary"
```

### Project Commands

```bash
# Development
npm run dev              # Start both frontend and backend
npm run client           # Start frontend only
npm run server           # Start backend only

# Building
npm run build            # Build frontend for production
npm run build:client     # Build client only

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors

# Database
npm run seed             # Seed database with sample data
npm run migrate          # Run database migrations
```

### Adding New Features

#### 1. Create New API Endpoint

```javascript
// 1. Create route file: server/routes/feature.js
const express = require('express');
const router = express.Router();

router.get('/endpoint', async (req, res) => {
  try {
    // Implementation
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;

// 2. Register in server/index.js
app.use('/api/feature', require('./routes/feature'));
```

#### 2. Create New Page

```javascript
// 1. Create page: client/src/pages/NewPage.js
import React from 'react';

function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}

export default NewPage;

// 2. Add route in client/src/App.js
import NewPage from './pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

#### 3. Create New Component

```javascript
// client/src/components/NewComponent.js
import React from 'react';
import PropTypes from 'prop-types';

function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      {/* Component content */}
    </div>
  );
}

NewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

NewComponent.defaultProps = {
  prop2: 0
};

export default NewComponent;
```

### Testing

#### Unit Tests (Example with Jest)

```javascript
// __tests__/components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### API Tests (Example with Supertest)

```javascript
// __tests__/api/cities.test.js
const request = require('supertest');
const app = require('../server/index');

describe('Cities API', () => {
  test('GET /api/cities returns cities', async () => {
    const response = await request(app)
      .get('/api/cities')
      .expect(200);
    
    expect(response.body).toHaveProperty('cities');
    expect(Array.isArray(response.body.cities)).toBe(true);
  });
});
```

### Debugging

#### Frontend Debugging

```javascript
// React DevTools
// Install browser extension

// Console logging
console.log('Debug:', variable);

// React Query DevTools
import { ReactQueryDevtools } from 'react-query/devtools';

<ReactQueryDevtools initialIsOpen={false} />
```

#### Backend Debugging

```javascript
// Debug logging
const debug = require('debug')('app:server');
debug('Debug message:', data);

// VS Code launch configuration
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "program": "${workspaceFolder}/server/index.js",
  "env": {
    "NODE_ENV": "development"
  }
}
```

### Performance Optimization

#### Frontend
- Code splitting with React.lazy()
- Memoization with useMemo/useCallback
- Image optimization
- Lazy loading images
- React Query caching

#### Backend
- Database indexing
- Query optimization
- Response caching
- Compression middleware
- Rate limiting

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error:**
```
MongoNetworkError: failed to connect to server
```

**Solutions:**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure cluster is running
- Test connection string locally

#### 2. CORS Error

**Error:**
```
Access to fetch blocked by CORS policy
```

**Solutions:**
```javascript
// server/index.js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```
- Verify CLIENT_URL environment variable
- Check protocol (http vs https)
- Ensure URL doesn't end with /

#### 3. JWT Authentication Failed

**Error:**
```
401 Unauthorized: Please authenticate
```

**Solutions:**
- Check token is being sent in Authorization header
- Verify JWT_SECRET matches
- Check token expiration
- Ensure token format: `Bearer <token>`

#### 4. Map Not Displaying

**Symptoms:**
- Blank map area
- Markers not showing
- Console errors

**Solutions:**
- Verify Leaflet CSS is imported
- Check coordinates are valid numbers
- Ensure internet connection (for tiles)
- Check browser console for errors

#### 5. Build Fails

**Error:**
```
npm ERR! code ELIFECYCLE
```

**Solutions:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`

#### 6. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Debugging Checklist

- [ ] Check browser console for errors
- [ ] Check server logs
- [ ] Verify environment variables
- [ ] Test API endpoints with Postman
- [ ] Check database connection
- [ ] Verify authentication token
- [ ] Clear browser cache
- [ ] Restart development servers

---

## ❓ FAQ

### General Questions

**Q: Is this project free to use?**
A: Yes, the project is open-source under MIT License.

**Q: Do I need a credit card for deployment?**
A: No, both MongoDB Atlas, Vercel, and Render offer free tiers.

**Q: Can I use this for commercial purposes?**
A: Yes, MIT License allows commercial use.

### Technical Questions

**Q: Why MERN stack?**
A: MERN provides a complete JavaScript solution, great ecosystem, and excellent performance.

**Q: Can I use PostgreSQL instead of MongoDB?**
A: Yes, but you'll need to modify the Mongoose models to use Sequelize or another ORM.

**Q: How do I add more OAuth providers?**
A: Add strategy in `server/config/passport.js` and create routes in `server/routes/auth.js`.

**Q: Can I use this with TypeScript?**
A: Yes, you can migrate to TypeScript. Start with `npm install --save-dev typescript @types/react @types/node`.

### Feature Questions

**Q: How do I add more categories for places?**
A: Categories are stored in the database. Simply use a new category name when creating places.

**Q: Can users upload images?**
A: Currently, images are URLs. Implement file upload with multer for local storage or use cloud storage (Cloudinary, AWS S3).

**Q: How do I enable email notifications?**
A: Integrate email service like SendGrid or Nodemailer.

### Deployment Questions

**Q: Why is Render slow to respond?**
A: Free tier sleeps after inactivity. Takes ~30 seconds to wake up. Upgrade for always-on service.

**Q: Can I deploy to AWS/Heroku/Others?**
A: Yes, the application is platform-agnostic. Adjust deployment configurations accordingly.

**Q: How do I set up custom domain?**
A: Both Vercel and Render support custom domains. Check their documentation for DNS configuration.

---

## 🤝 Contributing

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/know-your-city.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe your changes
   - Submit for review

### Contribution Guidelines

#### Code Quality
- Follow existing code style
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation

#### Testing
- Test your changes locally
- Ensure no breaking changes
- Add unit tests for new features

#### Documentation
- Update README if needed
- Document new API endpoints
- Add inline code comments

### Issue Reporting

**Bug Reports:**
- Describe the bug clearly
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

**Feature Requests:**
- Describe the feature
- Use case/benefit
- Possible implementation approach

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🌐 Internationalization
- ♿ Accessibility improvements

---

## 📝 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Know Your City

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📚 Additional Resources

### Official Documentation
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com/reference.html)

### Tutorials & Guides
- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)
- [JWT Authentication Guide](https://jwt.io/introduction)
- [React Query Docs](https://tanstack.com/query/latest)
- [Passport.js Documentation](http://www.passportjs.org/)

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/mern)
- [Reddit r/webdev](https://www.reddit.com/r/webdev/)
- [Dev.to Community](https://dev.to/)

---

## 🎯 Roadmap

### Version 2.0 (Planned)

#### Features
- [ ] Advanced search with filters
- [ ] User-to-user messaging
- [ ] Social media sharing
- [ ] Favorite places
- [ ] Place recommendations AI
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)

#### Technical
- [ ] TypeScript migration
- [ ] GraphQL API
- [ ] Redis caching
- [ ] Elasticsearch integration
- [ ] Microservices architecture
- [ ] CI/CD pipeline
- [ ] Automated testing (Jest, Cypress)
- [ ] Performance monitoring (Sentry)

#### Admin Features
- [ ] Advanced analytics dashboard
- [ ] Bulk operations
- [ ] Export data (CSV, JSON)
- [ ] Scheduled reports
- [ ] User activity tracking

---

## 🙏 Acknowledgments

### Technologies & Services
- **MongoDB Atlas** - Database hosting
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **OpenStreetMap** - Map tiles
- **Leaflet** - Map library
- **Tailwind CSS** - CSS framework

### Contributors
- All contributors who help improve this project

### Inspiration
- Modern travel and discovery platforms
- Community-driven review systems
- Location-based services

---

## 📞 Support & Contact

### Get Help
- 📧 Email: support@knowyourcity.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/know-your-city/issues)

### Follow Us
- 🐦 Twitter: [@knowyourcity](#)
- 📘 Facebook: [Know Your City](#)
- 📸 Instagram: [@knowyourcity](#)

---

**Last Updated:** October 9, 2025

**Version:** 1.0.0

**Status:** Production Ready ✅

---

*Made with ❤️ by the Know Your City Team*

*Discover the world, one city at a time!* 🌍

