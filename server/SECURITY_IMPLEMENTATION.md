# 🔐 Quick Security Implementation Guide

## Add These Security Features to Your Server

### 1. Rate Limiting (Prevent Brute Force Attacks)

**Install:**
```bash
cd server
npm install express-rate-limit
```

**Add to `server/index.js`:**
```javascript
const rateLimit = require('express-rate-limit');

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true, // don't count successful logins
});

// Apply to all routes
app.use('/api/', generalLimiter);

// Apply stricter limit to auth routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### 2. Helmet.js (HTTP Security Headers)

**Install:**
```bash
npm install helmet
```

**Add to `server/index.js`:**
```javascript
const helmet = require('helmet');

// Use helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

### 3. MongoDB Injection Protection

**Install:**
```bash
npm install express-mongo-sanitize
```

**Add to `server/index.js`:**
```javascript
const mongoSanitize = require('express-mongo-sanitize');

// Prevent MongoDB injection
app.use(mongoSanitize());
```

### 4. Complete Updated `server/index.js`

Here's what your enhanced `server/index.js` should look like:

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

app.use('/api/', generalLimiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/places', require('./routes/places'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Know Your City API', status: 'running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### 5. Install All Security Packages at Once

**Run this command:**
```bash
cd server
npm install express-rate-limit helmet express-mongo-sanitize
```

### 6. Test After Implementation

**Test rate limiting:**
```bash
# Make multiple rapid requests
for i in {1..10}; do curl http://localhost:5000/api/cities; done
```

**You should see:**
- First requests work normally
- After limit, get "Too many requests" error

---

## Security Checklist After Implementation

- [ ] Install security packages
- [ ] Update server/index.js with new middleware
- [ ] Test rate limiting
- [ ] Test application still works
- [ ] Deploy to production
- [ ] Monitor logs for rate limit hits

---

## Optional: Additional Security Headers

Add to your `server/index.js`:

```javascript
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});
```

---

## Quick Security Audit

**Run npm audit:**
```bash
cd server
npm audit

# Fix issues
npm audit fix
```

**Check for outdated packages:**
```bash
npm outdated
```

---

*This guide provides immediate, actionable security improvements for your Know Your City application.*

