const express = require('express');
const { adminAuth } = require('../middleware/auth');
const City = require('../models/City');
const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalCities = await City.countDocuments();
    const totalPlaces = await Place.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalReviews = await Review.countDocuments();
    const pendingPlaces = await Place.countDocuments({ status: 'pending' });
    const pendingReviews = await Review.countDocuments({ status: 'reported' });

    res.json({
      stats: {
        totalCities,
        totalPlaces,
        totalUsers,
        totalReviews,
        pendingPlaces,
        pendingReviews
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cities management
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });
    res.json(cities);
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cities', async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.error('Create city error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/cities/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    console.error('Update city error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/cities/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('Delete city error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Places management
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find()
      .populate('city', 'name')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    console.error('Get places error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/places/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('city', 'name');
    
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    
    res.json(place);
  } catch (error) {
    console.error('Update place status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Users management
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reviews management
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('place', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/reviews/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email').populate('place', 'name');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
