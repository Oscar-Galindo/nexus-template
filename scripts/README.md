# 🛠️ Helper Scripts (Super Easy!)

Magic commands to help you! Each one does something useful. 🪄

---

## 🎯 What Are These?

Think of these like **magic buttons** that do stuff automatically:
- 🔄 Copy content from old websites
- 🧪 Test if things work
- 🔒 Make safe builds

**You just type a command and it does the work!**

---

## 📦 The Magic Commands

### 🔄 Copy from Old WordPress Site

**Got an old WordPress website? Let's copy everything over!**

#### Option A: Copy to Simple Files (Easiest!)
```bash
npm run migrate:wordpress
```

**When to use**: You picked Markdown during setup  
**What happens**: 
1. Downloads your WordPress blog posts
2. Saves them as simple `.md` files
3. You can edit them like text files!

**How long**: 1-5 minutes ⏱️

---

#### Option B: Copy to Contentful (Fancy!)
```bash
npm run migrate:wp:contentful
```

**When to use**: You picked Contentful during setup  
**What happens**:
1. Downloads your WordPress content
2. Uploads everything to Contentful
3. Client can edit in Contentful dashboard!

**How long**: 10-30 minutes ⏱️  
**Need first**: Contentful management token

---

#### Option C: Copy to Sanity (Also Fancy!)
```bash
npm run migrate:wp:sanity
```

**When to use**: You picked Sanity during setup  
**What happens**:
1. Downloads your WordPress content
2. Uploads to Sanity
3. Client can edit in Sanity Studio!

**How long**: 10-30 minutes ⏱️  
**Need first**: Sanity write token

---

### 🧪 Test If GoHighLevel Works

**Before using forms, test if GHL is connected properly:**

#### Test 1: Check Connection
```bash
npm run test:ghl:connection
```

**What it does**: Says "Yes, GHL is connected!" or "Nope, something's wrong"

**When to run**: After adding GHL API key to `.env`

---

#### Test 2: Test Contact Form
```bash
npm run test:ghl:forms
```

**What it does**: Creates a fake contact in GHL to test forms

**What you do after**: Delete the test contact from GHL dashboard

---

#### Test 3: Test Quote Forms (Business Sites)
```bash
npm run test:ghl:opportunity
```

**What it does**: Creates a fake lead in your sales pipeline

**What you do after**: Delete the test data from GHL

---

### 🔒 Build Safe Version

**Need to build but keep secrets hidden?**

```bash
npm run build:protected
```

**What it does**:
1. Builds your website
2. Removes any `.env` files
3. Removes secret stuff
4. Safe to give to anyone!

**When to use**: Sending build files to client's IT person

---

## 🎮 When to Use Each Script

### 📝 Just Finished Setup?

Test if GoHighLevel works:
```bash
npm run test:ghl:connection
```
If it says ✅, you're good! If it says ❌, check your API keys.

---

### 🔄 Client Has Old WordPress Site?

Pick the matching migration:

**You chose Markdown?**
```bash
npm run migrate:wordpress
```

**You chose Contentful?**
```bash
npm run migrate:wp:contentful
```

**You chose Sanity?**
```bash
npm run migrate:wp:sanity
```

---

### 🧪 Want to Test Forms Before Launch?

**Test contact forms:**
```bash
npm run test:ghl:forms
```
Check GHL dashboard, delete test contact after!

**Test quote forms (business sites):**
```bash
npm run test:ghl:opportunity
```
Check GHL pipeline, delete test after!

---

## 🎯 Cheat Sheet (Copy This!)

```bash
# First time setup
./setup.sh

# Copy from WordPress (pick one)
npm run migrate:wordpress          # → Markdown
npm run migrate:wp:contentful      # → Contentful  
npm run migrate:wp:sanity          # → Sanity

# Test GHL (if using GHL forms)
npm run test:ghl:connection
npm run test:ghl:forms

# Start building!
npm run dev
```

---

## 🆘 Help! It's Not Working!

### "Command not found"
**Fix**: Install the tools first!
```bash
npm install
```

### "Missing environment variables"
**Fix**: Add them to your `.env` file!

**For WordPress migration:**
```env
WORDPRESS_URL=https://oldsite.com
```

**For Contentful migration:**
```env
CONTENTFUL_SPACE_ID=abc123
CONTENTFUL_MANAGEMENT_TOKEN=secret_token
```

**For Sanity migration:**
```env
SANITY_PROJECT_ID=abc123
SANITY_TOKEN=secret_token
```

**For GHL testing:**
```env
GHL_API_KEY=your_key
GHL_LOCATION_ID=your_location
```

---

### "Migration failed"
**Check**:
1. Is the WordPress site online?
2. Can you visit it in a browser?
3. Is the URL correct? (include `https://`)

---

## 💡 Pro Tips

### Tip 1: Test Connection First
Before migrating, test if everything works:
```bash
npm run test:ghl:connection
```

### Tip 2: Start Small
Test with markdown first (free and simple):
```bash
npm run migrate:wordpress
```
You can always upgrade to Contentful/Sanity later!

### Tip 3: Keep Backups
Don't delete the old WordPress site until you're sure everything migrated correctly!

### Tip 4: Check Results
After migration:
1. Run `npm run dev`
2. Visit `localhost:4321`
3. Check if posts are there
4. Look good? Delete WordPress! ✅

---

## 🎓 Quick Examples

### Example 1: Small Business Migrating from WordPress
```bash
# 1. Setup chose markdown
./setup.sh
# Picked: Business, Markdown, Simple

# 2. Copy WordPress content
npm run migrate:wordpress
# Entered: https://oldbusiness.com

# 3. Done! 
npm run dev
# All posts are now in markdown! ✅
```

---

### Example 2: Church Migrating to Contentful
```bash
# 1. Setup chose contentful
./setup.sh
# Picked: Church, Contentful, Simple

# 2. Added Contentful token to .env
# CONTENTFUL_MANAGEMENT_TOKEN=xyz123

# 3. Migrate
npm run migrate:wp:contentful
# Entered: https://oldchurch.org

# 4. Wait 20 minutes... ☕

# 5. Done!
# All content in Contentful dashboard! ✅
```

---

## 📚 More Help?

**Read these guides** (super simple!):
- [WORDPRESS_MIGRATION.md](../WORDPRESS_MIGRATION.md) - Full migration guide
- [START_HERE.md](../START_HERE.md) - Absolute beginner guide

---

## 🎉 That's It!

**Remember**: 
- Pick the migration that matches your CMS choice
- Test connections first
- Start with simple options
- You can always upgrade later!

**Questions?** The scripts will tell you if something's wrong! They're friendly! 😊
