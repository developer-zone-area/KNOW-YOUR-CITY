const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Google OAuth Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
      isVerified: true, // Google emails are verified
      provider: 'google'
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
  }));
} else {
  console.log('⚠️  Google OAuth not configured - set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
}

// Facebook OAuth Strategy (only if credentials are provided)
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'picture']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ facebookId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with same email
    if (profile.emails && profile.emails[0]) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Link Facebook account to existing user
        user.facebookId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }
    }
    
    // Create new user
    user = new User({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : null,
      avatar: profile.photos[0].value,
      isVerified: true, // Facebook accounts are verified
      provider: 'facebook'
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
  }));
} else {
  console.log('⚠️  Facebook OAuth not configured - set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET');
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
