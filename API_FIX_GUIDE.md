# API Configuration Fix - Complete Guide

## What Was Fixed

The web app wasn't displaying data because it was using relative API paths (like `/api/cities`) which only work in development with the proxy setting. For production or when running the built app, you need to configure the full API URL.

## Changes Made

1. **Created API Configuration** (`client/src/config/api.js`)
   - Created a centralized axios instance with configurable base URL
   - Added automatic token injection for authenticated requests
   - Uses `REACT_APP_API_URL` environment variable

2. **Updated All Components**
   - Updated all pages to use the new `api` instance instead of `axios`
   - Files updated:
     - `client/src/contexts/AuthContext.js`
     - `client/src/pages/Home.js`
     - `client/src/pages/Cities.js`
     - `client/src/pages/Places.js`
     - `client/src/pages/CityDetail.js`
     - `client/src/pages/PlaceDetail.js`
     - `client/src/pages/admin/AdminUsers.js`
     - `client/src/pages/admin/AdminReviews.js`
     - `client/src/pages/admin/AdminCities.js`
     - `client/src/pages/admin/AdminPlaces.js`
     - `client/src/pages/admin/AdminDashboard.js`

## How to Set Up

### For Local Development

1. **Create a `.env` file in the `client` folder:**
   ```bash
   cd client
   echo REACT_APP_API_URL=http://localhost:5000 > .env
   ```

   Or manually create `client/.env` with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

2. **Restart your React development server:**
   ```bash
   npm start
   ```

### For Production/Deployment

1. **Set the environment variable to your backend URL:**
   - If deploying on Vercel/Netlify:
     - Go to your project settings
     - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com`
   
   - If deploying on Render:
     - Go to Environment tab
     - Add: `REACT_APP_API_URL=https://your-backend-url.com`
   
   - If deploying on Railway:
     - Go to Variables tab
     - Add: `REACT_APP_API_URL=https://your-backend-url.com`

2. **Rebuild your app** with the new environment variable

### For Running Built App Locally

If you've already built the app and want to test it locally:

1. **Delete the old build:**
   ```bash
   cd client
   rm -rf build
   ```

2. **Create `.env` file** (as shown above)

3. **Rebuild the app:**
   ```bash
   npm run build
   ```

4. **Serve the build** (if testing locally):
   ```bash
   npx serve -s build
   ```

## Verification

1. **Check if the environment variable is loaded:**
   - Open browser console
   - Type: `console.log(process.env.REACT_APP_API_URL)`
   - Should show your API URL

2. **Check network requests:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Refresh the page
   - Look at API requests - they should now point to the full URL (e.g., `http://localhost:5000/api/cities`)

## Troubleshooting

### Data still not showing?

1. **Make sure your backend server is running:**
   ```bash
   cd server
   npm start
   ```

2. **Check CORS settings** in `server/index.js`:
   - Should have: `origin: process.env.CLIENT_URL || 'http://localhost:3000'`
   - For production, set `CLIENT_URL` environment variable on your server

3. **Check the browser console** for errors:
   - Press F12
   - Look for red errors
   - Common issues:
     - CORS errors: Update server CORS settings
     - 404 errors: Check API URL is correct
     - Connection refused: Backend server not running

4. **Verify environment variable is set:**
   - In development: Check `.env` file exists in `client` folder
   - In production: Check deployment platform environment variables

5. **Clear cache and rebuild:**
   ```bash
   cd client
   rm -rf node_modules build
   npm install
   npm start
   ```

### Environment variable not being recognized?

- **Must start with `REACT_APP_`** - This is a Create React App requirement
- **Must restart dev server** after changing `.env` file
- **Must rebuild** production app after changing environment variables

## Example Setup for Different Scenarios

### Scenario 1: Local Development (Default)
```
Client: http://localhost:3000
Server: http://localhost:5000
.env: REACT_APP_API_URL=http://localhost:5000
```

### Scenario 2: Local with Different Port
```
Client: http://localhost:3000
Server: http://localhost:8080
.env: REACT_APP_API_URL=http://localhost:8080
```

### Scenario 3: Production Deployment
```
Client: https://your-app.vercel.app
Server: https://your-api.railway.app
Environment Variable: REACT_APP_API_URL=https://your-api.railway.app
```

### Scenario 4: Same Domain (Backend serves frontend)
```
Both on same domain: https://your-app.com
Environment Variable: REACT_APP_API_URL=https://your-app.com
```

## Quick Start

**For immediate testing:**

1. Open terminal in the project root
2. Run these commands:
   ```bash
   # Navigate to client folder
   cd client
   
   # Create .env file
   echo REACT_APP_API_URL=http://localhost:5000 > .env
   
   # Start the client (in a new terminal)
   npm start
   ```

3. In another terminal:
   ```bash
   # Navigate to server folder
   cd server
   
   # Start the server
   npm start
   ```

4. Open http://localhost:3000 and data should now be visible!

## Support

If you're still experiencing issues after following this guide:
1. Check that both client and server are running
2. Verify the `.env` file is in the `client` folder (not the root)
3. Check browser console for specific error messages
4. Verify the API URL in the environment variable is correct

