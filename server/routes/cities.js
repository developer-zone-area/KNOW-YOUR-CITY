const express = require('express');
const City = require('../models/City');
const Place = require('../models/Place');

const router = express.Router();

// Get all states from database
router.get('/states', async (req, res) => {
  try {
    const states = await City.distinct('state', { status: 'active' });
    res.json(states.sort());
  } catch (error) {
    console.error('Get states error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all countries from database
router.get('/countries', async (req, res) => {
  try {
    const countries = await City.distinct('country', { status: 'active' });
    res.json(countries.sort());
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all cities
router.get('/', async (req, res) => {
  try {
    const { featured, search, state, country } = req.query;
    let query = { status: 'active' };

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (state) {
      query.state = { $regex: state, $options: 'i' };
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    const cities = await City.find(query).sort({ name: 1 });
    res.json(cities);
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single city
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    console.error('Get city error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get places in a city
router.get('/:id/places', async (req, res) => {
  try {
    const { category, featured, limit = 20, page = 1 } = req.query;
    let query = { city: req.params.id, status: 'active' };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (page - 1) * limit;
    
    const places = await Place.find(query)
      .populate('city', 'name')
      .sort({ rating: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Place.countDocuments(query);

    res.json({
      places,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get city places error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get city statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const cityId = req.params.id;
    
    const totalPlaces = await Place.countDocuments({ city: cityId, status: 'active' });
    const totalReviews = await Review.countDocuments({ place: { $in: await Place.find({ city: cityId }).select('_id') } });
    
    const categoryStats = await Place.aggregate([
      { $match: { city: cityId, status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalPlaces,
      totalReviews,
      categoryStats
    });
  } catch (error) {
    console.error('Get city stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
