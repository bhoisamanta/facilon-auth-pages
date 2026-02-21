# Azure Entra External ID - Quick Start

## ✅ Your Files Are Ready!

All custom authentication pages with Facilon branding are ready to upload.

---

## 📤 Upload to GitHub (Already Done!)

Your repository: https://github.com/bhoisamanta/facilon-auth-pages

Just commit and push the updated files:

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Update with Facilon logo and brand colors"
git push
```

---

## 🔧 Azure Configuration Steps

### STEP 1: Create Entra External ID Tenant

1. Go to [Azure Portal](https://portal.azure.com)
2. Search: "Microsoft Entra External ID"
3. Click: "Create a tenant"
4. Select: "Customer identity and access management (CIAM)"
5. Fill in:
   - Organization name: **Facilon Services**
   - Initial domain: **facilonexternal**
   - Country: Your country
6. Click: "Create" (takes 2-3 minutes)
7. **Record these values**:
   ```
   Tenant ID: ___________________________________
   Domain: facilonexternal.ciamlogin.com
   ```

---

### STEP 2: Create App Registration

1. **Switch to new tenant**: Profile icon → Switch directory → Select "facilonexternal"
2. Go to: **Microsoft Entra ID** → **App registrations**
3. Click: "New registration"
4. Fill in:
   - Name: **Facilon Platform**
   - Supported accounts: **Single tenant**
   - Redirect URI:
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:3000/auth/callback`
5. Click: "Register"
6. **Record**: 
   ```
   Client ID: ___________________________________
   ```

---

### STEP 3: Configure Authentication Settings

1. Go to: **App registration** → **Authentication**
2. Add more redirect URIs:
   - `http://localhost:3000`
   - `https://yourdomain.com/auth/callback` (for production)
3. **Front-channel logout URL**: `http://localhost:3000/logout`
4. **Implicit grant and hybrid flows**:
   - ❌ **DO NOT CHECK** "Access tokens"
   - ❌ **DO NOT CHECK** "ID tokens"
   - (You're using Authorization Code Flow with PKCE!)
5. Click: **Save**

---

### STEP 4: Add API Permissions

1. Go to: **App registration** → **API permissions**
2. Click: "Add a permission" → "Microsoft Graph" → "Delegated permissions"
3. Add these:
   - ✅ openid
   - ✅ profile
   - ✅ email
   - ✅ offline_access
   - ✅ User.Read
4. Click: "Add permissions"
5. (Optional) Click: "Grant admin consent"

---

### STEP 5: Create User Flow

1. Go to: **Microsoft Entra External ID** → **User flows**
2. Click: "New user flow"
3. Select: **"Sign up and sign in"**
4. Name: **signup_signin**
5. Click: "Create"

---

### STEP 6: Configure Identity Providers

1. In your user flow: **Identity providers**
2. Check: ✅ **Email signup**
3. (Optional) Add social providers (Microsoft, Google, etc.)
4. Click: "Save"

---

### STEP 7: Configure User Attributes

1. In your user flow: **User attributes**
2. **Collect during signup**:
   - ✅ Email Address
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
3. **Return in token**:
   - ✅ Email Addresses
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - ✅ User's Object ID
4. Click: "Save"

---

### STEP 8: 🎨 Configure Custom Pages (MOST IMPORTANT!)

1. In your user flow: **Page layouts**
2. Configure each page type:

#### Unified sign up or sign in page:
- ✅ Check: "Use custom page content"
- **Custom page URI**: 
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signin.html
  ```
- Click: "Save"

#### Sign up page:
- ✅ Check: "Use custom page content"
- **Custom page URI**: 
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signup.html
  ```
- Click: "Save"

#### Password reset page:
- ✅ Check: "Use custom page content"
- **Custom page URI**: 
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
  ```
- Click: "Save"

---

### STEP 9: Test Your Custom Pages

1. In your user flow: Click **"Run user flow"**
2. Select:
   - Application: **Facilon Platform**
   - Reply URL: `http://localhost:3000/auth/callback`
3. Click: "Run user flow"
4. **Verify**:
   - ✅ Your Facilon logo appears
   - ✅ Brand colors (red/blue) are visible
   - ✅ Authentication form is injected
   - ✅ Can enter email/password

---

## 📋 Configuration Values

After completing Azure setup, you'll need these values:

```
Tenant Name: facilonexternal
Tenant ID: ___________________________________ (from Step 1)
Client ID: ___________________________________ (from Step 2)
User Flow Name: B2C_1_signup_signin
GitHub Pages: https://bhoisamanta.github.io/facilon-auth-pages/
```

---

## 🚀 Next: Backend Integration

Once Azure setup is complete, we'll configure:

1. **Spring Boot Backend** - Token validation and JWT generation
2. **React Frontend** - Callback handler and user flow integration
3. **Testing** - End-to-end authentication flow

Let me know when Azure setup is complete and I'll help with the code integration!

---

## 🆘 Common Issues

### Custom page doesn't load
- Verify GitHub Pages is enabled (Settings → Pages)
- Wait 1-2 minutes after pushing changes
- Check URL is accessible in browser
- Verify repository is public

### Form doesn't appear
- Check `<div id="api"></div>` exists in HTML
- Open browser console (F12) for errors
- Verify User Flow "Page layouts" URLs are correct
- Clear browser cache

### Need Help?
- Read: `AZURE_SETUP_GUIDE.md` (detailed instructions with troubleshooting)
- Read: `README.md` (full documentation)
- Contact: support@facilonservices.com
