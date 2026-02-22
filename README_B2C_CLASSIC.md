# Facilon Authentication Pages for Azure AD B2C (Classic)

Custom HTML pages for **Azure AD B2C (Classic)** authentication, designed to be hosted on GitHub Pages and integrated with B2C User Flows/Policies.

## 🎯 For Azure AD B2C Classic Users

This guide is specifically for **Azure AD B2C (Classic)**, NOT Entra External ID (CIAM).

## Directory Structure

```
facilon-auth-pages/
├── signin.html          # Sign-in page
├── signup.html          # Sign-up/registration page
├── resetpassword.html   # Password reset page
├── css/
│   └── auth.css         # Shared stylesheet with Facilon branding
├── js/
│   └── auth.js          # Custom JavaScript enhancements
├── assets/
│   └── logo.png         # Facilon logo (red & blue)
└── README_B2C_CLASSIC.md  # This file
```

---

## Part 1: GitHub Pages Setup

### Step 1: Upload to GitHub

Your repository: https://github.com/bhoisamanta/facilon-auth-pages

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Add Facilon B2C custom authentication pages"
git push
```

### Step 2: Enable GitHub Pages

1. Go to: https://github.com/bhoisamanta/facilon-auth-pages/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: main
4. **Folder**: / (root)
5. **Save**

Wait 1-2 minutes, then verify:
```
✅ https://bhoisamanta.github.io/facilon-auth-pages/signin.html
✅ https://bhoisamanta.github.io/facilon-auth-pages/signup.html
✅ https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

---

## Part 2: Azure AD B2C Configuration

### STEP 1: Access Your B2C Tenant

