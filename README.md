# 🌆 Know Your City

A comprehensive MERN stack application for discovering and exploring cities and places around the world. Built with modern technologies and featuring a complete admin management system.

![Know Your City](https://img.shields.io/badge/Know%20Your%20City-MERN%20Stack-blue)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18+-000000?logo=express)

## 🌐 Live Demo

- **🌐 Frontend:** [https://know-your-city-theta.vercel.app/](https://know-your-city-theta.vercel.app/)
- **⚙️ Backend API:** [https://know-your-city.onrender.com/](https://know-your-city.onrender.com/)
- **📊 Admin Panel:** [https://know-your-city-theta.vercel.app/admin](https://know-your-city-theta.vercel.app/admin)

## 🚀 Features

### 🌐 **Public Features**
- **🏙️ City Discovery** - Browse 18+ cities with detailed information
- **🏢 Place Exploration** - Discover 49+ places with images and descriptions
- **🔍 Advanced Search** - Search cities and places by name, location, or category
- **⭐ Rating System** - View and submit reviews for places
- **📱 Responsive Design** - Mobile-first, works on all devices
- **🔐 User Authentication** - Secure login/register with OAuth support

### 👨‍💼 **Admin Features**
- **📊 Admin Dashboard** - Comprehensive statistics and overview
- **🏙️ City Management** - Add, edit, and manage cities
- **🏢 Place Management** - Manage places and their details
- **👥 User Management** - View, edit roles, and manage users
- **📝 Review Moderation** - Approve, reject, and moderate reviews
- **🔐 Role-Based Access** - Secure admin-only features

### 🔐 **Authentication & Security**
- **🔑 JWT Authentication** - Secure token-based authentication
- **🌐 OAuth Integration** - Google and Facebook login (ready for setup)
- **👤 User Profiles** - Personal profiles with favorites and reviews
- **🛡️ Protected Routes** - Role-based access control
- **🔒 Admin Security** - Secure admin panel with authentication

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens
- **Passport.js** - Authentication middleware
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher)
- **npm** (v8.0 or higher)
- **MongoDB Atlas** account (free tier available)
- **Git** (for version control)

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/know-your-city.git
cd know-your-city
```

### 2. **Install Dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. **Environment Setup**
Create a `.env` file in the `server` directory:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/know-your-city?retryWrites=true&w=majority&appName=knowYourCity

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### 4. **Start the Application**
```bash
# Start both server and client (from root directory)
npm run dev

# Or start individually:
# Server only
cd server && npm start

# Client only
cd client && npm start
```

### 5. **Access the Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Admin Panel:** http://localhost:3000/admin

## 🗄️ Database Setup

### **MongoDB Atlas Setup**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Update the `MONGODB_URI` in your `.env` file

### **Database Collections**
The application automatically creates the following collections:
- **users** - User accounts and profiles
- **cities** - City information and metadata
- **places** - Places within cities
- **reviews** - User reviews and ratings

## 🔐 Authentication Setup

### **OAuth Configuration (Optional)**

#### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
6. Update `.env` with your credentials

#### **Facebook OAuth**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - `http://localhost:5000/api/auth/facebook/callback`
5. Update `.env` with your credentials

## 📱 Usage Guide

### **For Users**
1. **Browse Cities** - Visit the cities page to explore available cities
2. **Discover Places** - Click on a city to see places within it
3. **Create Account** - Register to save favorites and write reviews
4. **Write Reviews** - Share your experiences and rate places
5. **Manage Profile** - Update your profile and view your activity

### **For Admins**
1. **Access Admin Panel** - Login with admin credentials
2. **View Dashboard** - Check statistics and recent activity
3. **Manage Cities** - Add, edit, or remove cities
4. **Manage Places** - Add, edit, or remove places
5. **Moderate Users** - View, edit roles, or remove users
6. **Moderate Reviews** - Approve, reject, or delete reviews

## 🛣️ API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth

### **Cities**
- `GET /api/cities` - Get all cities
- `GET /api/cities/:id` - Get city by ID
- `GET /api/cities/:id/places` - Get places in city

### **Places**
- `GET /api/places` - Get all places
- `GET /api/places/:id` - Get place by ID
- `POST /api/places` - Create new place (admin)
- `PUT /api/places/:id` - Update place (admin)
- `DELETE /api/places/:id` - Delete place (admin)

### **Admin**
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/reviews` - Get all reviews
- `PUT /api/admin/reviews/:id/status` - Update review status
- `DELETE /api/admin/reviews/:id` - Delete review

## 🎨 Customization

### **Styling**
- Modify `client/src/index.css` for global styles
- Update `client/tailwind.config.js` for theme customization
- Edit individual component styles using Tailwind classes

### **Adding New Features**
1. Create new components in `client/src/components/`
2. Add new pages in `client/src/pages/`
3. Create API routes in `server/routes/`
4. Update models in `server/models/`

## 🚀 Deployment

### **Production Deployment Guide**

#### **Prerequisites**
- MongoDB Atlas database
- Vercel account (for frontend)
- Render account (for backend)

#### **Step 1: Backend Deployment (Render)**

1. **Create a New Web Service** on [Render](https://dashboard.render.com)
   - Connect your GitHub repository
   - Select the `server` directory as the root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Add Environment Variables** on Render:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/know-your-city
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=https://your-vercel-app.vercel.app
   PORT=5000
   ```

3. **Deploy** - Render will automatically deploy your backend

#### **Step 2: Frontend Deployment (Vercel)**

1. **Create a New Project** on [Vercel](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Framework Preset: Other
   - Root Directory: Leave as is (uses `vercel.json` config)

2. **Add Environment Variable** on Vercel:
   - Go to: Settings → Environment Variables → Add New
   ```
   Name:  REACT_APP_API_URL
   Value: https://your-render-service.onrender.com
   
   ✅ Production  ✅ Preview  ✅ Development
   ```

3. **Deploy** - Vercel will automatically build and deploy

#### **Step 3: Update Backend CORS**

After deploying frontend, update the `CLIENT_URL` on Render:
```
CLIENT_URL=https://your-vercel-app.vercel.app
```

#### **Step 4: Verification**

1. Visit your Vercel URL
2. Check that data loads (cities, places, statistics)
3. Test navigation and search
4. Verify no CORS errors in browser console (F12)

### **Local Development Setup**

Create `client/.env` for local development:
```env
REACT_APP_API_URL=http://localhost:5000
```

Create `server/.env`:
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### **Important Notes**

- ⚠️ **Never commit `.env` files** (already in `.gitignore`)
- ⚠️ **Always use HTTPS** in production URLs
- ⚠️ **Render free tier** sleeps after inactivity (~30 sec wake time)
- ✅ Environment variables must be set on both platforms
- ✅ Redeploy after changing environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

For comprehensive documentation, see the **[📖 Project Wiki](WIKI.md)**:
- Complete API documentation
- Components reference
- Database schema
- Deployment guide
- Map features guide
- Security best practices
- Troubleshooting & FAQ

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Project Wiki](WIKI.md) for detailed documentation
2. Review the [Issues](https://github.com/yourusername/know-your-city/issues) page
3. Create a new issue with detailed information
4. Contact the development team

## 🎯 Roadmap

### **Upcoming Features**
- [x] **Interactive Maps** - ✅ Leaflet/OpenStreetMap integration (COMPLETED!)
- [ ] **Advanced Search Filters** - Filter by category, rating, distance
- [ ] **Social Features** - User following, social sharing
- [ ] **Mobile App** - React Native version
- [ ] **API Documentation** - Swagger/OpenAPI docs
- [ ] **Analytics Dashboard** - User behavior analytics
- [ ] **Multi-language Support** - Internationalization
- [ ] **Push Notifications** - Real-time updates

### **Technical Improvements**
- [ ] **Performance Optimization** - Code splitting, lazy loading
- [ ] **Testing Suite** - Unit and integration tests
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Monitoring** - Error tracking and performance monitoring
- [ ] **Security Enhancements** - Rate limiting, input sanitization

## 📊 Project Structure

```
know-your-city/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads
│   └── index.js          # Server entry point
├── package.json          # Root package.json
└── README.md
```

## 🏆 Acknowledgments

- **MongoDB Atlas** for providing the database service
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing frontend library
- **Express.js** for the robust backend framework
- **All Contributors** who helped make this project possible

---

**Made with ❤️ by the Know Your City Team**

*Discover the world, one city at a time!* 🌍