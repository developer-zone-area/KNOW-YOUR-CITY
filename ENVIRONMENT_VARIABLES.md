# 🔐 Environment Variables Configuration

## Quick Reference for Your Deployed Application

---

## 🌐 **Vercel (Frontend) Environment Variables**

### **Required:**

```env
REACT_APP_API_URL=https://know-your-city.onrender.com
```

### **How to Set:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `KNOW-YOUR-CITY`
3. Go to **Settings** → **Environment Variables**
4. Add the variable above
5. Click **Save**
6. Go to **Deployments** → Click **Redeploy** on latest deployment

### **Verify It's Set:**
- Open browser console on your deployed site
- Type: `console.log(process.env.REACT_APP_API_URL)`
- Should show: `https://know-your-city.onrender.com`

---

## ⚙️ **Render (Backend) Environment Variables**

### **Required:**

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/know-your-city?retryWrites=true&w=majority&appName=knowYourCity

JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-12345

NODE_ENV=production

PORT=10000

CLIENT_URL=https://know-your-city-theta.vercel.app
```

### **Optional (for OAuth):**

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### **How to Set:**
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Select your web service: `KNOW-YOUR-CITY`
3. Go to **Environment** tab (left sidebar)
4. Click **Add Environment Variable**
5. Add each variable with its value
6. Click **Save Changes**
7. Render will auto-redeploy

### **Verify It's Set:**
- Go to **Logs** tab in Render
- Look for: `✅ Connected to MongoDB Atlas successfully!`
- Should show: `Server is running on port 10000`

---

## ⚠️ **CRITICAL: Update CLIENT_URL on Render**

**This is the most important step to connect your frontend and backend!**

### **Current Value (Default):**
```
CLIENT_URL=http://localhost:3000
```

### **Update To:**
```
CLIENT_URL=https://know-your-city-theta.vercel.app
```

**⚠️ No trailing slash!**

### **Steps:**
1. Go to Render Dashboard
2. Click on your service
3. Go to **Environment** tab
4. Find **CLIENT_URL** variable
5. Click **Edit** (pencil icon)
6. Change value to: `https://know-your-city-theta.vercel.app`
7. Click **Save**
8. Wait for redeploy (~30 seconds)

---

## 🧪 **Testing Environment Variables**

### **Test Frontend:**
1. Open: [https://know-your-city-theta.vercel.app/](https://know-your-city-theta.vercel.app/)
2. Open Browser Console (F12)
3. Check for API calls to `https://know-your-city.onrender.com`
4. No CORS errors should appear

### **Test Backend:**
1. Open: [https://know-your-city.onrender.com/](https://know-your-city.onrender.com/)
2. Should show: `{"message":"Know Your City API Server is running!"}`
3. Test API: [https://know-your-city.onrender.com/api/cities](https://know-your-city.onrender.com/api/cities)
4. Should show cities data

---

## 🔄 **Updating Environment Variables**

### **When You Need to Update:**

**Scenario 1: Change Backend URL**
1. Update `REACT_APP_API_URL` in Vercel
2. Redeploy frontend

**Scenario 2: Change Frontend URL**
1. Update `CLIENT_URL` in Render
2. Backend auto-redeploys

**Scenario 3: Change MongoDB Password**
1. Update `MONGODB_URI` in Render
2. Backend auto-redeploys

**Scenario 4: Add OAuth**
1. Get OAuth credentials from Google/Facebook
2. Add OAuth variables to Render
3. Backend auto-redeploys
4. OAuth login will work

---

## 🔍 **Common Issues**

### **Issue: CORS Errors in Browser Console**
**Cause:** `CLIENT_URL` on Render doesn't match your Vercel URL  
**Solution:** Update `CLIENT_URL` to exact Vercel URL (no trailing slash)

### **Issue: API Calls Return 404**
**Cause:** `REACT_APP_API_URL` not set or incorrect  
**Solution:** Verify it's set to `https://know-your-city.onrender.com`

### **Issue: MongoDB Connection Failed**
**Cause:** Invalid `MONGODB_URI`  
**Solution:** Check connection string format and credentials

### **Issue: JWT Authentication Not Working**
**Cause:** `JWT_SECRET` not set  
**Solution:** Add `JWT_SECRET` with a strong random string

---

## 📋 **Environment Variables Checklist**

### **Vercel (1 variable):**
- [ ] REACT_APP_API_URL ✅

### **Render (5 required + 4 optional):**
**Required:**
- [ ] MONGODB_URI ✅
- [ ] JWT_SECRET ✅
- [ ] NODE_ENV ✅
- [ ] PORT ✅
- [ ] CLIENT_URL ⚠️ (Must update to Vercel URL)

**Optional:**
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] FACEBOOK_APP_ID
- [ ] FACEBOOK_APP_SECRET

---

## 🎯 **Expected Behavior After Correct Setup**

- ✅ Frontend loads without errors
- ✅ API calls succeed
- ✅ No CORS errors
- ✅ User authentication works
- ✅ Data loads from MongoDB
- ✅ Admin panel accessible

---

## 📞 **Need Help?**

If environment variables aren't working:
1. Check spelling and formatting
2. Verify no extra spaces
3. Ensure no trailing slashes in URLs
4. Check Render/Vercel logs for errors
5. Redeploy after changes

---

**🎉 Once all environment variables are set correctly, your app will work perfectly!**
