const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const City = require('../models/City');
const Place = require('../models/Place');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Cities data
const cities = [
  {
    name: 'New York',
    state: 'New York',
    country: 'United States',
    description: 'The city that never sleeps, New York is a global hub of culture, finance, and entertainment. From the iconic Statue of Liberty to the bright lights of Times Square, NYC offers endless experiences.',
    population: 8336817,
    foundedYear: 1624,
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', alt: 'New York Skyline' }
    ]
  },
  {
    name: 'Tokyo',
    state: 'Tokyo',
    country: 'Japan',
    description: 'A fascinating blend of ancient tradition and cutting-edge technology, Tokyo is the world\'s most populous metropolitan area. Experience serene temples, bustling markets, and innovative cuisine.',
    population: 13960000,
    foundedYear: 1457,
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', alt: 'Tokyo City' }
    ]
  },
  {
    name: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    description: 'The City of Light, Paris is synonymous with art, fashion, and romance. Home to the Eiffel Tower, Louvre Museum, and world-class cuisine, Paris captivates millions of visitors annually.',
    population: 2161000,
    foundedYear: 250,
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', alt: 'Paris Eiffel Tower' }
    ]
  },
  {
    name: 'London',
    state: 'England',
    country: 'United Kingdom',
    description: 'A historic city that shaped the modern world, London combines royal heritage with contemporary culture. Explore ancient landmarks, world-class museums, and diverse neighborhoods.',
    population: 9002488,
    foundedYear: 43,
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', alt: 'London Big Ben' }
    ]
  },
  {
    name: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    description: 'A futuristic metropolis in the desert, Dubai showcases architectural marvels, luxury shopping, and world-record-breaking attractions. From the Burj Khalifa to man-made islands, Dubai represents ambition.',
    population: 3331420,
    foundedYear: 1833,
    coordinates: { latitude: 25.2048, longitude: 55.2708 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', alt: 'Dubai Skyline' }
    ]
  },
  {
    name: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    description: 'Australia\'s harbor city, Sydney boasts stunning beaches, the iconic Opera House, and a vibrant multicultural atmosphere. Perfect blend of urban sophistication and natural beauty.',
    population: 5312000,
    foundedYear: 1788,
    coordinates: { latitude: -33.8688, longitude: 151.2093 },
    featured: true,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800', alt: 'Sydney Opera House' }
    ]
  },
  {
    name: 'Barcelona',
    state: 'Catalonia',
    country: 'Spain',
    description: 'A Mediterranean jewel known for Gaudí\'s architectural masterpieces, beautiful beaches, and vibrant street life. Barcelona offers a perfect mix of culture, history, and modern energy.',
    population: 1636762,
    foundedYear: 15,
    coordinates: { latitude: 41.3851, longitude: 2.1734 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800', alt: 'Barcelona Sagrada Familia' }
    ]
  },
  {
    name: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    description: 'A city-state that seamlessly blends diverse cultures, futuristic architecture, and lush green spaces. Known for cleanliness, efficiency, and incredible food scene.',
    population: 5686000,
    foundedYear: 1819,
    coordinates: { latitude: 1.3521, longitude: 103.8198 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', alt: 'Singapore Marina Bay' }
    ]
  },
  {
    name: 'Rome',
    state: 'Lazio',
    country: 'Italy',
    description: 'The Eternal City, where ancient history meets la dolce vita. Explore the Colosseum, Vatican City, and countless piazzas while enjoying authentic Italian cuisine.',
    population: 2873000,
    foundedYear: -753,
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', alt: 'Rome Colosseum' }
    ]
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    description: 'India\'s financial capital and Bollywood\'s home, Mumbai is a city of dreams and contrasts. Experience bustling markets, colonial architecture, and a never-ending energy.',
    population: 20411000,
    foundedYear: 1507,
    coordinates: { latitude: 19.0760, longitude: 72.8777 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', alt: 'Mumbai Gateway of India' }
    ]
  },
  {
    name: 'Istanbul',
    state: 'Istanbul',
    country: 'Turkey',
    description: 'Where East meets West, Istanbul straddles two continents. Rich in Byzantine and Ottoman heritage, featuring stunning mosques, bustling bazaars, and the beautiful Bosphorus.',
    population: 15462000,
    foundedYear: 660,
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800', alt: 'Istanbul Hagia Sophia' }
    ]
  },
  {
    name: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    description: 'Canada\'s largest city, Toronto is incredibly diverse and multicultural. Home to the CN Tower, vibrant neighborhoods, and a thriving arts scene.',
    population: 2930000,
    foundedYear: 1793,
    coordinates: { latitude: 43.6532, longitude: -79.3832 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800', alt: 'Toronto CN Tower' }
    ]
  },
  {
    name: 'Bangkok',
    state: 'Bangkok',
    country: 'Thailand',
    description: 'A vibrant metropolis known for ornate shrines, bustling street life, and incredible street food. Bangkok seamlessly blends traditional Thai culture with modern urban energy.',
    population: 10539000,
    foundedYear: 1782,
    coordinates: { latitude: 13.7563, longitude: 100.5018 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', alt: 'Bangkok Grand Palace' }
    ]
  },
  {
    name: 'Amsterdam',
    state: 'North Holland',
    country: 'Netherlands',
    description: 'The Venice of the North, Amsterdam charms with its picturesque canals, historic houses, world-class museums, and bicycle-friendly streets.',
    population: 872757,
    foundedYear: 1275,
    coordinates: { latitude: 52.3676, longitude: 4.9041 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800', alt: 'Amsterdam Canals' }
    ]
  },
  {
    name: 'Los Angeles',
    state: 'California',
    country: 'United States',
    description: 'The entertainment capital of the world, LA offers beaches, Hollywood glamour, diverse neighborhoods, and year-round sunshine. From Santa Monica to Beverly Hills, endless experiences await.',
    population: 3980000,
    foundedYear: 1781,
    coordinates: { latitude: 34.0522, longitude: -118.2437 },
    featured: false,
    status: 'active',
    images: [
      { url: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=800', alt: 'Los Angeles Skyline' }
    ]
  }
];

