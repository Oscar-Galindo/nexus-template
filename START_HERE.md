# 🚀 START HERE - Super Easy Guide!

**Welcome!** This guide is so simple, anyone can follow it. No tech knowledge needed! 👶

---

## 🎯 What is This?

This is a **website starter kit**. Think of it like a coloring book - the outline is done, you just fill in your stuff!

You can make:
- 🏢 **Business websites** (restaurants, shops, companies)
- 📄 **Landing pages** (one page to sell something)
- ⛪ **Church websites** (sermons, events, prayers)

---

## ⚡ Quick Start (3 Steps!)

### Step 1: Open Your Terminal 💻

**What's a terminal?** It's a black/white window where you type commands.

**How to open it:**
- **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: Press `Win + R`, type "cmd", press Enter
- **In VS Code**: Press `` Ctrl + ` `` (backtick key)

**What it looks like:**
```
┌────────────────────────────────┐
│ Terminal                    ▢ ✕│
├────────────────────────────────┤
│ $                              │ ← You type here
│                                │
│                                │
└────────────────────────────────┘
```

---

### Step 2: Go to Your Project Folder 📁

Type this and press Enter:
```bash
cd /Users/oscargalindo/online\ nexus\ marketing/nexus-template
```

**Translation**: "Go to the nexus-template folder"

---

### Step 3: Run the Magic Setup ✨

Type this and press Enter:
```bash
./setup.sh
```

**Translation**: "Run the setup helper"

---

## 🎮 Answer Simple Questions

The setup will ask you questions. Here's what to answer:

### Question 1: "Site name?"
**What it means**: What should we call your website?

**Examples**:
- Bob's Pizza Shop
- Grace Community Church
- My Cool Product

**Type**: Your website name, then press Enter

---

### Question 2: "Domain?"
**What it means**: What web address do you want?

**Examples**:
- bobspizza.com
- gracechurch.org
- mycoolproduct.com

**Type**: Your domain (without https://), then press Enter

---

### Question 3: "Site type?"
**What it means**: What kind of website?

**Type**:
- `1` and press Enter = Business website
- `2` and press Enter = Church website

**Choose**:
- Business for: companies, shops, restaurants, products
- Church for: churches, ministries, religious groups

---

### Question 4: "CMS Provider?"
**What it means**: Where do you want to keep your content?

**Type**:
- `1` = Contentful (fancy, need to sign up)
- `2` = Sanity (fancy, need to sign up)
- `3` = Markdown (simple files on your computer) ⭐ **Pick this if you're new!**

**What we recommend**: Type `3` and press Enter (easiest!)

---

### Question 5: "Form Provider?"
**What it means**: Where should contact forms go?

**Type**:
- `1` = GoHighLevel (fancy CRM system)
- `2` = Simple (just emails you) ⭐ **Pick this if you're new!**

**What we recommend**: Type `2` and press Enter (simplest!)

---

### Question 6: "Enable multi-language?"
**What it means**: Do you need your website in multiple languages?

**Type**:
- `N` and press Enter = Just English ⭐ **Pick this if you're new!**
- `Y` and press Enter = Multiple languages (English, Spanish, etc.)

**What we recommend**: Type `N` and press Enter (easier to start!)

---

### Question 7: "Run npm install?"
**What it means**: Should I download all the tools needed?

**Type**: `Y` and press Enter (Yes please!)

---

## ⏱️ Wait a Minute...

The computer will download and install stuff. You'll see text scrolling. **This is normal!** Just wait. ☕

When it's done, you'll see:
```
✅ Dependencies installed!
🎉 SETUP COMPLETE!
```

---

## 🎉 Start Your Website!

Now type this:
```bash
npm run dev
```

**Translation**: "Turn on my website"

You'll see:
```
Local: http://localhost:4321
```

---

## 🌐 See Your Website!

1. Open your web browser (Chrome, Safari, Firefox, etc.)
2. Type in the address bar: `localhost:4321`
3. Press Enter
4. **Your website appears!** 🎊

---

## 📝 What Files Got Created?

After setup, you have:

```
nexus-template/
├── .env              ← Your settings (created by setup!) ✅
├── node_modules/     ← Tools (created by setup!) ✅
├── src/
│   ├── content/      ← Your content goes here! 📝
│   ├── pages/        ← Your web pages
│   └── components/   ← Reusable pieces
└── ...
```

---

## ✏️ Add Your Content

### Add a Blog Post:

1. Open folder: `src/content/blog/`
2. Create a new file: `my-post.md`
3. Copy and paste this:

```markdown
---
title: "My First Blog Post"
excerpt: "This is awesome!"
publishedAt: 2025-01-25
author: "Your Name"
---

