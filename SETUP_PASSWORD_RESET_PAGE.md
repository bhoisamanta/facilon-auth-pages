# 🔧 Setup Custom Password Reset Page in Azure B2C

## Problem

When users click "Forgot password?", Azure B2C redirects but doesn't show your custom page.

**URL you're seeing**:
```
https://facilonservices.b2clogin.com/.../unified?claimsexchange=ForgotPassword&...
```

**Issue**: Custom page URL is NOT configured for the password reset page.

---

## ✅ Solution: Add Custom Page URL for Password Reset

### Step 1: Open Your User Flow

1. **Go to**: Azure Portal → Azure AD B2C
2. **Click**: "User flows" (left menu)
3. **Click**: `B2C_1_2Signin` (your user flow)

---

### Step 2: Configure Page Layouts

1. **Left menu**: Click **"Page layouts"**
2. You'll see a list of pages:
   - ✅ Local account sign-in page (already configured)
   - ❌ Password reset page (needs configuration)
   - ❌ Local account sign-up page (if you want custom sign-up)

---

### Step 3: Add Custom URL for Password Reset Page

1. **Find**: "Password reset page" or "Forgot password page"
2. **Click**: On that row to expand it
3. **Toggle**: "Use custom page content" → **ON**
4. **Enter**: Custom page URL:
   ```
   https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
   ```
5. **Click**: "OK" or "Save"

---

### Step 4: Save Changes

1. **Top of page**: Click **"Save"** button
2. **Wait**: 30 seconds for Azure to apply changes

---

## 📸 Visual Guide

### Where to Find Page Layouts:

```
Azure AD B2C
 └── User flows
      └── B2C_1_2Signin
           └── Page layouts  ← Click here
                ├── Local account sign-in page
                │    └── ✅ https://bhoisamanta.github.io/.../signin.html (already set)
                │
                ├── Password reset page  ← CONFIGURE THIS!
                │    └── ❌ Not configured yet
                │    └── 🔧 Add: https://bhoisamanta.github.io/.../resetpassword.html
                │
                └── Local account sign-up page
                     └── (Configure if needed)
```

---

## 🎯 Exact Steps with Screenshots

### Step-by-Step:

#### 1. Navigate to Page Layouts

<img src="azure-b2c-page-layouts.png" alt="Navigate to Page Layouts" />

Go to: **User flows** → **B2C_1_2Signin** → **Page layouts**

---

#### 2. Find Password Reset Page

You'll see a table like this:

| Page Layout Name | Use custom page | Custom page URI |
|-----------------|----------------|-----------------|
| Local account sign-in page | ✅ Yes | https://bhoisamanta.github.io/facilon-auth-pages/signin.html |
| **Password reset page** | ❌ No | *(empty)* |
| Local account sign-up page | ❌ No | *(empty)* |

---

#### 3. Click on "Password reset page"

Click on the row to expand it.

---

#### 4. Toggle "Use custom page content"

Switch it to **ON** (enabled).

---

#### 5. Enter Your Custom Page URL

In the "Custom page URI" field, enter:

```
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

#### 6. Click "OK" or "Save"

Save this specific page configuration.

---

#### 7. Save the Entire User Flow

At the top of the page, click the main **"Save"** button.

---

## 🔐 Enable Self-Service Password Reset (If Not Already)

If you don't see "Password reset page" in the Page layouts:

### Step 1: Enable in Properties

1. **User flows** → **B2C_1_2Signin**
2. **Left menu**: Click **"Properties"**
3. **Find**: "Self-service password reset"
4. **Check**: ☑️ "Enable self-service password reset"
5. **Click**: "Save"

### Step 2: Go Back to Page Layouts

Now "Password reset page" should appear in the Page layouts list.

---

## 🧪 Testing

After configuring:

### Step 1: Wait
Wait **30-60 seconds** for Azure to apply changes.

### Step 2: Clear Browser Cache
Press `Ctrl + Shift + R`

### Step 3: Test Flow

1. Go to your sign-in page
2. Click **"Forgot your password?"**
3. You should now see:
   - ✅ Your custom `resetpassword.html` page
   - ✅ Facilon logo and branding
   - ✅ Password reset form

### Step 4: Verify URL

When on password reset page, the URL should look like:

```
https://facilonservices.b2clogin.com/.../ForgotPassword?...
```

And the page content should match your `resetpassword.html`.

---

## 📋 All Custom Pages to Configure

For a complete experience, configure all three:

| Page | Custom URL | Status |
|------|-----------|--------|
| Sign-in | `https://bhoisamanta.github.io/facilon-auth-pages/signin.html` | ✅ Already set |
| Password reset | `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html` | ❌ **Need to configure** |
| Sign-up | `https://bhoisamanta.github.io/facilon-auth-pages/signup.html` | 🤷 Optional |

---

## ⚠️ Common Mistakes

### ❌ Wrong: Setting it in "Properties"

There's NO place in "Properties" to set custom page URLs for password reset.

### ✅ Correct: Use "Page layouts"

You MUST use "Page layouts" to set custom pages for:
- Sign-in
- Sign-up
- Password reset
- Email verification
- etc.

---

## 🔧 Alternative: Create Separate Password Reset Flow

If "Password reset page" doesn't appear in Page layouts:

### Create Dedicated Flow:

1. **User flows** → "➕ New user flow"
2. **Select**: "Password reset (Recommended)"
3. **Name**: `PasswordReset`
4. **Configure**: Identity providers, MFA
5. **Page layouts**: Set custom URL:
   ```
   https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
   ```
6. **Save**

Then update your sign-in page's forgot password link to use this flow:

```html
<a href="https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_PasswordReset&client_id=...">
  Forgot password?
</a>
```

---

## 📝 Configuration Checklist

- [ ] Open Azure Portal → Azure AD B2C
- [ ] Go to User flows → B2C_1_2Signin
- [ ] Click "Properties" → Enable self-service password reset
- [ ] Click "Page layouts"
- [ ] Find "Password reset page"
- [ ] Toggle "Use custom page content" → ON
- [ ] Enter: `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html`
- [ ] Click "OK"
- [ ] Click "Save" at top
- [ ] Wait 30-60 seconds
- [ ] Clear browser cache
- [ ] Test forgot password flow

---

## 🚀 Quick Test Command

After configuration, test with this URL (replace with your values):

```
https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_2Signin&client_id=54e55d9e-551a-4db4-b1e1-92fdb3e38c01&redirect_uri=http://localhost:3000/callback&response_type=code&scope=openid
```

Then click "Forgot password?" → Should show your custom page!

---

## 💡 Current Status

**What Works**:
- ✅ Custom sign-in page (`signin.html`)
- ✅ GitHub Pages hosting
- ✅ Forgot password link appears
- ✅ CSS/branding loads

**What Needs Configuration**:
- ❌ Password reset custom page URL in Azure B2C
- ❌ This is a **5-minute Azure Portal configuration**

**Not a code issue - just needs Azure setup!** 🎯

---

## ⚡ TL;DR - Do This Now:

1. Azure Portal → Azure AD B2C → User flows → B2C_1_2Signin
2. Click "Page layouts"
3. Find "Password reset page"
4. Enable custom page
5. Enter: `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html`
6. Save
7. Test

**That's it!** 🎉