1. Go to [Azure Portal](https://portal.azure.com)
2. **Search**: "Azure AD B2C" or "B2C"
3. **Select** your existing B2C tenant (or create new one)
4. **Click**: "Azure AD B2C" in the left menu

### STEP 2: App Registration (If Not Already Done)

1. **Navigate**: Azure AD B2C → App registrations
2. **Click**: "New registration"
3. **Configuration**:
   - **Name**: Facilon Platform
   - **Supported account types**: "Accounts in any identity provider or organizational directory (for authenticating users with user flows)"
   - **Redirect URI**:
     - Platform: **Web**
     - URI: `http://localhost:3000/auth/callback`
4. **Click**: "Register"
5. **Record**:
   ```
   Application (client) ID: ___________________________________
   ```

### STEP 3: Configure Authentication

1. **Navigate**: App registration → Authentication
2. **Add Redirect URIs**:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (production)
3. **Logout URL**: `http://localhost:3000/logout`
4. **Implicit grant and hybrid flows**:
   - ❌ **DO NOT CHECK** "Access tokens"
   - ❌ **DO NOT CHECK** "ID tokens"
   - (Using Authorization Code Flow)
5. **Click**: "Save"

---

### STEP 4: Create or Update User Flow

#### Option A: Create New User Flow

1. **Navigate**: Azure AD B2C → User flows (under Policies)
2. **Click**: "New user flow"
3. **Select**: "Sign up and sign in" (recommended)
4. **Version**: Select "Recommended"
5. **Name**: `SignupSignin` (becomes `B2C_1_SignupSignin`)
6. **Click**: "Create"

#### Option B: Use Existing User Flow

If you already have a user flow, select it from the list.

---

### STEP 5: Configure Identity Providers

1. **In your user flow**: Click on your user flow name
2. **Left menu**: Identity providers
3. **Select**:
   - ✅ **Email signup** (local accounts)
4. **Optional**: Add social providers (Microsoft, Google, Facebook)
5. **Click**: "Save"

---

### STEP 6: Configure User Attributes & Claims

1. **In your user flow**: User attributes (left menu)
2. **Collect these attributes**:
   - ✅ Email Address (required)
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
3. **Return these claims in token**:
   - ✅ Email Addresses
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - ✅ User's Object ID
4. **Click**: "Save"

---

### STEP 7: 🎨 Configure Page UI Customization (CRITICAL!)

This is where you add your GitHub Pages URLs!

#### Method 1: Via "Page layouts" (Newer B2C Interface)

1. **In your user flow**: Click **"Page layouts"** in left menu
2. **Scroll down** past "Attribute collection page"
3. You'll see sections like:
   - **"Local account sign up page"**
   - **"Local account sign in page"**
   - **"Self-asserted page"**
   - **"Unified sign up or sign in page"**

For each relevant page:

##### Unified sign up or sign in page:
- **Click** to expand the section
- **Check**: ✅ "Use custom page content"
- **Custom page URI**:
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signin.html
  ```
- **Click**: "Save"

##### Sign up page / Local account sign up page:
- **Check**: ✅ "Use custom page content"
- **Custom page URI**:
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/signup.html
  ```
- **Click**: "Save"

##### Password reset page / Forgot password:
- **Check**: ✅ "Use custom page content"
- **Custom page URI**:
  ```
  https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
  ```
- **Click**: "Save"

#### Method 2: Via "Company branding" (Older B2C Interface)

If you don't see "Page layouts", look for:

1. **User flow** → **Company branding** (left menu)
2. **Page UI customization** tab
3. For each page type, you'll see:
   - **Enable custom page content**: Check this
   - **Custom page URI**: Paste your GitHub Pages URL
4. **Save** each page

---

### STEP 8: Properties & Token Configuration

1. **In your user flow**: Properties (left menu)
2. **Token lifetime**:
   - **Token lifetime (minutes)**: 60
   - **Token refresh time (days)**: 14
3. **Click**: "Save"

---

## 🔍 Finding the Right Section in B2C

Since you're on the **Page layouts** screen already, here's exactly what to do:

### Look for These Headers on That Same Page:

After the "Attribute collection page" section, you should see:

```
┌─────────────────────────────────────────────────┐
│ Attribute collection page                       │
│ ↑ You are here (in your screenshot)            │
│                                                 │
│ (Scroll down ↓)                                 │
│                                                 │
│ 📄 Unified sign up or sign in page    ← FIND   │
│    ☐ Use custom page content                   │
│    Custom page URI: [_______________]          │
│                                                 │
│ 📄 Local account sign up page          ← FIND  │
│    ☐ Use custom page content                   │
│    Custom page URI: [_______________]          │
│                                                 │
│ 📄 Password reset page                 ← FIND  │
│    ☐ Use custom page content                   │
│    Custom page URI: [_______________]          │
└─────────────────────────────────────────────────┘
```

---

## 📋 Quick Reference for B2C Classic

### Your GitHub Pages URLs (Copy & Paste):

```
Sign-in:
https://bhoisamanta.github.io/facilon-auth-pages/signin.html

Sign-up:
https://bhoisamanta.github.io/facilon-auth-pages/signup.html

Password Reset:
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

### B2C Authority URL Format:

```
https://{tenant-name}.b2clogin.com/{tenant-name}.onmicrosoft.com/{policy-name}/oauth2/v2.0/authorize
```

Example:
```
https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/B2C_1_SignupSignin/oauth2/v2.0/authorize
```

### Configuration Values Needed:

```
✅ Tenant Name: _______________________ (e.g., facilonservices)
✅ Tenant ID: _______________________ (GUID)
✅ Client ID: _______________________ (GUID)
✅ Policy Name: _______________________ (e.g., B2C_1_SignupSignin)
✅ GitHub Pages Base: https://bhoisamanta.github.io/facilon-auth-pages/
```

---

## 🔧 Backend Configuration for B2C

Update your `application-dev.yml`:

```yaml
azure:
  b2c:
    enabled: true
    tenant: facilonservices  # Your B2C tenant name
    tenant-id: <your-tenant-guid>
    client-id: <your-client-id>
    client-secret: <optional-for-backend-flow>
    signup-signin-policy: B2C_1_SignupSignin
    redirect-uri: http://localhost:3000/auth/callback
    post-logout-redirect-uri: http://localhost:3000
    scope: openid profile email offline_access
```

---

## 🧪 Test Your Custom Pages

### Test 1: Direct URL Access

Open in browser:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

**Expected**: Page loads with Facilon logo and styling (form won't appear - that's normal)

### Test 2: Run User Flow

1. **In Azure Portal**: Go to your User Flow
2. **Click**: "Run user flow" button (top of page)
3. **Select**:
   - Application: Your app registration
   - Reply URL: `http://localhost:3000/auth/callback`
4. **Click**: "Run user flow"
5. **Expected**:
   - Opens your custom GitHub Pages URL
   - Shows Facilon logo and branding
   - Azure B2C injects login form
   - You can enter credentials

---

## 🚨 Troubleshooting B2C Classic

### Issue: Can't find "Use custom page content" checkbox

**Solution**: The Page layouts interface varies by B2C version.

Try these locations:

1. **User flow** → **Page layouts** → Scroll to bottom
2. **User flow** → **Company branding** → **Page UI customization** tab
3. **User flow** → **Customize** → **Page layouts**
4. **User flow** → **Properties** → Look for "Custom page" section

### Issue: Custom page content option greyed out

**Cause**: Premium feature not enabled

**Solution**:
- Azure AD B2C custom pages require **Premium P1** license in some regions
- Or use **Company branding** instead (limited customization)

### Issue: CORS errors in browser console

**Cause**: B2C can't load your GitHub Pages

**Solution**:
1. Ensure GitHub repo is **public**
2. Verify GitHub Pages is **enabled**
3. Test URL directly in browser
4. GitHub Pages automatically has correct CORS headers

### Issue: Page loads but form doesn't appear

**Cause**: Missing `<div id="api"></div>` or incorrect policy reference

**Solution**:
1. Verify HTML has `<div id="api"></div>`
2. Check you're accessing via "Run user flow" not directly
3. Clear browser cache
4. Check browser console for errors

---

## 🔄 B2C vs Entra External ID Differences

| Feature | Azure AD B2C (Classic) | Entra External ID (CIAM) |
|---------|------------------------|--------------------------|
| **Authority URL** | `{tenant}.b2clogin.com` | `{tenant}.ciamlogin.com` |
| **Policy Format** | `B2C_1_PolicyName` | User flow name |
| **Portal** | Azure AD B2C blade | Microsoft Entra External ID |
| **Custom Pages** | Company branding / Page layouts | Page layouts |
| **Tenant Type** | B2C tenant | CIAM tenant |

**Your Setup**: Azure AD B2C (Classic) ✅

---

## 📝 Next Steps After Azure Setup

Once your B2C custom pages are configured:

1. **Test** the user flow with custom pages
2. **Record** all configuration values
3. **Configure** backend (Spring Boot) to handle B2C tokens
4. **Implement** React callback handler
5. **Test** end-to-end authentication flow

Let me know when B2C is configured and I'll help with the backend integration!

---

## 🆘 Need Help Finding the Custom Page Option?

**Take a screenshot of**:
1. The full left sidebar menu when viewing your User Flow
2. Any "Company branding" or "Page layouts" screens

I'll tell you exactly where the custom page URL field is!

---

## 💡 Quick Tips for B2C Classic

1. **User Flows** = Policies (same thing, different names)
2. **Page layouts** might be under **Customize** section
3. Some B2C tenants show **"Company branding"** instead
4. Custom page URI field might be labeled **"Custom page content URI"**
5. You might see tabs: **"Page UI customization"** - click that!

---

## 📧 Support

- Email: support@facilonservices.com
- B2C Documentation: https://docs.microsoft.com/azure/active-directory-b2c/
- GitHub Issues: https://github.com/bhoisamanta/facilon-auth-pages/issues
