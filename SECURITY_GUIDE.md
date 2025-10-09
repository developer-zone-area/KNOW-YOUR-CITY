# 🔐 Security Guide - Know Your City

## Table of Contents
1. [Environment Variables Security](#environment-variables-security)
2. [Password Encryption (Already Implemented)](#password-encryption)
3. [MongoDB Security](#mongodb-security)
4. [Advanced: Encrypted Environment Variables](#advanced-encrypted-environment-variables)
5. [Security Checklist](#security-checklist)

---

## 🔑 Environment Variables Security

### Current Setup (Standard Approach)

Your project uses the **standard industry approach**:

```
┌─────────────────────────────────────────────────┐
│  Development (.env file - NOT in Git)           │
│  MONGODB_URI=mongodb+srv://...                  │
│  JWT_SECRET=...                                 │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  Production (Platform Environment Variables)    │
│  Render/Vercel Dashboard → Environment Vars    │
└─────────────────────────────────────────────────┘
```

### ✅ What's Protected:

1. **`.env` files are in `.gitignore`**
   ```bash
   # Never committed to Git
   server/.env
   client/.env
   ```

2. **Template files use placeholders**
   ```bash
   # Committed to Git (safe)
   env.production.template
   ```

3. **Production uses platform environment variables**
   - Render: Dashboard → Environment Variables
   - Vercel: Settings → Environment Variables
   - These are encrypted at rest by the platform

---

## 🔒 Password Encryption (Already Implemented!)

Your application **already encrypts all user passwords** using bcrypt.

### How It Works:

```javascript
// server/models/User.js

// When user registers:
User: { password: "myPassword123" }
        ↓
   bcrypt.hash()
        ↓
DB: { password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy" }
```

### Security Features:

✅ **Hashing (not encryption)**
- One-way transformation
- Cannot be reversed
- Uses bcrypt with salt rounds: 10

✅ **Salting**
- Each password gets unique salt
- Prevents rainbow table attacks

✅ **Slow by design**
- Bcrypt is intentionally slow
- Makes brute force attacks impractical

### Example in Code:

```javascript
// Automatic hashing before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

---

## 🛡️ MongoDB Security

### Connection String Security

Your MongoDB connection string contains credentials:
```
mongodb+srv://username:password@cluster.mongodb.net/dbname
```

**How it's secured:**

1. **Environment Variables**
   ```bash
   # server/.env (NOT in Git)
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
   ```

2. **SSL/TLS Encryption in Transit**
   - MongoDB Atlas automatically uses SSL
   - Data is encrypted while traveling over the network

3. **Encryption at Rest**
   - MongoDB Atlas encrypts data on disk
   - Automatic with all Atlas tiers

### Best Practices:

```javascript
✅ Use strong passwords (16+ characters)
✅ Enable IP whitelist in MongoDB Atlas
✅ Create database-specific users (not admin)
✅ Rotate credentials every 90 days
✅ Use connection string with retryWrites=true
✅ Enable MongoDB Atlas audit logs
```

---

## 🔐 Advanced: Encrypted Environment Variables

If you want **additional encryption** for your `.env` files, here are options:

### Option 1: dotenv-vault (Recommended)

**What it does:**
- Encrypts your `.env` file
- Stores encrypted version in Git (safe!)
- Uses a master key to decrypt

**Setup:**

1. **Install dotenv-vault:**
   ```bash
   npm install dotenv-vault-core --save-dev
   ```

2. **Create encrypted .env:**
   ```bash
   npx dotenv-vault build
   ```

3. **This creates:**
   ```
   .env.vault       # Encrypted (safe to commit)
   .env.vault.key   # Master key (DO NOT COMMIT)
   ```

4. **Add to .gitignore:**
   ```bash
   .env.vault.key
   ```

5. **Update your code:**
   ```javascript
   // server/index.js
   require('dotenv-vault-core').config();
   // or
   require('dotenv').config();
   ```

6. **For production:**
   - Set environment variable: `DOTENV_KEY=<your-key>`
   - The vault will auto-decrypt

**Pros:**
✅ Encrypted .env can be committed to Git
✅ Easy team collaboration
✅ Works with existing dotenv code
✅ Free tier available

**Cons:**
❌ Adds complexity
❌ Need to manage master key

---

### Option 2: git-crypt

**What it does:**
- Encrypts specific files in Git
- Transparent encryption/decryption

**Setup:**

1. **Install git-crypt:**
   ```bash
   # Windows (with Chocolatey)
   choco install git-crypt

   # Mac
   brew install git-crypt

   # Linux
   apt-get install git-crypt
   ```

2. **Initialize:**
   ```bash
   cd your-repo
   git-crypt init
   ```

3. **Create `.gitattributes`:**
   ```bash
   .env filter=git-crypt diff=git-crypt
   server/.env filter=git-crypt diff=git-crypt
   ```

4. **Add collaborators:**
   ```bash
   git-crypt add-gpg-user USER_ID
   ```

**Pros:**
✅ Transparent encryption
✅ Works with any file
✅ No code changes needed

**Cons:**
❌ Requires GPG keys
❌ Complex setup
❌ Can break collaboration if not careful

---

### Option 3: AWS Secrets Manager (Production)

**For production deployments:**

1. **Store secrets in AWS:**
   ```bash
   aws secretsmanager create-secret \
     --name know-your-city/mongodb-uri \
     --secret-string "mongodb+srv://..."
   ```

2. **Update your code:**
   ```javascript
   const AWS = require('aws-sdk');
   const secretsManager = new AWS.SecretsManager();

   async function getSecret(secretName) {
     const data = await secretsManager
       .getSecretValue({ SecretId: secretName })
       .promise();
     return data.SecretString;
   }

   // Usage
   const MONGODB_URI = await getSecret('know-your-city/mongodb-uri');
   ```

**Pros:**
✅ Enterprise-grade security
✅ Automatic rotation
✅ Audit logging
✅ Fine-grained access control

**Cons:**
❌ Costs money (after free tier)
❌ Adds complexity
❌ Requires AWS account

---

## 📋 Security Checklist

### ✅ Already Implemented:

- [x] User passwords hashed with bcrypt
- [x] `.env` files in `.gitignore`
- [x] JWT authentication
- [x] CORS configured
- [x] MongoDB connection with SSL
- [x] Input validation (express-validator)

### 🔄 Recommended Improvements:

- [ ] **Rate Limiting** (prevent brute force)
  ```javascript
  const rateLimit = require('express-rate-limit');
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  
  app.use('/api/', limiter);
  ```

- [ ] **Helmet.js** (HTTP security headers)
  ```javascript
  const helmet = require('helmet');
  app.use(helmet());
  ```

- [ ] **Input Sanitization**
  ```javascript
  const mongoSanitize = require('express-mongo-sanitize');
  app.use(mongoSanitize());
  ```

- [ ] **HTTPS Only** (production)
  ```javascript
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    });
  }
  ```

- [ ] **Session Management**
  ```javascript
  const session = require('express-session');
  const MongoStore = require('connect-mongo');
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  ```

---

## 🎯 Recommendations for Your Project

Based on your current setup, here's what I recommend:

### **For Development (Current Setup is Good!):**

```bash
# Keep using .env files (NOT in Git)
server/.env
client/.env

# These are already in .gitignore ✅
```

### **For Production (Current Setup is Good!):**

```bash
# Use platform environment variables
Render → Environment Variables
Vercel → Environment Variables

# These are encrypted at rest by the platform ✅
```

### **If You Want Extra Security:**

**Use dotenv-vault** for encrypted environment variables:
```bash
npm install dotenv-vault-core --save-dev
npx dotenv-vault build
```

This gives you:
- Encrypted .env (safe to commit)
- Easy team collaboration
- Minimal code changes

---

## 🔐 MongoDB Password Best Practices

### Create a Strong Password:

```javascript
// Good passwords (16+ characters, random)
✅ kJ9#mP2$nR5@wQ8&vL3
✅ Xy7$bN4!cM9@pT2#zK6
✅ aW5&dS8#fG3@hJ6$kL9

// Bad passwords
❌ password123
❌ anand (current - CHANGE THIS!)
❌ mongodb
❌ 12345678
```

### Generate Strong Password:

**Option 1: Online Generator**
- https://passwordsgenerator.net/
- Set length: 20+ characters
- Include: uppercase, lowercase, numbers, symbols

**Option 2: Command Line**
```bash
# Mac/Linux
openssl rand -base64 20

# PowerShell (Windows)
[System.Web.Security.Membership]::GeneratePassword(20, 5)

# Node.js
node -e "console.log(require('crypto').randomBytes(20).toString('base64'))"
```

### URL-Encode Special Characters:

If your password has special characters, encode them:

```
Original: p@ssw0rd!
Encoded:  p%40ssw0rd%21

@ → %40
! → %21
# → %23
$ → %24
% → %25
& → %26
```

**Connection string with encoded password:**
```
mongodb+srv://username:p%40ssw0rd%21@cluster.mongodb.net/dbname
```

---

## 🚨 Immediate Action Items

Based on the GitHub security alert:

1. **Change MongoDB Password** (Priority 1)
   ```
   1. Login to MongoDB Atlas
   2. Database Access → Edit User
   3. Generate strong password (20+ chars)
   4. Update password
   5. Update environment variables on Render
   6. Redeploy if needed
   ```

2. **Verify `.gitignore`** (Already done ✅)
   ```bash
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

3. **Mark GitHub Alert as Resolved**
   ```
   After changing password:
   1. Go to repository → Security tab
   2. View secret scanning alerts
   3. Mark as "Revoked" or "Resolved"
   ```

---

## 📚 Additional Resources

### Security Tools:
- **[OWASP Top 10](https://owasp.org/www-project-top-ten/)** - Common security risks
- **[npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)** - Check dependencies
- **[Snyk](https://snyk.io/)** - Security scanning
- **[Dependabot](https://github.com/dependabot)** - Dependency updates

### Password Security:
- **[bcrypt](https://www.npmjs.com/package/bcryptjs)** - Already using ✅
- **[argon2](https://www.npmjs.com/package/argon2)** - Alternative (stronger)
- **[OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)**

### Environment Variables:
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Already using ✅
- **[dotenv-vault](https://www.dotenv.org/docs/security/env-vault)** - Encrypted version
- **[12-factor app](https://12factor.net/config)** - Configuration best practices

---

## ✅ Summary

**Your current security is GOOD for a standard web application:**

✅ Passwords hashed with bcrypt
✅ Environment variables not in Git
✅ MongoDB uses SSL/TLS
✅ JWT authentication
✅ Input validation

**To improve further:**

1. 🔴 **Change MongoDB password immediately** (exposed in Git history)
2. 🟡 Add rate limiting
3. 🟡 Add helmet.js for HTTP headers
4. 🟢 Consider dotenv-vault for encrypted env files (optional)
5. 🟢 Implement additional security headers

**Bottom line:** Your app's security architecture is solid. The main issue is the exposed credentials in Git history, which you'll fix by changing the MongoDB password.

---

*Last Updated: October 9, 2025*
*Version: 1.0*

