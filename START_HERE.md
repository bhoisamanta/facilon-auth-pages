# 🚀 START HERE - Facilon B2C Custom Pages

## ✅ Everything is Ready!

All files are created with your Facilon logo and branding.

---

## 📤 Step 1: Push to GitHub (2 minutes)

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Add Facilon B2C authentication pages"
git push
```

**Your URLs after deployment**:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

## 🔍 Step 2: Find Custom Page Setting in Azure B2C

**You're currently on**: User Flow → Page layouts → Attribute collection page

**What to do**: 

### Option A: Scroll Down (Most Likely!)

On your current "Page layouts" screen:
1. **Scroll down** below the attribute list
2. **Look for** sections named:
   - "Local account sign in page"
   - "Local account sign up page"  
   - "Password reset page"
3. **Each section** has:
   - ☐ "Use custom page content" checkbox
   - Text field for "Custom page URI"

### Option B: Check "Company branding"

If scrolling doesn't show custom pages:
1. **Left sidebar** → Click **"Company branding"** (under Customize)
2. **Look for tab**: "Page UI customization"
3. **Click that tab** → You'll see custom page URL fields

---

## 📝 Step 3: Add Your GitHub Pages URLs

When you find the "Custom page URI" fields, paste these:

### Sign-in page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

### Sign-up page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
```

### Password reset page:
```
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

**Remember**: Check the ✅ "Use custom page content" box for each!

---

## 🧪 Step 4: Test It

1. **Click**: "Run user flow" button (top of User Flow page)
2. **Select**: Your application and reply URL
3. **Click**: "Run user flow"
4. **Expected**: Your custom page loads with Facilon logo!

---

## 📚 Detailed Guides Available

- **`FIND_CUSTOM_PAGE_SECTION.md`** ← Read this if you can't find the setting!
- **`B2C_SETUP_GUIDE.md`** ← Complete B2C configuration steps
- **`README_B2C_CLASSIC.md`** ← Full documentation for B2C
- **`QUICK_START.md`** ← Quick reference

---

## 🆘 Can't Find It?

**Most Common Location**: 
Scroll down on your current "Page layouts" screen below the attributes!

**Screenshot Request**:
If you still can't find it, take a screenshot showing:
1. The full left sidebar menu
2. What you see when you scroll down

I'll show you exactly where it is! 🎯
