# 🚀 Production Deployment - Complete Setup Guide

## Your Deployment Information

| Component | Platform | URL | Status |
|-----------|----------|-----|--------|
| **Backend API** | Render | https://know-your-city.onrender.com | ✅ Working |
| **Frontend Web App** | Vercel | https://know-your-city-theta.vercel.app/ | ⚠️ Needs Configuration |

## 🎯 What You Need to Do

Your deployments are live, but they need to be connected. Follow these **2 simple steps**:

---

## Step 1: Configure Vercel (Frontend) ⚡

Your frontend needs to know where your backend is.

### Instructions:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your project: **know-your-city-theta**

2. **Add Environment Variable**
   - Click **Settings** (top menu)
   - Click **Environment Variables** (left sidebar)
   - Click **Add New** button
   
   Add this variable:
   ```
   Name:  REACT_APP_API_URL
   Value: https://know-your-city.onrender.com
   ```
   
   - ✅ Check all three environments: **Production**, **Preview**, **Development**
   - Click **Save**

3. **Redeploy Your Application**
   - Click **Deployments** tab (top menu)
   - Find your latest deployment
   - Click the **⋮** (three dots) on the right
   - Click **Redeploy**
   - Click **Redeploy** again to confirm
   
4. **Wait for Deployment** (~1-2 minutes)
   - Watch the deployment logs
   - Once it says "Deployment Complete", proceed to Step 2

**Screenshot Guide:**
```
Vercel Dashboard → Your Project → Settings → Environment Variables → Add New

Name:  REACT_APP_API_URL
Value: https://know-your-city.onrender.com
Environments: [x] Production  [x] Preview  [x] Development

[Save] button
```

---

## Step 2: Configure Render (Backend) 🔧

Your backend needs to allow requests from your Vercel domain.

### Instructions:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click on your service: **know-your-city** (or whatever you named it)

2. **Add Environment Variable**
   - Click **Environment** tab (left sidebar)
   - Click **Add Environment Variable** button
   
   Add this variable:
   ```
   Key:   CLIENT_URL
   Value: https://know-your-city-theta.vercel.app
   ```
   
   - Click **Save Changes**

3. **Wait for Auto-Deploy** (~2-3 minutes)
   - Render will automatically redeploy your service
   - Wait for the status to show "Live" again

**Screenshot Guide:**
```
Render Dashboard → Your Service → Environment → Add Environment Variable

Key:   CLIENT_URL
Value: https://know-your-city-theta.vercel.app

[Save Changes] button
```

---

## ✅ Verification (Test Your Deployment)

After both deployments complete:

### Test 1: Visit Your Website
1. Open: https://know-your-city-theta.vercel.app/
2. You should see:
   - ✅ Hero carousel with images
   - ✅ Statistics showing numbers (Cities, Places, Users, Reviews)
   - ✅ Featured cities section
   - ✅ "How It Works" section

### Test 2: Check Network Requests
1. Press **F12** to open Developer Tools
2. Click **Network** tab
3. Refresh the page
4. Look for requests to `https://know-your-city.onrender.com/api/...`
5. They should all show status **200** (green)

### Test 3: Browse the App
1. Click **View All Cities** button
2. Cities should load and display
3. Click **Places** in navigation
4. Places should load
5. Try searching for cities or places

### Test 4: Check Console (No Errors)
1. Press **F12**
2. Click **Console** tab
3. Should see minimal or no red errors
4. Type: `console.log(process.env.REACT_APP_API_URL)`
5. Should show: `https://know-your-city.onrender.com`

---

## 🐛 Troubleshooting

### Issue: Data Not Showing

**Check 1: Environment Variable on Vercel**
- Did you add `REACT_APP_API_URL` on Vercel?
- Did you select all environments (Production, Preview, Development)?
- Did you redeploy after adding it?

