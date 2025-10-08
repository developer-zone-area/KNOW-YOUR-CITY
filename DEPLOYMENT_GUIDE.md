# 🚀 Deployment Guide - Know Your City

This guide will help you deploy your Know Your City MERN stack application to free hosting platforms.

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (already set up)
- Accounts on deployment platforms

## 🎯 Recommended Deployment Strategy

**Frontend:** Vercel (Free)  
**Backend:** Railway (Free tier)  
**Database:** MongoDB Atlas (Already configured)

---

## 🌐 **Option 1: Vercel + Railway (Recommended)**

### **Step 1: Deploy Backend to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Railway will auto-detect Node.js**
6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://anand:anand@knowyourcity.owqosna.mongodb.net/know-your-city?retryWrites=true&w=majority&appName=knowYourCity
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   CLIENT_URL=https://your-vercel-app.vercel.app
   NODE_ENV=production
   PORT=5000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   ```
7. **Deploy and get your backend URL (e.g., `https://your-app.railway.app`)**

### **Step 2: Deploy Frontend to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project" → Import your repository**
4. **Vercel will auto-detect React**
5. **Add Environment Variable:**
   ```
   REACT_APP_API_URL=https://your-railway-backend-url
   ```
6. **Deploy and get your frontend URL (e.g., `https://your-app.vercel.app`)**

### **Step 3: Update Backend CORS**

1. **In Railway dashboard, update environment variable:**
   ```
   CLIENT_URL=https://your-vercel-frontend-url
   ```
2. **Redeploy backend**

---

## 🌐 **Option 2: Netlify + Render**

### **Step 1: Deploy Backend to Render**

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New" → "Web Service"**
4. **Connect your repository**
5. **Configure:**
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://anand:anand@knowyourcity.owqosna.mongodb.net/know-your-city?retryWrites=true&w=majority&appName=knowYourCity
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   CLIENT_URL=https://your-netlify-app.netlify.app
   NODE_ENV=production
   PORT=10000
   ```
7. **Deploy and get your backend URL**

### **Step 2: Deploy Frontend to Netlify**

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up with GitHub**
3. **Click "New site from Git"**
4. **Select your repository**
5. **Configure:**
   - **Build Command:** `cd client && npm run build`
   - **Publish Directory:** `client/build`
6. **Add Environment Variable:**
   ```
   REACT_APP_API_URL=https://your-render-backend-url
   ```
7. **Deploy and get your frontend URL**

---

## 🔧 **Environment Variables Reference**

### **Backend (.env)**
```env
MONGODB_URI=mongodb+srv://anand:anand@knowyourcity.owqosna.mongodb.net/know-your-city?retryWrites=true&w=majority&appName=knowYourCity
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
CLIENT_URL=https://your-frontend-url.com
NODE_ENV=production
PORT=5000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 🎉 **Expected Results**

After deployment, you'll have:
- **✅ Live Frontend:** `https://your-app.vercel.app`
- **✅ Live Backend:** `https://your-app.railway.app`
- **✅ Database:** MongoDB Atlas (already connected)
- **✅ Admin Panel:** `https://your-app.vercel.app/admin`
- **✅ API Endpoints:** `https://your-app.railway.app/api/`

---

## 🚨 **Important Notes**

1. **Replace placeholder URLs** with your actual deployment URLs
2. **Keep your MongoDB credentials secure** - don't share them publicly
3. **Test all functionality** after deployment
4. **Update OAuth redirect URLs** in Google/Facebook developer consoles
5. **Monitor your free tier limits** on each platform

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:** Make sure `CLIENT_URL` in backend matches your frontend URL
2. **Build Failures:** Check that all dependencies are in `package.json`
3. **Environment Variables:** Ensure all required variables are set
4. **Database Connection:** Verify MongoDB Atlas connection string

### **Testing Your Deployment:**

1. **Visit your frontend URL**
2. **Try registering a new user**
3. **Test city and place browsing**
4. **Test admin panel (if you have admin access)**
5. **Check browser console for errors**

---

## 💰 **Cost Breakdown**

**Free Tiers:**
- **Vercel:** Free for personal projects
- **Railway:** $5 credit monthly (usually enough for small apps)
- **MongoDB Atlas:** Free 512MB
- **Total Cost:** $0/month

---

## 🎯 **Quick Commands**

### **For Railway (Backend):**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### **For Vercel (Frontend):**
```bash
npm install -g vercel
vercel --prod
```

---

## 📞 **Support**

If you encounter any issues:
1. Check the platform's documentation
2. Review the error logs in your deployment dashboard
3. Ensure all environment variables are correctly set
4. Test locally first to isolate issues

**Happy Deploying! 🚀**
