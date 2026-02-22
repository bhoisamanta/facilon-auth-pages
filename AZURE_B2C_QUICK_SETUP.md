# Azure B2C Quick Setup Checklist

Use this as a quick reference for configuring Azure AD B2C for the Facilon application.

---

## Azure Portal Configuration

### 1. App Registration → Authentication

Navigate to: **Azure Portal > Azure AD B2C > App registrations > [Your App] > Authentication**

#### Platform: Single-page application (SPA)

**Add these Redirect URIs:**
```
http://localhost:3000/login/callback
https://your-production-domain.com/login/callback
```

**Front-channel logout URL:**
```
http://localhost:3000/login
https://your-production-domain.com/login
```

**Implicit grant and hybrid flows:**
- ❌ Access tokens (unchecked)
- ❌ ID tokens (unchecked)

**Why unchecked?** MSAL uses Authorization Code Flow with PKCE (more secure), not implicit flow.

---

### 2. User Flow Settings

Navigate to: **Azure AD B2C > User flows > [Your sign-in flow]**

**Ensure these claims are selected:**
- ✅ Email Addresses
- ✅ User's Object ID
- ✅ Given Name
- ✅ Surname
- ✅ Display Name

---

### 3. Application Claims (Token Configuration)

Navigate to: **App registrations > [Your App] > Token configuration**

Verify optional claims include:
- `email`
- `given_name`
- `family_name`
- `name`

---

## Environment Configuration

### Backend (`application-dev.yml`):

```yaml
azure:
  b2c:
    tenant-name: facilonservices
    client-id: 54e55d9e-551a-4db4-b1e1-92fdb3e38c01
    client-secret: ${AZURE_B2C_CLIENT_SECRET}
    sign-in-policy: B2C_1_2Signin
    redirect-uri: http://localhost:3000/login/callback
    post-logout-redirect-uri: http://localhost:3000/login
    scope: openid profile email
```

### Frontend (`.env`):

```env
REACT_APP_AZURE_B2C_AUTHORITY=https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/B2C_1_2Signin
REACT_APP_AZURE_B2C_CLIENT_ID=54e55d9e-551a-4db4-b1e1-92fdb3e38c01
REACT_APP_AZURE_B2C_KNOWN_AUTHORITIES=facilonservices.b2clogin.com
REACT_APP_REDIRECT_URI=http://localhost:3000/login/callback
```

---

## Testing the Flow

### Login Flow:
1. Go to `http://localhost:3000/login`
2. Should auto-redirect to Azure B2C
3. Enter credentials
4. Redirects to `http://localhost:3000/login/callback#state=...&code=...`
5. Frontend sends ID token to backend
6. Backend validates and returns JWT
7. Lands on `/investor/dashboard`

### Logout Flow:
1. Click "Logout" from header dropdown
2. MSAL clears local tokens
3. Redirects to Azure B2C logout
4. Azure B2C clears session
5. Redirects back to `/login`

---

## Quick Verification

Run these checks in browser console after login:

```javascript
// Check if token exists
console.log('Has JWT:', !!localStorage.getItem('JwtToken'));

// Check MSAL accounts
console.log('MSAL accounts:', window.msal?.instance?.getAllAccounts());

// Check login method
console.log('Login method:', localStorage.getItem('loginMethod'));
```

Expected output after MSAL login:
```
Has JWT: true
MSAL accounts: [{ username: "user@example.com", ... }]
Login method: "azure-b2c-msal"
```

---

## Common Mistakes

1. ❌ **Wrong platform type**: Using "Web" instead of "Single-page application"
2. ❌ **Implicit grant enabled**: Should be disabled for PKCE flow
3. ❌ **Missing logout URI**: Front-channel logout URL not configured
4. ❌ **Mismatched URIs**: Typo in redirect URI (trailing slash, http vs https)
5. ❌ **Wrong user flow name**: Case-sensitive, must match exactly

---

## Need Help?

- **Full setup guide**: See `AZURE_B2C_CONFIGURATION_GUIDE.md`
- **Logout details**: See `LOGOUT_CONFIGURATION.md`
- **MSAL SPA setup**: See `AZURE_B2C_SPA_SETUP.md`
- **Redirect URI issues**: See `REDIRECT_URI_MISMATCH_FIX.md`