**Check 2: Backend is Awake**
- Visit: https://know-your-city.onrender.com
- Should show: `{"message":"Know Your City API Server is running!"}`
- Render free tier sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up
- Refresh your Vercel site after backend wakes

**Check 3: CORS Configuration**
- Did you add `CLIENT_URL` on Render?
- Check browser console (F12) for CORS errors
- Make sure the CLIENT_URL exactly matches your Vercel URL (no trailing slash)

### Issue: CORS Error in Browser Console

If you see: `Access to fetch at 'https://know-your-city.onrender.com/api/...' from origin 'https://know-your-city-theta.vercel.app' has been blocked by CORS policy`

**Solution:**
1. Go to Render dashboard
2. Check `CLIENT_URL` is set to: `https://know-your-city-theta.vercel.app`
3. Make sure there's no trailing slash (`/`)
4. Save and wait for redeploy

### Issue: "undefined" When Checking Environment Variable

If `console.log(process.env.REACT_APP_API_URL)` shows `undefined`:

**Solution:**
1. The environment variable wasn't set correctly on Vercel
2. Go back to Vercel → Settings → Environment Variables
3. Make sure it's spelled exactly: `REACT_APP_API_URL`
4. Make sure Production is checked
5. Redeploy the application

### Issue: 404 Errors on API Requests

If API requests show 404 in Network tab:

**Solution:**
1. Check the backend is running: https://know-your-city.onrender.com/api/cities
2. Should return a list of cities (even if empty: `[]`)
3. If shows 404, your backend routes might not be deployed correctly
4. Check Render logs for errors

---

## 🎉 Success Checklist

After completing both steps, verify:

- ✅ Vercel environment variable `REACT_APP_API_URL` is set
- ✅ Render environment variable `CLIENT_URL` is set
- ✅ Both services have been redeployed
- ✅ https://know-your-city-theta.vercel.app/ shows data
- ✅ No CORS errors in browser console
- ✅ API requests return 200 status
- ✅ Cities and Places pages work

---

## 📊 Quick Reference

### Vercel Environment Variable
```
REACT_APP_API_URL=https://know-your-city.onrender.com
```

### Render Environment Variable
```
CLIENT_URL=https://know-your-city-theta.vercel.app
```

### Test URLs
- Frontend: https://know-your-city-theta.vercel.app/
- Backend: https://know-your-city.onrender.com
- API Test: https://know-your-city.onrender.com/api/cities

---

## 🚀 Quick Start (TL;DR)

1. **Vercel**: Add env var `REACT_APP_API_URL` = `https://know-your-city.onrender.com` → Redeploy
2. **Render**: Add env var `CLIENT_URL` = `https://know-your-city-theta.vercel.app` → Save
3. **Wait**: ~3-5 minutes total for both to deploy
4. **Test**: Visit https://know-your-city-theta.vercel.app/
5. **Done!** 🎉

---

## 📱 Mobile-Friendly Note

Your app should work on mobile devices too! After setup, test on:
- Mobile browsers (Chrome, Safari)
- Different screen sizes
- Touch interactions

---

## 🔐 Security Note

Your current setup is secure:
- ✅ HTTPS on both frontend and backend
- ✅ Environment variables keep secrets safe
- ✅ CORS properly configured
- ✅ Credentials support enabled

---

## 💡 Pro Tips

1. **Monitor Your Backend**: Render free tier sleeps after inactivity
   - Consider upgrading for 24/7 uptime
   - Or use a cron job to ping it every 10 minutes

2. **Custom Domain**: You can add a custom domain on both Vercel and Render
   - Update environment variables accordingly

3. **Environment Variables**: Never commit `.env` files to Git
   - They're already in `.gitignore`
   - Always use platform dashboards for production

4. **Logs**: Both platforms have great logging
   - Vercel: Deployments → Click deployment → Logs
   - Render: Your Service → Logs tab

---

**Need help?** Check the troubleshooting section above or open your browser console (F12) for specific error messages.

**Ready?** Start with Step 1 now! ⬆️

