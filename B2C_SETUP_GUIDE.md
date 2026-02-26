# Azure AD B2C (Classic) - Complete Setup Guide

## 🎯 For Azure AD B2C Classic

This guide is specifically for **Azure AD B2C (Classic)** tenants.

---

## Prerequisites

- Existing Azure AD B2C tenant (or create new one)
- GitHub Pages deployed: https://bhoisamanta.github.io/facilon-auth-pages/
- Access to Azure Portal: https://portal.azure.com

---

## Part 1: Access Azure AD B2C

### Step 1: Navigate to Your B2C Tenant

1. **Login** to [Azure Portal](https://portal.azure.com)
2. **Search** for "Azure AD B2C" in top search bar
3. **Click** on "Azure AD B2C"
4. If you have multiple tenants, **select** your B2C tenant
5. **Record**:
   ```
   Tenant Name: _____________________ (e.g., facilonservices)
   Tenant Domain: _____________________ (e.g., facilonservices.onmicrosoft.com)
   Tenant ID: _____________________ (GUID)
   ```

### Step 2: Check Your Tenant Type

Look at the domain in Azure portal:
- **B2C Classic**: `{tenant}.onmicrosoft.com` → URL uses `{tenant}.b2clogin.com`
- **Entra External ID**: `{tenant}.onmicrosoft.com` → URL uses `{tenant}.ciamlogin.com`

---

## Part 2: App Registration

### Step 3: Register Application (If Not Done)

1. **Navigate**: Azure AD B2C → **App registrations**
2. **Click**: "New registration"
3. **Fill in**:
   - **Name**: Facilon Platform
   - **Supported account types**: "Accounts in any identity provider or organizational directory (for authenticating users with user flows)"
   - **Redirect URI**:
     - Platform: **Web**
     - URI: `http://localhost:3000/login/callback` (must match backend `azure.b2c.redirect-uri`)
4. **Click**: "Register"

### Step 4: Record Application Details

After registration:

```
Application (client) ID: _____________________________________
Directory (tenant) ID: _____________________________________
```

**SAVE THESE!** You'll need them for backend configuration.

### Step 5: Update Authentication Settings

1. **Navigate**: Your app → **Authentication**
2. **Platform configurations** → **Add a platform** → **Single-page application**
3. **Add Redirect URIs** (must match your app; Facilon uses `/login/callback`):
   ```
   http://localhost:3000/login/callback
   http://localhost:3000
   https://yourdomain.com/login/callback
   ```
4. **Logout URL**: `http://localhost:3000/logout`
5. **Implicit grant**:
   - ❌ DO NOT check "Access tokens"
   - ❌ DO NOT check "ID tokens"
6. **Click**: "Save"

### Step 6: API Permissions

1. **Navigate**: Your app → **API permissions**
2. **Click**: "Add a permission" → "Microsoft Graph" → "Delegated"
3. **Add**:
   - ✅ openid
   - ✅ offline_access
   - ✅ profile
   - ✅ email
4. **Click**: "Add permissions"
5. **(Optional)** Grant admin consent

---

## Part 3: User Flow Configuration

### Step 7: Access Your User Flow

1. **Navigate**: Azure AD B2C → **User flows** (under Policies)
2. **Click** on your user flow (or create new one if needed)
3. You'll see the User Flow overview

### Step 8: Identity Providers

1. **Left menu**: Click **"Identity providers"**
2. **Select**:
   - ✅ **Email signup** (for local accounts)
3. **Optional – Social login**: Add **Google**, **Facebook**, **Microsoft Account**, etc.  
   → **See [SOCIAL_LOGIN_SETUP.md](./SOCIAL_LOGIN_SETUP.md)** for step-by-step instructions (creating apps in Google/Facebook/Microsoft, client ID/secret, redirect URIs, and enabling them in B2C).
4. **Click**: "Save"

### Step 9: User Attributes

1. **Left menu**: Click **"User attributes"**
2. **Collect during signup**:
   - ✅ Email Address
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
3. **Click**: "Save"

### Step 10: Application Claims

1. **Left menu**: Click **"Application claims"**
2. **Return in token**:
   - ✅ Email Addresses
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - ✅ User's Object ID (sub)
3. **Click**: "Save"

---

## Part 4: 🎨 Custom Page Configuration

This is the most important part! The UI varies by B2C version.

### Method 1: Page layouts Section

1. **Left menu**: Click **"Page layouts"**
2. **You'll see**: "Attribute collection page" at the top
3. **SCROLL DOWN** to find these sections:

#### Look for "Unified sign up or sign in page":
- **Click** to expand (if collapsed)
- **Check**: ✅ "Use custom page content"
- **Custom page URI**: 
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signin.html
  ```
- **Click**: "Save"

#### Look for "Local account sign up page" or "Sign up page":
- **Check**: ✅ "Use custom page content"
- **Custom page URI**:
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signup.html
  ```
- **Click**: "Save"

#### Look for "Password reset page":
- **Check**: ✅ "Use custom page content"
- **Custom page URI**:
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
  ```
- **Click**: "Save"

### Method 2: Company Branding Section (Alternative)

If you don't see custom page options in "Page layouts":

1. **Left menu**: Click **"Company branding"** (under Customize)
2. **Look for tabs**: "Basic", "Advanced", "Page UI customization"
3. **Click**: **"Page UI customization"** tab
4. **For each page type**:
   - **Enable custom page content**: Check ✅
   - **Custom page URI**: Paste GitHub URL
   - **Save**

### Method 3: Properties Section (Some B2C Versions)

1. **Left menu**: Click **"Properties"**
2. **Scroll down** to find **"Page UI customization"** section
3. **Configure custom page URLs** for each page type

---

## 🧪 Test Your Configuration

### Step 11: Run User Flow with Custom Pages

1. **In User Flow overview**: Click **"Run user flow"** (top button)
2. **Select**:
   - **Application**: Facilon Platform
   - **Reply URL**: `http://localhost:3000/auth/callback`
3. **Click**: "Run user flow"
4. **What should happen**:
   - ✅ Browser opens new tab
   - ✅ Shows your custom page from GitHub
   - ✅ Facilon logo appears
   - ✅ Red/blue brand colors visible
   - ✅ Authentication form is injected by Azure
   - ✅ You can enter email/password

### Verify in Browser:

1. **Check URL** in address bar - should be your GitHub Pages URL
2. **Open DevTools** (F12) → Console tab
3. **Look for**: `[Facilon Auth] ...` log messages
4. **Check**: No CORS errors
5. **Inspect element**: `<div id="api">` should contain form elements

---

## 📱 Mobile Testing

Test responsive design:

1. **Open DevTools** (F12)
2. **Click** device toolbar icon (mobile view)
3. **Test** different screen sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
4. **Verify**: Layout adjusts properly

---

## 🔐 Important Security Notes for B2C

### 1. Authorization Code Flow (NOT Implicit!)

In App Registration → Authentication:
- ❌ **DO NOT enable** implicit grant
- ✅ **Use** Authorization Code Flow
- ✅ **PKCE** is handled automatically by MSAL.js

### 2. Token Validation in Backend

Your Spring Boot backend must:
- Validate token signature (JWKS from B2C)
- Verify issuer: `https://{tenant}.b2clogin.com/{tenant-id}/v2.0/`
- Verify audience matches your Client ID
- Check token expiration

### 3. HTTPS Required

- ✅ GitHub Pages uses HTTPS automatically
- ✅ Custom pages must be served over HTTPS
- ❌ HTTP will not work for custom pages

---

## 🌐 URLs for Your B2C Configuration

### Endpoints:

```
Authority:
https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}

Example:
https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/B2C_1_SignupSignin

Authorize:
https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}/oauth2/v2.0/authorize

Token:
https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}/oauth2/v2.0/token

JWKS (for token validation):
https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/{policy}/discovery/v2.0/keys
```

### Your Custom Pages:

```
Sign In:
https://bhoisamanta.github.io/facilon-auth-pages/signin.html

Sign Up:
https://bhoisamanta.github.io/facilon-auth-pages/signup.html

Password Reset:
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

## ✅ Configuration Checklist

### Azure AD B2C
- [ ] B2C tenant exists and accessible
- [ ] App registration created
- [ ] Client ID recorded
- [ ] Redirect URIs configured (SPA platform)
- [ ] Implicit grant NOT enabled
- [ ] API permissions added
- [ ] User flow created (Sign up and sign in)
- [ ] Identity providers configured
- [ ] User attributes selected
- [ ] Application claims configured

### Custom Pages
- [ ] GitHub Pages deployed
- [ ] signin.html accessible
- [ ] signup.html accessible  
- [ ] resetpassword.html accessible
- [ ] Facilon logo loads correctly
- [ ] Brand colors applied
- [ ] Mobile responsive

### User Flow Page Layouts
- [ ] Found "Page layouts" or "Company branding" section
- [ ] Located custom page content settings
- [ ] Added signin.html URL
- [ ] Added signup.html URL
- [ ] Added resetpassword.html URL
- [ ] Saved all configurations

### Testing
- [ ] Run user flow shows custom page
- [ ] Logo and branding visible
- [ ] Form appears in page
- [ ] Can sign in successfully
- [ ] No console errors
- [ ] Mobile view works

---

## 🎉 After Azure B2C Setup Complete

Once everything is working in Azure, let me know and I'll help you:

1. **Configure Spring Boot backend** to validate B2C tokens
2. **Implement React callback handler** for OAuth flow
3. **Update existing B2C controller** if needed
4. **Test complete authentication** flow
5. **Deploy to production**

---

## 📸 Can't Find Page Customization?

If you're still unable to locate where to add custom page URLs:

**Send me a screenshot showing**:
1. The left sidebar menu when viewing your User Flow
2. Any "Company branding", "Customize", or "Page layouts" screens

I'll pinpoint exactly where the field is in your specific B2C interface version!

---

## 🔗 Useful Links

- **Your GitHub Repo**: https://github.com/bhoisamanta/facilon-auth-pages
- **Your GitHub Pages**: https://bhoisamanta.github.io/facilon-auth-pages/
- **Azure Portal**: https://portal.azure.com
- **B2C Documentation**: https://learn.microsoft.com/azure/active-directory-b2c/
- **Custom Page UI**: https://learn.microsoft.com/azure/active-directory-b2c/customize-ui-with-html
