const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        provider: req.user.provider
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth Routes (only if configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/callback?token=${token}&provider=google`);
  }
  );
} else {
  router.get('/google', (req, res) => {
    res.status(501).json({ message: 'Google OAuth not configured' });
  });
  router.get('/google/callback', (req, res) => {
    res.status(501).json({ message: 'Google OAuth not configured' });
  });
}

// Facebook OAuth Routes (only if configured)
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/callback?token=${token}&provider=facebook`);
  }
  );
} else {
  router.get('/facebook', (req, res) => {
    res.status(501).json({ message: 'Facebook OAuth not configured' });
  });
  router.get('/facebook/callback', (req, res) => {
    res.status(501).json({ message: 'Facebook OAuth not configured' });
  });
}

module.exports = router;
