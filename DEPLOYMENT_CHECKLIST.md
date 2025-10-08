# ✅ Deployment Checklist

## 📋 Pre-Flight Check

Before configuring environment variables, verify:

- ✅ Backend is live: https://know-your-city.onrender.com
- ✅ Frontend is live: https://know-your-city-theta.vercel.app/
- ✅ All code changes have been committed
- ✅ `vercel.json` is updated (done)
- ✅ API configuration files created (done)

---

## 🚀 Deployment Steps

### Step 1: Vercel Configuration ⚡
**Time: 2 minutes | Priority: HIGH**

1. Go to: https://vercel.com/dashboard
2. Select project: **know-your-city-theta**
3. Settings → Environment Variables → Add New:
   ```
   REACT_APP_API_URL=https://know-your-city.onrender.com
   ```
4. Select: Production ✓ Preview ✓ Development ✓
5. Save
6. Deployments → Redeploy latest

**Status**: ⬜ Not Done | ⬜ In Progress | ⬜ Complete

---

### Step 2: Render Configuration 🔧
**Time: 2 minutes | Priority: HIGH**

1. Go to: https://dashboard.render.com
2. Select service: **know-your-city**
3. Environment → Add Environment Variable:
   ```
   CLIENT_URL=https://know-your-city-theta.vercel.app
   ```
4. Save Changes (auto-deploys)

**Status**: ⬜ Not Done | ⬜ In Progress | ⬜ Complete

---

### Step 3: Wait for Deployments ⏳
**Time: 3-5 minutes**

- ⬜ Vercel deployment complete (check Deployments tab)
- ⬜ Render deployment complete (check status badge)

---

### Step 4: Verification ✅
**Time: 2 minutes**

Test your deployment:

#### 4.1 Basic Functionality
- ⬜ Visit https://know-your-city-theta.vercel.app/
- ⬜ Page loads without errors
- ⬜ Hero carousel visible
- ⬜ Statistics show numbers (not 0s)
- ⬜ Featured cities displayed

#### 4.2 Navigation
- ⬜ Click "View All Cities" - loads cities
- ⬜ Click "Places" in nav - loads places
- ⬜ Search works
- ⬜ Filters work

#### 4.3 Technical Check (F12)
- ⬜ Open DevTools (F12)
- ⬜ Console: No CORS errors
- ⬜ Network: API calls to `https://know-your-city.onrender.com/api/...`
- ⬜ Network: All requests show 200 status
- ⬜ Console test: `process.env.REACT_APP_API_URL` shows backend URL

#### 4.4 Pages Check
- ⬜ Home page works
- ⬜ Cities page works
- ⬜ Places page works
- ⬜ Individual city detail page works
- ⬜ Individual place detail page works
- ⬜ Login page works
- ⬜ Register page works

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

### Data Not Showing
- ⬜ Environment variable added on Vercel?
- ⬜ All environments selected (Prod, Preview, Dev)?
- ⬜ Redeployed after adding variable?
- ⬜ Backend is awake? (visit https://know-your-city.onrender.com)
- ⬜ Waited for Render to wake up? (~30 seconds first request)

### CORS Errors
- ⬜ CLIENT_URL added on Render?
- ⬜ CLIENT_URL exactly matches Vercel URL?
- ⬜ No trailing slash in CLIENT_URL?
- ⬜ Render service redeployed?

### Build Errors on Vercel
- ⬜ `vercel.json` properly configured?
- ⬜ All dependencies in `client/package.json`?
- ⬜ Build succeeds locally? (`cd client && npm run build`)

### 404 Errors
- ⬜ Vercel rewrites configured in `vercel.json`?
- ⬜ Backend routes working? Test: https://know-your-city.onrender.com/api/cities

---

## 📊 Environment Variables Summary

### Vercel (Frontend)
```bash
REACT_APP_API_URL=https://know-your-city.onrender.com
```

### Render (Backend)
```bash
CLIENT_URL=https://know-your-city-theta.vercel.app
NODE_ENV=production
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

**Note**: MONGODB_URI and JWT_SECRET should already be set from initial deployment.

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ All items in "Step 4: Verification" are checked  
✅ No console errors  
✅ Data loads from MongoDB  
✅ All pages navigate correctly  
✅ Search and filters work  
✅ Images load properly  

---

## 📱 Additional Testing

After basic verification passes:

### Browser Testing
- ⬜ Chrome/Chromium
- ⬜ Firefox
- ⬜ Safari
- ⬜ Edge

### Mobile Testing
- ⬜ Mobile Chrome
- ⬜ Mobile Safari
- ⬜ Responsive design works
- ⬜ Touch interactions work

### Performance
- ⬜ Page loads in < 3 seconds
- ⬜ Images load properly
- ⬜ No layout shifts
- ⬜ Smooth scrolling

---

## 🔄 Re-deployment Process

If you need to redeploy in the future:

### For Code Changes
1. Commit and push to Git
2. Vercel auto-deploys (if connected to Git)
3. Or manually: Vercel Dashboard → Deployments → Redeploy

### For Environment Variable Changes
1. Update in platform dashboard (Vercel or Render)
2. Redeploy the service
3. Clear browser cache
4. Test

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Project Guides**: 
  - `START_HERE_DEPLOYMENT.md` - Quick setup
  - `PRODUCTION_DEPLOYMENT_COMPLETE.md` - Detailed guide
  - `VERCEL_DEPLOYMENT_SETUP.md` - Vercel-specific

---

## 🎉 Completion

Once all checkboxes are ticked:

✅ **Your app is live and fully functional!**

**Share your app**: https://know-your-city-theta.vercel.app/

---

**Last Updated**: After configuring API connection and Vercel build settings
**Next Step**: Follow `START_HERE_DEPLOYMENT.md` to configure environment variables

