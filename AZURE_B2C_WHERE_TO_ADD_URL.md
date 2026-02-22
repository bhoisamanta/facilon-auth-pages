# 🎯 Azure AD B2C - Exactly Where to Add Custom Page URLs

## Based on Your Screenshot

You're viewing: **User Flow → Page layouts → Attribute collection page** ✅

---

## 📍 Where You Are Now

```
Azure AD B2C
 └── User flows
      └── SigninSignup | Page layouts
           └── Attribute collection page ← YOU ARE HERE
                ├── Email Address [required]
                ├── Display Name
                ├── Given Name  
                ├── Surname
                └── Username
```

---

## 🔽 What to Do: SCROLL DOWN!

On the **same page** where you see the attribute list:

### 1. Scroll Down Below the Attribute List

After the "Username" field, continue scrolling down in the main content area.

### 2. You Should See These Sections:

```
═══════════════════════════════════════════════════
 Attribute collection page
   - Email Address [required]
   - Display Name
   - Given Name
   - Surname
   - Username
─────────────────────────────────────────────────── ← Scroll past here!

 📄 Self asserted page                    ← LOOK HERE!
    ☐ Use custom page content
    Custom page URI: [_____________________]
    
 📄 Local account sign-in page            ← OR HERE!
    ☐ Use custom page content  
    Custom page URI: [_____________________]

 📄 Local account sign-up page            ← OR HERE!
    ☐ Use custom page content
    Custom page URI: [_____________________]
    
 📄 Password reset page                   ← OR HERE!
    ☐ Use custom page content
    Custom page URI: [_____________________]
═══════════════════════════════════════════════════
```

---

## 📋 Step-by-Step Instructions

### For Each Page Type You Find:

1. **Click** to expand the section (if collapsed)
2. **Check** the box: ✅ "Use custom page content"
3. **Paste URL** in "Custom page URI" field
4. **Click**: "Save" button

### URLs to Paste:

#### Self-asserted page / Sign-in page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

#### Sign-up page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
```

#### Password reset page:
```
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

## 🔀 If Scrolling Shows Nothing

Try these alternative locations:

### Alternative 1: Company Branding

1. **Left sidebar** → Look for **"Company branding"**
2. **Click** "Company branding"
3. **Look for tabs** at top: "Basic", "Advanced", "Page UI customization"
4. **Click**: "Page UI customization" tab
5. **Add custom page URLs** there

### Alternative 2: Customize Section

1. **Left sidebar** → Expand **"Customize"** section
2. **Look for**: 
   - "Page layouts" (you're already here)
   - "Company branding" ← Try this
   - "Languages" ← Or this

### Alternative 3: Direct Page Customization

1. **Go back** to User Flow overview
2. **Look for**: "Customize" group in left menu
3. **Options might include**:
   - Page layouts
   - Company branding
   - **Page UI customization** ← Try this

---

## 🖼️ Visual Reference

The section you're looking for looks like this:

```
┌─────────────────────────────────────────────────────┐
│ Local account sign in page                           │
│                                                      │
│ Select the layout of the form users who are         │
│ signing in are shown.                                │
│                                                      │
│ ☐ Use custom page content                           │
│                                                      │
│ Custom page URI:                                     │
│ ┌─────────────────────────────────────────────────┐ │
│ │ https://your-url.com/signin.html                │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ [ Load default content ]          [ Save ]          │
└─────────────────────────────────────────────────────┘
```

---

## 🎬 Action Items

### Right Now:

1. **On your current screen** (Page layouts), scroll down
2. **Look for** any section titled with "sign in", "sign up", or "password"
3. **Look for** checkbox "Use custom page content"
4. **Take a screenshot** if you don't see it

### After Finding It:

1. **Check** "Use custom page content"
2. **Paste** GitHub Pages URL
3. **Save**
4. **Test** with "Run user flow"

---

## 💡 Pro Tip

### Search Within Page:

1. **Press**: `Ctrl + F` (Windows) or `Cmd + F` (Mac)
2. **Search for**: "custom page"
3. **Or search**: "Use custom"
4. **Or search**: "page URI"

This will highlight if that text exists anywhere on the current page!

---

## 🆘 Still Can't Find It?

If after scrolling and searching you still don't see "Use custom page content":

### Your B2C might use different UI. Try:

1. **Exit** Page layouts
2. **Look for** "Company branding" in left menu
3. **Or** go to User Flow → Properties → Look for page customization

### Or Share Screenshot:

Show me:
1. What you see after scrolling down on Page layouts
2. What's in the left sidebar menu
3. Any "Customize" or "Branding" sections

I'll identify the exact location in your specific B2C interface version!

---

## ✅ Expected Behavior After Configuration

Once custom pages are configured and you "Run user flow":

1. **Browser opens** your GitHub Pages URL
2. **Shows** Facilon logo and branding
3. **Azure B2C injects** login form into `<div id="api">`
4. **User can** enter credentials
5. **After authentication** → Redirects to your React app callback

---

## 🔗 Your Working URLs

**GitHub Pages** (already live):
- https://bhoisamanta.github.io/facilon-auth-pages/signin.html
- https://bhoisamanta.github.io/facilon-auth-pages/signup.html
- https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html

**What to do**: Add these to your B2C User Flow page customization!

---

## 📖 Read This Next

**👉 `FIND_CUSTOM_PAGE_SECTION.md`** - Detailed guide with multiple methods to find the setting

**👉 `B2C_SETUP_GUIDE.md`** - Complete B2C configuration walkthrough

**👉 `START_HERE.md`** - Quick start summary

---

Let me know what you see when you scroll down on the Page layouts screen! 🚀
