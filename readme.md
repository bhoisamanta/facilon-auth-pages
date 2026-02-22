# Facilon Custom Authentication Pages

Custom HTML pages for **Azure AD B2C (Classic)** with Facilon branding, designed to be hosted on GitHub Pages.

---

## 🚀 Quick Start

### 1. Push to GitHub (You're Using)

Repository: https://github.com/bhoisamanta/facilon-auth-pages

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Add Facilon B2C custom authentication pages"
git push
```

### 2. Your Live URLs

After pushing (wait 1-2 minutes):

```
✅ Sign-in: https://bhoisamanta.github.io/facilon-auth-pages/signin.html
✅ Sign-up: https://bhoisamanta.github.io/facilon-auth-pages/signup.html
✅ Password Reset: https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

### 3. Add to Azure B2C

**You're here**: User Flow → Page layouts → Attribute collection page

**What to do**: **Scroll down** on that same page to find custom page content sections!

👉 **Read**: `AZURE_B2C_WHERE_TO_ADD_URL.md` for exact location!

---

## 📁 What's Included

```
facilon-auth-pages/
├── 🌐 HTML Pages
│   ├── signin.html              - Custom sign-in page
│   ├── signup.html              - Registration page
│   ├── resetpassword.html       - Password reset page
│   └── index.html               - Landing page
│
├── 🎨 Styling
│   └── css/auth.css             - Complete stylesheet (Facilon colors)
│
├── ⚡ JavaScript
│   └── js/auth.js               - Enhancements & validations
│
├── 🖼️ Assets
│   └── assets/logo.png          - Your Facilon logo (8.6 KB)
│
└── 📚 Documentation
    ├── START_HERE.md            - 👈 Read this first!
    ├── AZURE_B2C_WHERE_TO_ADD_URL.md  - 🔍 Find custom page setting
    ├── B2C_SETUP_GUIDE.md       - Complete B2C configuration
    ├── README_B2C_CLASSIC.md    - Full B2C documentation
    └── ... more guides
```

---

## 🎨 Facilon Branding Applied

✅ **Logo**: Your red & blue Facilon logo
✅ **Colors**: 
   - Primary Red: `#c41e3a`
   - Primary Blue: `#2c5aa0`
   - Accent Blue: `#4a7ba7`
✅ **Background**: Red-to-blue gradient
✅ **Buttons**: Facilon brand gradient
✅ **Font**: Roboto Condensed (matches your app)

---

## 📖 Documentation Guide

### 🆘 Can't Find Where to Add Custom Page URL in Azure?

**👉 Read**: `AZURE_B2C_WHERE_TO_ADD_URL.md`

**Quick Answer**: On your current "Page layouts" screen, **scroll down** below the attribute list!

---

### 🔧 Need Complete Azure B2C Setup?

**👉 Read**: `B2C_SETUP_GUIDE.md`

Step-by-step instructions for:
- App registration
- User flow creation
- Custom page configuration
- Testing

---

### ⚡ Want Quick Reference?

**👉 Read**: `START_HERE.md`

3-step quickstart guide.

---

## 🧪 How to Test

### Test 1: Check GitHub Pages

Open in browser:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

**Expected**: 
- ✅ Page loads
- ✅ Facilon logo appears
- ✅ Red/blue branding visible
- ❌ No form yet (normal - Azure injects form via User Flow)

### Test 2: Run B2C User Flow

1. In Azure → Your User Flow
2. Click "Run user flow"
3. **Expected**:
   - Opens your GitHub Pages URL
   - Shows Facilon branding
   - Azure injects login form
   - You can authenticate

---

## 🎯 Next Steps

1. ✅ Files are ready → **Push to GitHub**
2. ⏳ Wait for deployment → **1-2 minutes**
3. 🔍 Find custom page setting → **Read `AZURE_B2C_WHERE_TO_ADD_URL.md`**
4. 📝 Add GitHub URLs to B2C → **In Page layouts (scroll down!)**
5. 🧪 Test user flow → **Verify custom pages load**
6. 💻 Backend integration → **I'll help with Spring Boot setup**

---

## ❓ Common Questions

### Q: Where do I add the GitHub Pages URL in Azure?

**A**: On the "Page layouts" screen you're currently viewing, **scroll down** below the attribute list. You'll see sections for each page type with "Use custom page content" checkbox.

**Details**: Read `AZURE_B2C_WHERE_TO_ADD_URL.md`

### Q: Do I check "Access tokens" and "ID tokens" in Authentication?

**A**: ❌ **NO!** Do NOT check those. You're using Authorization Code Flow with PKCE, not implicit flow.

### Q: Can I use GitHub Pages instead of Azure Blob Storage?

**A**: ✅ **YES!** GitHub Pages works perfectly and is:
- Free
- HTTPS enabled
- CORS configured automatically
- Easy to update

### Q: What's the difference between B2C and Entra External ID?

**A**: You're using **B2C Classic** which uses:
- `{tenant}.b2clogin.com` URLs
- Different portal interface
- Policy-based user flows

---

## 🌐 Your Configuration Values

Fill these in as you configure Azure:

```
Azure AD B2C Tenant:
  Tenant Name: _____________________________________
  Tenant ID: _____________________________________
  Domain: _____________________.onmicrosoft.com

App Registration:
  Client ID: _____________________________________
  
User Flow/Policy:
  Name: B2C_1_____________________________________
  
GitHub Pages:
  Base URL: https://bhoisamanta.github.io/facilon-auth-pages/
  Sign-in: /signin.html
  Sign-up: /signup.html
  Reset: /resetpassword.html
```

---

## ✅ Files Ready for GitHub

Total: **18 files** including:
- 4 HTML pages ✅
- 1 CSS file (16.6 KB) ✅
- 1 JS file (18.0 KB) ✅
- 1 Logo (8.6 KB) ✅
- 10 documentation files ✅

**All styled with your Facilon branding!**

---

## 🚀 Deploy Now

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git status
git add .
git commit -m "Add Facilon custom B2C authentication pages with branding"
git push origin main
```

---

## 💬 Need Help?

**If you still can't find where to add custom page URLs**:
1. Take a screenshot of what you see when you scroll down
2. Share it and I'll pinpoint the exact location!

**For backend integration**:
- Let me know when Azure B2C is configured
- I'll help with Spring Boot and React implementation

---

## 📞 Support

- **Documentation Issues**: Create GitHub issue
- **Azure B2C Help**: support@facilonservices.com
- **Technical Questions**: I'm here to help!

---

**🎉 Your custom authentication pages with Facilon branding are ready to go!**
