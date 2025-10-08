require('dotenv').config();
const mongoose = require('mongoose');
const City = require('../models/City');
const Place = require('../models/Place');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    setupLocalImages();
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });

async function setupLocalImages() {
  try {
    // Create local images directory structure
    const uploadDir = path.join(__dirname, '../uploads');
    const citiesDir = path.join(uploadDir, 'cities');
    const placesDir = path.join(uploadDir, 'places');

    [uploadDir, citiesDir, placesDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      } else {
        console.log(`📁 Directory already exists: ${dir}`);
      }
    });

    // Create sample local images mapping
    const localImages = {
      'Ahmedabad': [
        {
          url: '/uploads/cities/ahmedabad1.jpg',
          caption: 'Local Ahmedabad image'
        }
      ],
      'Mumbai': [
        {
          url: '/uploads/cities/mumbai1.jpg',
          caption: 'Local Mumbai image'
        }
      ],
      'Delhi': [
        {
          url: '/uploads/cities/delhi1.jpg',
          caption: 'Local Delhi image'
        }
      ]
    };

    console.log('\n📋 Local Images Setup:');
    console.log('1. Place your city images in: server/uploads/cities/');
    console.log('2. Place your place images in: server/uploads/places/');
    console.log('3. Supported formats: JPG, PNG, JPEG');
    console.log('4. Recommended size: 800x600 pixels');
    console.log('5. Max file size: 10MB per image');

    console.log('\n🔧 To add local images to your database:');
    console.log('1. Copy your images to the uploads directories');
    console.log('2. Run: node scripts/add-local-images.js');
    console.log('3. Or use the admin panel to upload images');

    console.log('\n📁 Directory structure created:');
    console.log('server/uploads/');
    console.log('├── cities/');
    console.log('└── places/');

    // Check if there are any existing local images
    const existingCityImages = fs.readdirSync(citiesDir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    const existingPlaceImages = fs.readdirSync(placesDir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    if (existingCityImages.length > 0) {
      console.log(`\n📸 Found ${existingCityImages.length} city images in uploads/cities/`);
    }
    if (existingPlaceImages.length > 0) {
      console.log(`📸 Found ${existingPlaceImages.length} place images in uploads/places/`);
    }

    console.log('\n✅ Local image setup completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up local images:', error);
    process.exit(1);
  }
}

