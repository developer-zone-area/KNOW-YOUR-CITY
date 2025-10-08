# 🚀 Vercel Deployment Setup - Connect Frontend to Backend

## Your Deployment URLs
- **Frontend (Vercel)**: https://know-your-city-theta.vercel.app/
- **Backend (Render)**: https://know-your-city.onrender.com

## 🎯 What Needs to Be Done

Your backend is working perfectly, but your Vercel frontend doesn't know where to find it. You need to add an environment variable to Vercel.

## 📝 Step-by-Step Instructions

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `know-your-city-theta`

2. **Navigate to Settings**
   - Click on the **Settings** tab at the top

3. **Add Environment Variable**
   - In the left sidebar, click **Environment Variables**
   - Click **Add New**
   - Fill in:
     ```
     Name:  REACT_APP_API_URL
     Value: https://know-your-city.onrender.com
     ```
   - Select all environments: **Production**, **Preview**, and **Development**
   - Click **Save**

4. **Redeploy Your Application**
   - Go to the **Deployments** tab
   - Find the latest deployment
   - Click the **⋮** (three dots) menu
   - Click **Redeploy**
   - ✅ Check **Use existing Build Cache** (faster)
   - Click **Redeploy**

5. **Wait for Deployment** (usually 1-2 minutes)
   - Once complete, visit https://know-your-city-theta.vercel.app/
   - Your data should now be visible! 🎉

### Option 2: Via Vercel CLI (Alternative)

If you prefer using the command line:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variable
vercel env add REACT_APP_API_URL

# When prompted, enter: https://know-your-city.onrender.com
# Select all environments (Production, Preview, Development)

# Redeploy
vercel --prod
```

### Option 3: Update and Push to Git (Automatic)

If your Vercel is connected to your Git repository:

1. The `.env.production` file has been created in your `client` folder
2. Commit and push to your repository:
   ```bash
   git add .
   git commit -m "Configure production API URL for Vercel"
   git push
   ```
3. Vercel will automatically detect the push and redeploy
4. **Note**: You still need to add the environment variable in Vercel dashboard (Option 1)

## 🔧 Backend CORS Configuration

Your backend also needs to allow requests from your Vercel domain. Let me check and update that.

### Update Server CORS (if needed)

If you see CORS errors after deployment, update your `server/index.js` or set environment variable on Render:

**On Render Dashboard:**
1. Go to your Render service: https://dashboard.render.com
2. Click on your `know-your-city` service
3. Go to **Environment** tab
4. Add environment variable:
   ```
   CLIENT_URL=https://know-your-city-theta.vercel.app
   ```
5. Click **Save Changes**
6. Service will automatically redeploy

## ✅ Verification Steps

After redeploying on Vercel:

1. **Visit your site**: https://know-your-city-theta.vercel.app/

2. **Check if data is loading**:
   - You should see statistics (Cities, Places, Users counts)
   - Featured cities should appear
   - Navigation should work

3. **Check browser console** (F12):
   - Press F12 to open Developer Tools
   - Look at the **Console** tab
   - Should NOT see CORS errors
   - Look at the **Network** tab
   - API requests should go to `https://know-your-city.onrender.com/api/...`
   - Requests should return status 200

4. **Test the environment variable**:
   - Open browser console on your Vercel site
   - Type: `console.log(process.env.REACT_APP_API_URL)`
   - If it shows `undefined`, the environment variable isn't set yet

## 🐛 Troubleshooting

### Problem: Data still not showing

**Solution 1: Environment Variable Not Set**
- Make sure you added `REACT_APP_API_URL` in Vercel dashboard
- Make sure you selected all environments (Production, Preview, Development)
- Make sure you redeployed after adding the variable

**Solution 2: CORS Error**
- Check browser console for errors like "blocked by CORS policy"
- Add `CLIENT_URL` environment variable on Render (see above)
- Redeploy your backend

**Solution 3: Cache Issues**
- Clear your browser cache
- Try in incognito/private mode
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

**Solution 4: Backend Not Responding**
- Check if backend is awake: https://know-your-city.onrender.com
- Render free tier sleeps after inactivity - first request wakes it (takes ~30 seconds)
- Refresh your Vercel site after backend wakes up

### Problem: CORS Error in Console

Your backend CORS is currently set to allow `http://localhost:3000`. For production, you need to update it.

**Quick Fix:**
1. Go to Render dashboard
2. Add environment variable: `CLIENT_URL=https://know-your-city-theta.vercel.app`
3. Save and wait for redeploy

## 📱 Quick Summary

**To fix your deployed app RIGHT NOW:**

1. ✅ Go to https://vercel.com/dashboard
2. ✅ Click your project → Settings → Environment Variables
3. ✅ Add: `REACT_APP_API_URL` = `https://know-your-city.onrender.com`
4. ✅ Go to Deployments → Click ⋮ → Redeploy
5. ✅ Wait 1-2 minutes
6. ✅ Visit https://know-your-city-theta.vercel.app/ - Should work! 🎉

**Then, update backend CORS:**

1. ✅ Go to https://dashboard.render.com
2. ✅ Click your service → Environment
3. ✅ Add: `CLIENT_URL` = `https://know-your-city-theta.vercel.app`
4. ✅ Save (auto-deploy)
5. ✅ Done! 🚀

## 🎉 Expected Result

After following these steps, your deployed app at https://know-your-city-theta.vercel.app/ will:
- ✅ Show real data from your MongoDB database
- ✅ Display statistics, cities, and places
- ✅ Allow users to browse and search
- ✅ Work perfectly in production

## 📞 Need Help?

If you encounter any issues:
1. Check browser console (F12) for specific error messages
2. Verify environment variables are set correctly on both Vercel and Render
3. Make sure both deployments are complete and active
4. Test the backend directly: https://know-your-city.onrender.com/api/cities

---

**🚀 Ready to deploy?** Start with Option 1 above - it's the quickest way!

