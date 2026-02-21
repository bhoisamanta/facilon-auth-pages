# Azure Entra External ID - Complete Setup Guide

## Prerequisites

- Azure subscription with access to create tenants
- GitHub account for hosting custom pages
- Access to Azure Portal: https://portal.azure.com

---

## Part 1: Azure Entra External ID Tenant Setup

### Step 1: Create Tenant

1. **Login** to [Azure Portal](https://portal.azure.com)
2. **Search** for "Microsoft Entra External ID" in the top search bar
3. **Click** on "Microsoft Entra External ID"
4. **Click** "Create a tenant"

### Step 2: Select Tenant Type

1. **Select**: "Customer identity and access management (CIAM)"
   - This is for external users (customers, investors)
   - NOT "Workforce" (which is for employees)
2. **Click**: "Next: Configuration"

### Step 3: Configure Tenant

1. **Organization name**: `Facilon Services`
2. **Initial domain name**: `facilonexternal`
   - This creates: `facilonexternal.onmicrosoft.com`
   - CIAM URL: `facilonexternal.ciamlogin.com`
3. **Country/Region**: Select your country
4. **Click**: "Next: Review + create"
5. **Review** settings and click "Create"

### Step 4: Wait for Tenant Creation

- Creation takes 2-5 minutes
- You'll see a notification when complete
- **IMPORTANT**: Record these values:

```
Tenant Name: facilonexternal
Tenant ID: [COPY FROM AZURE - IT'S A GUID]
Domain: facilonexternal.ciamlogin.com
```

---

## Part 2: App Registration

### Step 5: Switch to New Tenant

1. **Click** your profile icon (top right)
2. **Click** "Switch directory"
3. **Select** your new tenant (`facilonexternal`)
4. **Confirm** you're in the correct tenant (name shows in top bar)

### Step 6: Create App Registration

1. **Navigate**: Microsoft Entra ID → App registrations
2. **Click**: "New registration"
3. **Fill in details**:
   - **Name**: `Facilon Platform`
   - **Supported account types**: 
     - Select: "Accounts in this organizational directory only (Facilon Services only - Single tenant)"
   - **Redirect URI**:
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:3000/auth/callback`
4. **Click**: "Register"

### Step 7: Record App Details

After registration, you'll see the Overview page:

```
Application (client) ID: [COPY THIS - IT'S A GUID]
Directory (tenant) ID: [COPY THIS - IT'S A GUID]
Object ID: [Not needed for now]
```

**IMPORTANT**: Save these IDs - you'll need them later!

### Step 8: Add More Redirect URIs

1. **Navigate**: App registration → Authentication (left menu)
2. **Under "Single-page application"**, click "Add URI"
3. **Add these URIs** (one at a time):
   - `http://localhost:3000`
   - `https://yourdomain.com/auth/callback` (for production)
4. **Logout URL**: 
   - **Front-channel logout URL**: `http://localhost:3000/logout`
5. **Implicit grant and hybrid flows**:
   - ❌ **DO NOT CHECK** "Access tokens"
   - ❌ **DO NOT CHECK** "ID tokens"
   - (You're using Authorization Code Flow with PKCE - these are not needed)
6. **Click**: "Save" at the bottom

### Step 9: Configure API Permissions

1. **Navigate**: App registration → API permissions
2. **Click**: "Add a permission"
3. **Select**: "Microsoft Graph"
4. **Select**: "Delegated permissions"
5. **Check these permissions**:
   - ✅ `openid` (should already be there)
   - ✅ `profile` (should already be there)
   - ✅ `email`
   - ✅ `offline_access`
   - ✅ `User.Read`
6. **Click**: "Add permissions"
7. **Optional**: If you have admin rights, click "Grant admin consent for Facilon Services"

---

## Part 3: Create User Flow

### Step 10: Create Sign-up and Sign-in Flow

1. **Navigate**: Microsoft Entra External ID → User flows
2. **Click**: "New user flow"
3. **Select**: "Sign up and sign in"
4. **Configuration**:
   - **Name**: `signup_signin`
   - **Note**: Azure automatically adds `B2C_1_` prefix
   - **Full name**: `B2C_1_signup_signin`
5. **Click**: "Create"

### Step 11: Configure Identity Providers

1. **In your user flow**: Identity providers (left menu)
2. **Local accounts**: 
   - ✅ Check "Email signup"
3. **Social identity providers** (optional):
   - Add Microsoft, Google, etc. if needed
4. **Click**: "Save"

### Step 12: Configure User Attributes

1. **In your user flow**: User attributes (left menu)
2. **Select attributes to collect during signup**:
   - ✅ Email Address (automatically selected)
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - Add custom attributes if needed
3. **Select claims to return in token**:
   - ✅ Email Addresses
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - ✅ User's Object ID
4. **Click**: "Save"

### Step 13: Configure Token Lifetime

1. **In your user flow**: Properties
2. **Token lifetime**:
   - **Access token**: 60 minutes
   - **Refresh token**: 14 days
   - **ID token**: 60 minutes
3. **Click**: "Save"

---

## Part 4: Configure Custom Pages (MOST IMPORTANT!)

This is where you connect your GitHub Pages to Azure User Flow.

### Step 14: Configure Page Layouts

1. **In your user flow**: Page layouts (left menu)
2. **You'll see these page types**:
   - Unified sign up or sign in page
   - Sign up page
   - Sign in page
   - Password reset page
   - Multi-factor authentication page

### Step 15: Configure Sign-in Page

1. **Click**: "Unified sign up or sign in page"
2. **Enable custom page**:
   - ✅ Check "Use custom page content"
3. **Custom page URI**: 
   ```
   https://yourusername.github.io/facilon-auth-pages/signin.html
   ```
   - **IMPORTANT**: Replace `yourusername` with your GitHub username!
4. **Click**: "Save"

### Step 16: Configure Sign-up Page

1. **Click**: "Sign up page"
2. **Enable custom page**:
   - ✅ Check "Use custom page content"
3. **Custom page URI**:
   ```
   https://yourusername.github.io/facilon-auth-pages/signup.html
   ```
4. **Click**: "Save"

### Step 17: Configure Password Reset Page

1. **Click**: "Password reset page"
2. **Enable custom page**:
   - ✅ Check "Use custom page content"
3. **Custom page URI**:
   ```
   https://yourusername.github.io/facilon-auth-pages/resetpassword.html
   ```
4. **Click**: "Save"

### Step 18: Test Custom Pages

1. **Click**: "Run user flow" (top of User flow page)
2. **Application**: Select "Facilon Platform"
3. **Reply URL**: Select `http://localhost:3000/auth/callback`
4. **Click**: "Run user flow"
5. **Verify**: 
   - ✅ Your custom HTML page loads (check logo, branding)
   - ✅ Authentication form appears in the page
   - ✅ Page styling looks correct
   - ✅ No CORS errors in browser console (F12)

---

## Part 5: Configuration Summary

### Values You Need for Backend (application-dev.yml)

```yaml
azure:
  entra:
    external:
      enabled: true
      tenant: facilonexternal
      tenant-id: <YOUR_TENANT_ID>
      client-id: <YOUR_CLIENT_ID>
      redirect-uri: http://localhost:3000/auth/callback
      scope: openid profile email offline_access
```

### Values You Need for Frontend (.env)

```bash
REACT_APP_ENTRA_ENABLED=true
REACT_APP_ENTRA_CLIENT_ID=<YOUR_CLIENT_ID>
REACT_APP_ENTRA_TENANT=facilonexternal
REACT_APP_ENTRA_TENANT_ID=<YOUR_TENANT_ID>
REACT_APP_ENTRA_REDIRECT_URI=http://localhost:3000/auth/callback
REACT_APP_ENTRA_AUTHORITY=https://facilonexternal.ciamlogin.com/<YOUR_TENANT_ID>
```

### User Flow Endpoint

```
https://facilonexternal.ciamlogin.com/<YOUR_TENANT_ID>/oauth2/v2.0/authorize?p=B2C_1_signup_signin&client_id=<YOUR_CLIENT_ID>&redirect_uri=http://localhost:3000/auth/callback&scope=openid profile email offline_access&response_type=code&prompt=login
```

---

## Part 6: Testing

### Test 1: Access Custom Page

1. Open browser
2. Navigate to: `https://yourusername.github.io/facilon-auth-pages/signin.html`
3. **Expected**: Page loads with your branding
4. **Note**: Form won't appear (Azure only injects form when coming from User Flow)

### Test 2: Test User Flow

1. In Azure Portal, go to your User Flow
2. Click "Run user flow"
3. **Expected**: 
   - Redirects to your custom page
   - Form appears in the page
   - Can enter credentials
   - Can sign in successfully

### Test 3: Test from React App (After Backend Setup)

1. Start React app: `npm start`
2. Navigate to: `http://localhost:3000/login`
3. Click "Sign in with Microsoft (Entra)"
4. **Expected**:
   - Redirects to your custom GitHub Pages signin page
   - Shows authentication form
   - After login, redirects back to `http://localhost:3000/auth/callback`
   - React app handles callback and redirects to dashboard

---

## Troubleshooting Common Issues

### Issue 1: "Custom page content cannot be loaded"

**Cause**: Azure cannot access your GitHub Pages URL

**Solutions**:
- Ensure GitHub repository is **public**
- Verify GitHub Pages is enabled in repo settings
- Check URL is correct with no typos
- Test URL in browser (should load without login)
- Wait 5-10 minutes after enabling GitHub Pages

### Issue 2: "AADB2C90205: This application does not have sufficient permissions"

**Cause**: Missing API permissions

**Solutions**:
- Go to App registration → API permissions
- Verify all required permissions are added
- Click "Grant admin consent"

### Issue 3: Form doesn't appear in custom page

**Cause**: Missing `<div id="api"></div>` or CSS hiding it

**Solutions**:
- Check HTML has `<div id="api"></div>`
- Inspect element in browser DevTools
- Verify no CSS rules hiding the div
- Check console for JavaScript errors

### Issue 4: Redirect URI mismatch

**Cause**: Callback URL doesn't match registered redirect URI

**Solutions**:
- Verify exact match (case-sensitive, http vs https)
- Check for trailing slashes
- Update redirect URIs in App registration → Authentication

---

## Quick Command Reference

### GitHub Pages Deployment

```bash
# Clone your repo
git clone https://github.com/yourusername/facilon-auth-pages.git
cd facilon-auth-pages

# Add files
cp -r /path/to/facilon/githubpage/* .

# Commit and push
git add .
git commit -m "Add custom authentication pages"
git push origin main

# GitHub Pages will auto-deploy in ~1 minute
```

### Azure CLI Commands (Alternative)

```bash
# Login to Azure
az login

# Create resource group
az group create --name facilon-auth-rg --location eastus

# Create Entra External ID tenant (requires portal - no CLI command)
# You must use Azure Portal for this step

# List your tenants
az account tenant list
```

---

## Final Checklist

Complete this checklist before integrating with your application:

### Azure Configuration
- [ ] Entra External ID tenant created
- [ ] Tenant ID recorded
- [ ] App registration created
- [ ] Client ID recorded
- [ ] Redirect URIs added (localhost + production)
- [ ] API permissions granted
- [ ] User Flow created
- [ ] Identity providers configured
- [ ] User attributes selected
- [ ] Custom page URLs configured for all page types
- [ ] User Flow tested successfully

### GitHub Pages
- [ ] Repository created
- [ ] Repository is public
- [ ] GitHub Pages enabled
- [ ] Custom HTML pages uploaded
- [ ] Logo and assets uploaded
- [ ] Pages accessible via HTTPS
- [ ] No 404 errors on asset files

### Testing
- [ ] Custom page loads from GitHub
- [ ] Azure injects form into #api div
- [ ] Sign-in flow completes successfully
- [ ] Sign-up flow works
- [ ] Password reset works
- [ ] No console errors
- [ ] Mobile responsive

### Ready for Integration
- [ ] All configuration values recorded
- [ ] Backend endpoints ready
- [ ] React app callback handler implemented
- [ ] Environment variables configured

---

## Contact

For technical support:
- **Email**: support@facilonservices.com
- **Azure Support**: https://azure.microsoft.com/support/
- **GitHub Issues**: Create an issue in this repository
