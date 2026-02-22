# Azure AD B2C - SPA Platform Configuration

For **single-page applications (SPAs)** using MSAL, Azure B2C requires redirect URIs to be registered under the **Single-page application** platform (not Web).

---

## Step 1: Open Your App Registration

1. Go to **Azure Portal** → **Azure AD B2C** (or your B2C tenant)
2. Navigate to **App registrations**
3. Open your app (client ID: `54e55d9e-551a-4db4-b1e1-92fdb3e38c01`)

---

## Step 2: Add SPA Platform

1. In the left menu, click **Authentication**
2. Under **Platform configurations**, look for **Single-page application**:
   - If it exists, click on it to expand
   - If it doesn't exist, click **Add a platform** → **Single-page application**

---

## Step 3: Add Redirect URIs

Under **Single-page application** → **Redirect URIs**, add:

### Local Development
```
http://localhost:3000/login/callback
```

### Production
```
https://<your-domain>/login/callback
```

**Important:**
- URI must match **exactly** (no trailing slash)
- Path is `/login/callback` (not `/callback` or `/auth/callback`)
- Protocol must match (http for local, https for production)

---

## Step 4: Implicit Grant (Keep Disabled)

Under **Implicit grant and hybrid flows**:
- ❌ **DO NOT** check "Access tokens"
- ❌ **DO NOT** check "ID tokens"

MSAL uses **authorization code flow with PKCE** (more secure), not implicit flow.

---

## Step 5: Save

Click **Save** at the top of the page.

---

## Step 6: Verify Configuration

After saving, your **Authentication** page should show:

```
Platform configurations
├─ Single-page application
│  └─ Redirect URIs:
│     • http://localhost:3000/login/callback
│     • https://<your-domain>/login/callback
│
└─ Implicit grant and hybrid flows
   • Access tokens: ❌ (unchecked)
   • ID tokens: ❌ (unchecked)
```

---

## Test the Flow

1. Navigate to `http://localhost:3000/login`
2. You should auto-redirect to Azure B2C sign-in page
3. After sign-in, B2C redirects to `/login/callback`
4. MSAL handles the token exchange
5. You're redirected to dashboard

If you see `redirect_uri_mismatch`, the URI is not registered or is under the wrong platform (e.g. Web instead of SPA).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `redirect_uri_mismatch` | Ensure URI is added under **SPA** platform, not Web |
| Cookies blocked error | Enable third-party cookies or use custom domain |
| Silent refresh fails | Check `offline_access` scope and cacheLocation |
| Redirect loop | Check MSAL config redirectUri matches registered URI |

---

## MSAL Configuration (authConfig.ts)

Current config:

```typescript
redirectUri: `${window.location.origin}/login/callback`
// Resolves to: http://localhost:3000/login/callback
```

This matches the registered URI in Azure B2C.
