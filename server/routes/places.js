const express = require('express');
const { auth } = require('../middleware/auth');
const Place = require('../models/Place');
const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all categories from database
router.get('/categories', async (req, res) => {
  try {
    const categories = await Place.distinct('category', { status: 'active' });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all cities for filtering
router.get('/cities', async (req, res) => {
  try {
    const City = require('../models/City');
    const cities = await City.find({ status: 'active' })
      .select('name state')
      .sort({ name: 1 });
    res.json(cities);
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all places
router.get('/', async (req, res) => {
  try {
    const { 
      city, 
      category, 
      featured, 
      search, 
      pincode,
      minRating, 
      limit = 20, 
      page = 1 
    } = req.query;
    
    let query = { status: 'active' };

    if (city) query.city = city;
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'address.area': { $regex: search, $options: 'i' } },
        { 'address.street': { $regex: search, $options: 'i' } }
      ];
    }
    if (pincode) {
      query['address.pincode'] = { $regex: pincode, $options: 'i' };
    }
    if (minRating) query['rating.average'] = { $gte: parseFloat(minRating) };

    const skip = (page - 1) * limit;
    
    const places = await Place.find(query)
      .populate('city', 'name state')
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
    console.error('Get places error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate('city', 'name state country')
      .populate('createdBy', 'name email');
    
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    
    res.json(place);
  } catch (error) {
    console.error('Get place error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get place reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ place: req.params.id, status: 'active' })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Review.countDocuments({ place: req.params.id, status: 'active' });

    res.json({
      reviews,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get place reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create place (authenticated users)
router.post('/', auth, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('city').isMongoId().withMessage('Valid city ID is required'),
  body('category').custom(async (value) => {
    // Get valid categories from database
    const validCategories = await Place.distinct('category');
    if (validCategories.length > 0 && !validCategories.includes(value)) {
      throw new Error('Invalid category. Valid categories are: ' + validCategories.join(', '));
    }
    return true;
  }),
  body('coordinates.latitude').isNumeric().withMessage('Valid latitude is required'),
  body('coordinates.longitude').isNumeric().withMessage('Valid longitude is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const placeData = {
      ...req.body,
      createdBy: req.user._id,
      status: 'pending' // New places need admin approval
    };

    const place = new Place(placeData);
    await place.save();

    const populatedPlace = await Place.findById(place._id)
      .populate('city', 'name')
      .populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Place created successfully and is pending approval',
      place: populatedPlace
    });
  } catch (error) {
    console.error('Create place error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review (authenticated users)
router.post('/:id/reviews', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').trim().isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('comment').trim().isLength({ min: 10 }).withMessage('Comment must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if place exists
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Check if user already reviewed this place
    const existingReview = await Review.findOne({
      user: req.user._id,
      place: req.params.id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this place' });
    }

    const reviewData = {
      ...req.body,
      user: req.user._id,
      place: req.params.id
    };

    const review = new Review(reviewData);
    await review.save();

    // Update place rating
    const reviews = await Review.find({ place: req.params.id, status: 'active' });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Place.findByIdAndUpdate(req.params.id, {
      'rating.average': Math.round(averageRating * 10) / 10,
      'rating.count': reviews.length
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar');

    res.status(201).json({
      message: 'Review added successfully',
      review: populatedReview
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
