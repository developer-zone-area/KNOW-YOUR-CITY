# 🚀 START HERE - Connect Your Deployed App

## Current Status

✅ **Backend**: https://know-your-city.onrender.com - **WORKING**  
⚠️ **Frontend**: https://know-your-city-theta.vercel.app/ - **NEEDS CONFIGURATION**

---

## 🎯 2-Minute Setup (DO THIS NOW)

### 1️⃣ Configure Vercel (1 minute)

**Go to**: https://vercel.com/dashboard

1. Click your project: **know-your-city-theta**
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://know-your-city.onrender.com`
   - Check: ✅ Production ✅ Preview ✅ Development
5. Click **Save**
6. Go to **Deployments** → Click **⋮** → **Redeploy**

---

### 2️⃣ Configure Render (1 minute)

**Go to**: https://dashboard.render.com

1. Click your service: **know-your-city**
2. Click **Environment** tab
3. Click **Add Environment Variable**
4. Enter:
   - **Key**: `CLIENT_URL`
   - **Value**: `https://know-your-city-theta.vercel.app`
5. Click **Save Changes** (auto-deploys)

---

## ✅ Test (30 seconds)

Wait 2-3 minutes for deployments, then:

1. Open: https://know-your-city-theta.vercel.app/
2. You should see **real data** (cities, places, statistics)
3. Press **F12** → Check for errors (should be none)

---

## ✨ That's It!

Your app is now connected and working in production! 🎉

**Detailed guide**: See `PRODUCTION_DEPLOYMENT_COMPLETE.md` for troubleshooting and more info.

---

## 📸 Visual Guide

**Vercel Dashboard:**
```
Dashboard → know-your-city-theta → Settings → Environment Variables

┌─────────────────────────────────────────────────────────┐
│ Name:  REACT_APP_API_URL                                │
│ Value: https://know-your-city.onrender.com              │
│ [x] Production  [x] Preview  [x] Development            │
│                                          [Save] button   │
└─────────────────────────────────────────────────────────┘
```

**Render Dashboard:**
```
Dashboard → know-your-city → Environment

┌─────────────────────────────────────────────────────────┐
│ Key:   CLIENT_URL                                        │
│ Value: https://know-your-city-theta.vercel.app          │
│                                   [Save Changes] button  │
└─────────────────────────────────────────────────────────┘
```

---

**Questions?** Check `PRODUCTION_DEPLOYMENT_COMPLETE.md` for detailed troubleshooting.