# Hello World!

This is my first blog post. So easy!
```

4. Save the file
5. Refresh your browser - your post appears! 🎉

---

### Add a Page:

1. Open folder: `src/content/pages/`
2. Create a new file: `about.md`
3. Write your about page
4. Save
5. Done! ✅

---

## 🛠️ Useful Commands

**Start your website:**
```bash
npm run dev
```

**Stop your website:**
Press `Ctrl + C` in the terminal

**Check if everything is okay:**
```bash
npm run verify
```

---

## 🧪 Test Pages

After starting your website, visit these special test pages:

1. **Test forms**: http://localhost:4321/forms-demo
   - Try submitting a contact form
   - See if emails work

2. **Test languages** (if enabled): http://localhost:4321/i18n-demo
   - See English/Spanish/Korean switch

---

## 📸 Visual Guide

### Before Setup:
```
You: I want to make a website! 😰
Template: Empty folder
```

### Run ./setup.sh:
```
Terminal: What kind of website?
You: Business! 
Terminal: *Creates .env file* ✅
Terminal: *Downloads tools* ✅
Terminal: Done! 🎉
```

### After Setup:
```
You: npm run dev
Browser: *Shows your website* 🌐
You: Wow! It works! 😄
```

---

## 🆘 Help! Something Broke!

### Problem: "Command not found: ./setup.sh"

**Fix**: Make it runnable first
```bash
chmod +x setup.sh
./setup.sh
```

---

### Problem: "npm: command not found"

**Fix**: You need to install Node.js first
1. Go to: https://nodejs.org
2. Download the big green button (LTS version)
3. Install it
4. Try again!

---

### Problem: "Port 4321 is already in use"

**Fix**: Someone is using that number! Use a different one:
1. Open the `.env` file
2. Find the line that says `PORT=4321`
3. Change it to `PORT=3000`
4. Save
5. Try `npm run dev` again

---

### Problem: "I don't see my changes"

**Fix**: 
1. Make sure you saved the file (press `Cmd + S` or `Ctrl + S`)
2. Refresh your browser (press `F5`)
3. Still not working? Stop the server (`Ctrl + C`) and start again (`npm run dev`)

---

### Problem: "Where is the .env file?"

**Fix**: It's hidden! 
1. Look in your project folder
2. It starts with a dot: `.env`
3. In VS Code, you should see it in the file explorer on the left
4. If you can't see it, show hidden files:
   - Mac: Press `Cmd + Shift + .`
   - Windows: In folder options, show hidden files

---

## 🎓 What You Learned

- ✅ What a terminal is
- ✅ How to run commands
- ✅ How to answer setup questions
- ✅ How to start your website
- ✅ How to add content
- ✅ How to test your website

---

## 🎯 Cheat Sheet

```bash
# Go to project
cd nexus-template

# Run setup (only once!)
./setup.sh

# Start website
npm run dev

# Stop website
Ctrl + C

# Check everything
npm run verify
```

---

## 📚 What to Read Next

**After you get your website running**, read these:

1. **QUICK_START.md** - More details
2. **README.md** - Full overview
3. **FEATURE_GUIDE.md** - What you can add later

---

## 💡 Remember

1. **Terminal** = Where you TYPE commands ⌨️
2. **Editor** = Where you EDIT files ✏️
3. **Browser** = Where you SEE your website 🌐
4. **./setup.sh** = Creates your .env file automatically ✨

---

## 🎊 You're Ready!

**Three commands, that's it:**

```bash
./setup.sh      # Setup (once)
npm run dev     # Start website
```

Open browser → `localhost:4321` → **DONE!** 🎉

---

## 🤝 Still Confused?

That's okay! Here's the **absolute simplest version**:

1. Open terminal
2. Type: `./setup.sh`
3. Answer questions (pick option 3 and 2 when confused!)
4. Type: `npm run dev`
5. Open browser to: `localhost:4321`
6. **Your website is live!** 🎉

**That's it!** Now go make something awesome! 🚀

---

**Questions?** Read the other guides in this folder or just try stuff - you can't break anything! 😊
