# 🔍 How to Find Custom Page Content Section in Azure AD B2C

## Your Current Location

Based on your screenshot, you're here:
```
User Flow → Page layouts → Attribute collection page ✅
```

---

## 🎯 Where to Find "Custom Page Content" Setting

### Method 1: Scroll Down on Page Layouts (Most Common)

You're already on **"Page layouts"** - just **scroll down**!

```
┌────────────────────────────────────────────────────┐
│ Page layouts                                        │
├────────────────────────────────────────────────────┤
│                                                     │
│ 📄 Attribute collection page                       │
│    (You see this in your screenshot ↑)            │
│    - Email Address [required]                      │
│    - Display Name                                  │
│    - Given Name                                    │
│    - Surname                                       │
│    - Username                                      │
│                                                     │
│ ─────────────────────────────────────────────────  │
│                                                     │
│ 📄 Local account sign in page         ← SCROLL TO! │
│    ☐ Use custom page content                       │
│    Custom page URI: [__________________]           │
│                                                     │
│ 📄 Local account sign up page         ← SCROLL TO! │
│    ☐ Use custom page content                       │
│    Custom page URI: [__________________]           │
│                                                     │
│ 📄 Password reset page                 ← SCROLL TO! │
│    ☐ Use custom page content                       │
│    Custom page URI: [__________________]           │
│                                                     │
│ 📄 Self-asserted page                              │
│    ☐ Use custom page content                       │
│    Custom page URI: [__________________]           │
│                                                     │
└────────────────────────────────────────────────────┘
```

**ACTION**: On your current screen, **scroll down** below the attribute list!

---

### Method 2: Check "Company branding" Section

If scrolling doesn't show custom page options:

1. **Left sidebar**: Look for **"Company branding"** (under Customize)
2. **Click** on "Company branding"
3. **Look for tabs** at the top:
   - "Basic"
   - "Advanced"
   - **"Page UI customization"** ← Click this!
4. **Configure custom pages** in that tab

---

### Method 3: Languages & Page Customization

Some B2C versions have it here:

1. **Left sidebar**: Click **"Languages"**
2. **Select** your language (e.g., English)
3. **Look for**: "Page customization" options
4. **Each page type** will have custom URL field

---

## 🎯 What to Look For

The section you need has these characteristics:

### Visual Cues:
- ✅ Section title includes word "page" (e.g., "sign in page", "sign up page")
- ✅ Has checkbox labeled "Use custom page content"
- ✅ Has text input field labeled "Custom page URI"
- ✅ Usually shows example URL format

### Page Types in B2C:

You'll typically see these page types:
1. **Local account sign in page** ← Use signin.html
2. **Local account sign up page** ← Use signup.html
3. **Password reset page** ← Use resetpassword.html
4. **Self-asserted page** ← Sometimes needed
5. **Multifactor authentication page** ← If MFA enabled
6. **Unified sign up or sign in page** ← Combined flow

---

## 📝 URLs to Paste (Have These Ready)

When you find the custom page content fields, paste these:

### For Sign-in Pages:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

### For Sign-up Pages:
```
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
```

### For Password Reset:
```
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

## 🔍 Alternative: Search Within the Page

If you still can't find it:

1. **Press**: Ctrl + F (Find on page)
2. **Search for**: "custom page"
3. **Or search**: "page URI"
4. **Or search**: "custom content"

This will highlight any text containing these terms on the page.

---

## 📸 Screenshot Guide

Based on your current screenshot, try this:

### In Your Current View:

1. **Keep** the Page layouts sidebar item selected (as shown in screenshot)
2. **In the main panel**: You see "Attribute collection page"
3. **SCROLL DOWN** in that main panel
4. **Below the attribute list**, you should see more page type sections

### If Nothing Below:

The custom page options might be in a different section. Check:

1. **Left sidebar** → Look for **"Customize"** group
2. **Under Customize**:
   - Page layouts (you're here)
   - Company branding ← Try this!
   - Languages ← Or this!

---

## 🚨 If Custom Pages Option Not Available

Some Azure AD B2C configurations don't show custom page content options because:

### Possible Reasons:

1. **Using "Standard" user flow** instead of "Recommended"
   - Solution: Create new user flow with "Recommended" version

2. **Premium P1 license required** (in some regions)
   - Solution: Check your subscription level

3. **Older B2C tenant version**
   - Solution: May need to use embedded custom HTML in pages

4. **Different portal version**
   - Solution: Try accessing via https://portal.azure.com/#view/Microsoft_AAD_B2CAdmin

---

## 🎬 Video Guidance

If you can't find it, here's what the setting looks like:

```
Page Type: Local account sign in page
───────────────────────────────────────────────
☐ Use custom page content

Custom page URI:
┌──────────────────────────────────────────────┐
│ https://your-url-here.com/page.html          │
└──────────────────────────────────────────────┘

[Load default content]    [Save]
```

---

## 🆘 Still Need Help?

Take these screenshots and share them:

1. **Full left sidebar** - Show all menu items when User Flow is selected
2. **Main content area** - Show everything visible (scroll if needed)
3. **Any "Customize" sections** - Company branding, Languages, etc.

I'll identify the exact location in your specific B2C interface!

---

## 💡 Quick Test

Before configuring User Flow, test if your pages work:

```bash
# Open these URLs in browser:
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

**Expected**: Pages load with Facilon logo and branding (form won't appear yet - that's normal!)

---

## ✅ Summary

**You're on the right page!** Just need to scroll down or check related sections.

**Most likely solution**: Scroll down below the attribute list on your current "Page layouts" screen.

**The field you're looking for**: 
- Checkbox: "Use custom page content"
- Text field: "Custom page URI"

Let me know what you see when you scroll down! 🚀
