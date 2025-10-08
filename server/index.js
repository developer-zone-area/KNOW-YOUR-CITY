const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./config/passport');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/know-your-city';

mongoose.connect(mongoURI)
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully!');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.error('💡 Make sure your MONGODB_URI environment variable is set correctly');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/places', require('./routes/places'));
// Image routes disabled - using direct file uploads

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Statistics endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const City = require('./models/City');
    const Place = require('./models/Place');
    const User = require('./models/User');
    const Review = require('./models/Review');
    
    const [citiesCount, placesCount, usersCount, reviewsCount] = await Promise.all([
      City.countDocuments({ status: 'active' }),
      Place.countDocuments({ status: 'active' }),
      User.countDocuments(),
      Review.countDocuments({ status: 'active' })
    ]);
    
    res.json({
      cities: citiesCount,
      places: placesCount,
      users: usersCount,
      reviews: reviewsCount
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get valid enum values from database
app.get('/api/enums', async (req, res) => {
  try {
    const City = require('./models/City');
    const Place = require('./models/Place');
    const User = require('./models/User');
    const Review = require('./models/Review');
    
    const [categories, priceRanges, placeStatuses, cityStatuses, userRoles, reviewStatuses] = await Promise.all([
      Place.distinct('category'),
      Place.distinct('priceRange'),
      Place.distinct('status'),
      City.distinct('status'),
      User.distinct('role'),
      Review.distinct('status')
    ]);
    
    res.json({
      categories: categories.filter(Boolean),
      priceRanges: priceRanges.filter(Boolean),
      placeStatuses: placeStatuses.filter(Boolean),
      cityStatuses: cityStatuses.filter(Boolean),
      userRoles: userRoles.filter(Boolean),
      reviewStatuses: reviewStatuses.filter(Boolean)
    });
  } catch (error) {
    console.error('Get enums error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Know Your City API Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