// Function to create places for a city
const createPlacesForCity = (cityId, cityName) => {
  const placesByCity = {
    'New York': [
      {
        name: 'Central Park',
        description: 'An urban oasis in the heart of Manhattan, offering 843 acres of green space, walking paths, lakes, and recreational activities. Perfect for picnics, jogging, or simply escaping the city bustle.',
        category: 'Attraction',
        priceRange: '$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.8, count: 15420 },
        address: {
          street: '59th to 110th St',
          city: cityName,
          pincode: '10022',
          fullAddress: 'Central Park, New York, NY 10022'
        },
        coordinates: { latitude: 40.7829, longitude: -73.9654 },
        contactInfo: { phone: '+1-212-310-6600', website: 'https://www.centralparknyc.org' },
        images: [
          { url: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800', alt: 'Central Park' }
        ]
      },
      {
        name: 'Statue of Liberty',
        description: 'An iconic symbol of freedom and democracy, this colossal neoclassical sculpture offers breathtaking views of New York Harbor and the city skyline.',
        category: 'Monument',
        priceRange: '$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.7, count: 28500 },
        address: {
          street: 'Liberty Island',
          city: 'New York',
          pincode: '10004',
          fullAddress: 'Liberty Island, New York, NY 10004'
        },
        coordinates: { latitude: 40.6892, longitude: -74.0445 },
        contactInfo: { phone: '+1-212-363-3200', website: 'https://www.nps.gov/stli' },
        images: [
          { url: 'https://images.unsplash.com/photo-1508431221598-7e8a2e1f1a2d?w=800', alt: 'Statue of Liberty' }
        ]
      },
      {
        name: 'Times Square',
        description: 'The crossroads of the world, Times Square dazzles with bright lights, Broadway theaters, and endless entertainment. A must-visit NYC landmark.',
        category: 'Attraction',
        priceRange: '$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.5, count: 35200 },
        address: {
          street: 'Broadway & 7th Ave',
          city: 'New York',
          pincode: '10036',
          fullAddress: 'Times Square, New York, NY 10036'
        },
        coordinates: { latitude: 40.7580, longitude: -73.9855 },
        contactInfo: { website: 'https://www.timessquarenyc.org' },
        images: [
          { url: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800', alt: 'Times Square' }
        ]
      },
      {
        name: 'Katz\'s Delicatessen',
        description: 'A legendary Jewish deli serving authentic pastrami sandwiches since 1888. Famous from "When Harry Met Sally" and a true NYC institution.',
        category: 'Restaurant',
        priceRange: '$$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.6, count: 8900 },
        address: {
          street: '205 E Houston St',
          city: 'New York',
          pincode: '10002',
          fullAddress: '205 E Houston St, New York, NY 10002'
        },
        coordinates: { latitude: 40.7223, longitude: -73.9873 },
        contactInfo: { phone: '+1-212-254-2246', website: 'https://katzsdelicatessen.com' },
        images: [
          { url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', alt: 'Katz\'s Deli' }
        ]
      }
    ],
    'Tokyo': [
      {
        name: 'Senso-ji Temple',
        description: 'Tokyo\'s oldest temple, this stunning Buddhist temple in Asakusa attracts millions with its iconic Thunder Gate, bustling Nakamise shopping street, and spiritual atmosphere.',
        category: 'Temple',
        priceRange: '$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.7, count: 42300 },
        address: {
          street: '2-3-1 Asakusa',
          city: 'Tokyo',
          pincode: '111-0032',
          fullAddress: '2-3-1 Asakusa, Taito City, Tokyo 111-0032'
        },
        coordinates: { latitude: 35.7148, longitude: 139.7967 },
        contactInfo: { website: 'https://www.senso-ji.jp' },
        images: [
          { url: 'https://images.unsplash.com/photo-1548016833-85fc5618f1a0?w=800', alt: 'Senso-ji Temple' }
        ]
      },
      {
        name: 'Tsukiji Outer Market',
        description: 'A paradise for food lovers, this vibrant market offers fresh seafood, street food, and culinary delights. Experience authentic Japanese food culture.',
        category: 'Market',
        priceRange: '$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.6, count: 18700 },
        address: {
          street: '4 Chome Tsukiji',
          city: 'Tokyo',
          pincode: '104-0045',
          fullAddress: '4 Chome Tsukiji, Chuo City, Tokyo 104-0045'
        },
        coordinates: { latitude: 35.6654, longitude: 139.7707 },
        contactInfo: { website: 'https://www.tsukiji.or.jp' },
        images: [
          { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', alt: 'Tsukiji Market' }
        ]
      },
      {
        name: 'Tokyo Skytree',
        description: 'The world\'s tallest tower at 634 meters, offering panoramic views of Tokyo and beyond. Features observation decks, shopping, and dining.',
        category: 'Attraction',
        priceRange: '$$$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.5, count: 25600 },
        address: {
          street: '1-1-2 Oshiage',
          city: 'Tokyo',
          pincode: '131-0045',
          fullAddress: '1-1-2 Oshiage, Sumida City, Tokyo 131-0045'
        },
        coordinates: { latitude: 35.7101, longitude: 139.8107 },
        contactInfo: { phone: '+81-3-5302-3470', website: 'https://www.tokyo-skytree.jp' },
        images: [
          { url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800', alt: 'Tokyo Skytree' }
        ]
      }
    ],
    'Paris': [
      {
        name: 'Eiffel Tower',
        description: 'The iron lady of Paris, this iconic 330-meter tower offers stunning city views, fine dining, and represents the essence of Parisian romance and engineering excellence.',
        category: 'Monument',
        priceRange: '$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.8, count: 52000 },
        address: {
          street: 'Champ de Mars',
          city: 'Paris',
          pincode: '75007',
          fullAddress: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris'
        },
        coordinates: { latitude: 48.8584, longitude: 2.2945 },
        contactInfo: { phone: '+33-892-70-12-39', website: 'https://www.toureiffel.paris' },
        images: [
          { url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800', alt: 'Eiffel Tower' }
        ]
      },
      {
        name: 'Louvre Museum',
        description: 'The world\'s largest art museum, home to the Mona Lisa and thousands of priceless artworks spanning civilizations. A cultural treasure trove.',
        category: 'Museum',
        priceRange: '$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.7, count: 38900 },
        address: {
          street: 'Rue de Rivoli',
          city: 'Paris',
          pincode: '75001',
          fullAddress: 'Rue de Rivoli, 75001 Paris'
        },
        coordinates: { latitude: 48.8606, longitude: 2.3376 },
        contactInfo: { phone: '+33-1-40-20-53-17', website: 'https://www.louvre.fr' },
        images: [
          { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800', alt: 'Louvre Museum' }
        ]
      },
      {
        name: 'Le Jules Verne',
        description: 'Michelin-starred restaurant located in the Eiffel Tower, offering exquisite French cuisine with unparalleled views of Paris.',
        category: 'Restaurant',
        priceRange: '$$$$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.6, count: 3200 },
        address: {
          street: 'Eiffel Tower, 2nd Floor',
          city: 'Paris',
          pincode: '75007',
          fullAddress: 'Eiffel Tower, Avenue Gustave Eiffel, 75007 Paris'
        },
        coordinates: { latitude: 48.8584, longitude: 2.2945 },
        contactInfo: { phone: '+33-1-45-55-61-44', website: 'https://www.lejulesverne-paris.com' },
        images: [
          { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Fine Dining' }
        ]
      }
    ],
    'London': [
      {
        name: 'Tower of London',
        description: 'A historic fortress housing the Crown Jewels, with nearly 1000 years of royal history. Explore towers, learn about famous prisoners, and meet the Beefeaters.',
        category: 'Museum',
        priceRange: '$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.7, count: 31200 },
        address: {
          street: 'Tower Hill',
          city: 'London',
          pincode: 'EC3N 4AB',
          fullAddress: 'Tower Hill, London EC3N 4AB'
        },
        coordinates: { latitude: 51.5081, longitude: -0.0759 },
        contactInfo: { phone: '+44-20-3166-6000', website: 'https://www.hrp.org.uk/tower-of-london' },
        images: [
          { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', alt: 'Tower of London' }
        ]
      },
      {
        name: 'British Museum',
        description: 'One of the world\'s greatest museums, featuring artifacts from ancient civilizations including the Rosetta Stone and Egyptian mummies. Free admission.',
        category: 'Museum',
        priceRange: '$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.8, count: 42500 },
        address: {
          street: 'Great Russell Street',
          city: 'London',
          pincode: 'WC1B 3DG',
          fullAddress: 'Great Russell Street, London WC1B 3DG'
        },
        coordinates: { latitude: 51.5194, longitude: -0.1270 },
        contactInfo: { phone: '+44-20-7323-8299', website: 'https://www.britishmuseum.org' },
        images: [
          { url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', alt: 'British Museum' }
        ]
      },
      {
        name: 'Borough Market',
        description: 'London\'s oldest food market, offering gourmet produce, street food, and artisanal products. A foodie\'s paradise with over 1000 years of history.',
        category: 'Market',
        priceRange: '$$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.6, count: 15800 },
        address: {
          street: '8 Southwark Street',
          city: 'London',
          pincode: 'SE1 1TL',
          fullAddress: '8 Southwark Street, London SE1 1TL'
        },
        coordinates: { latitude: 51.5055, longitude: -0.0908 },
        contactInfo: { phone: '+44-20-7407-1002', website: 'https://boroughmarket.org.uk' },
        images: [
          { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', alt: 'Borough Market' }
        ]
      }
    ],
    'Dubai': [
      {
        name: 'Burj Khalifa',
        description: 'The world\'s tallest building at 828 meters, offering observation decks with stunning desert and ocean views. An architectural marvel and Dubai\'s crown jewel.',
        category: 'Attraction',
        priceRange: '$$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.9, count: 48200 },
        address: {
          street: '1 Sheikh Mohammed bin Rashid Blvd',
          city: 'Dubai',
          pincode: '00000',
          fullAddress: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai'
        },
        coordinates: { latitude: 25.1972, longitude: 55.2744 },
        contactInfo: { phone: '+971-4-888-8888', website: 'https://www.burjkhalifa.ae' },
        images: [
          { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', alt: 'Burj Khalifa' }
        ]
      },
      {
        name: 'Dubai Mall',
        description: 'One of the world\'s largest shopping malls featuring 1200+ stores, an aquarium, ice rink, and countless dining options. A shopping and entertainment destination.',
        category: 'Shopping',
        priceRange: '$$$',
        city: cityId,
        featured: true,
        status: 'active',
        rating: { average: 4.7, count: 35600 },
        address: {
          street: 'Financial Center Road',
          city: 'Dubai',
          pincode: '00000',
          fullAddress: 'Financial Center Road, Downtown Dubai'
        },
        coordinates: { latitude: 25.1975, longitude: 55.2796 },
        contactInfo: { phone: '+971-4-362-7500', website: 'https://thedubaimall.com' },
        images: [
          { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', alt: 'Dubai Mall' }
        ]
      },
      {
        name: 'Gold Souk',
        description: 'A traditional market featuring hundreds of retailers selling gold, diamonds, and precious stones. An authentic Dubai shopping experience.',
        category: 'Market',
        priceRange: '$$$$',
        city: cityId,
        featured: false,
        status: 'active',
        rating: { average: 4.4, count: 12300 },
        address: {
          street: 'Sikkat Al Khail Road',
          city: 'Dubai',
          pincode: '00000',
          fullAddress: 'Sikkat Al Khail Road, Deira, Dubai'
        },
        coordinates: { latitude: 25.2684, longitude: 55.3007 },
        contactInfo: { website: 'https://www.dubaigoldsouk.com' },
        images: [
          { url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800', alt: 'Gold Souk' }
        ]
      }
    ]
  };

  return placesByCity[cityName] || [];
};

// Seed database function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await City.deleteMany({});
    await Place.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert cities
    console.log('🏙️  Inserting cities...');
    const insertedCities = await City.insertMany(cities);
    console.log(`✅ Inserted ${insertedCities.length} cities\n`);

    // Insert places for each city
    console.log('🏢 Inserting places...');
    let totalPlaces = 0;
    
    for (const city of insertedCities) {
      const places = createPlacesForCity(city._id, city.name);
      if (places.length > 0) {
        await Place.insertMany(places);
        console.log(`   ✓ Added ${places.length} places to ${city.name}`);
        totalPlaces += places.length;
      }
    }
    
    console.log(`\n✅ Inserted ${totalPlaces} places in total\n`);

    // Display summary
    console.log('📊 SEEDING SUMMARY');
    console.log('═'.repeat(50));
    console.log(`Cities added: ${insertedCities.length}`);
    console.log(`Places added: ${totalPlaces}`);
    console.log(`Featured cities: ${insertedCities.filter(c => c.featured).length}`);
    console.log('═'.repeat(50));
    
    console.log('\n✨ Database seeding completed successfully!\n');

    // Show some sample data
    console.log('📋 Sample Cities:');
    insertedCities.slice(0, 5).forEach(city => {
      console.log(`   • ${city.name}, ${city.country} (${city.population.toLocaleString()} people)`);
    });

    console.log('\n🎉 All done! Your database is ready.\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
};

// Run the seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.connection.close();
  console.log('👋 Database connection closed');
  process.exit(0);
};

runSeed().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

