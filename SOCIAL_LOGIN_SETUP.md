# Azure AD B2C – Social Login Setup (Step-by-Step)

This guide walks you through adding **Google**, **Facebook**, and **Microsoft Account** as identity providers in Azure AD B2C (Classic), so users can sign in with social accounts.

---

## Overview

1. Create an app in each provider (Google, Facebook, Microsoft).
2. Add each provider as an **Identity provider** in Azure B2C.
3. Enable those providers in your **User flow**.
4. Test sign-in.

---

## Part 1: Add Google Sign-In

### Step 1.1 – Create a Google Cloud Project (if needed)

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)** and sign in.
2. Click the project dropdown (top left) → **New Project**.
3. **Project name**: e.g. `Facilon B2C`.
4. Click **Create**. Wait for the project to be created, then select it.

### Step 1.2 – Configure OAuth consent screen

1. In the left menu: **APIs & Services** → **OAuth consent screen**.
2. **User Type**: choose **External** (unless you use a Google Workspace org).
3. Click **Create**.
4. Fill in:
   - **App name**: `Facilon`
   - **User support email**: your email
   - **Developer contact**: your email
5. Click **Save and Continue**.
6. **Scopes**: click **Add or Remove Scopes** → add:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
7. Click **Save and Continue**.
8. **Test users** (optional): add test emails if app is in “Testing”.
9. Click **Back to Dashboard**.

### Step 1.3 – Create OAuth 2.0 credentials

1. Left menu: **APIs & Services** → **Credentials**.
2. **+ Create Credentials** → **OAuth client ID**.
3. **Application type**: **Web application**.
4. **Name**: e.g. `Facilon Azure B2C`.
5. **Authorized redirect URIs** – click **Add URI** and add **exactly**:
   ```
   https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/authresp
   ```
   Replace `facilonservices` with **your B2C tenant name**.
6. Click **Create**.
7. Copy and save:
   - **Client ID**
   - **Client Secret**

### Step 1.4 – Add Google as identity provider in Azure B2C

1. Go to **[Azure Portal](https://portal.azure.com)**.
2. Search **Azure AD B2C** → open your B2C tenant.
3. Left menu: **Identity providers** (under “Manage” / “Policies”).
4. Click **+ New OpenID Connect provider** (or **+ Add** and choose OpenID Connect).

5. Fill in:

   | Field | Value |
   |-------|--------|
   | **Name** | `Google` (or any display name) |
   | **Metadata URL** | `https://accounts.google.com/.well-known/openid-configuration` |
   | **Client ID** | Your Google OAuth Client ID |
   | **Client secret** | Your Google OAuth Client secret |
   | **Scope** | `openid profile email` |
   | **Response type** | `code` |
   | **Response mode** | `form_post` (or as per your B2C UI) |
   | **Domain hint** | (leave blank) |

6. **Claim mapping** (map Google claims to B2C):
   - **User ID**: `sub`
   - **Display Name**: `name`
   - **Given Name**: `given_name`
   - **Surname**: `family_name`
   - **Email**: `email`

7. Click **Save**.

### Step 1.5 – Enable Google in your user flow

1. Azure AD B2C → **User flows**.
2. Open your sign-in/sign-up user flow (e.g. `B2C_1_2Signin`).
3. Left menu: **Identity providers**.
4. Check **Google** (and keep **Email signup** if you want email + Google).
5. Click **Save**.

---

## Part 2: Add Facebook Sign-In

### Step 2.1 – Create a Facebook App

1. Go to **[Facebook for Developers](https://developers.facebook.com/)**.
2. **My Apps** → **Create App**.
3. **Use case**: choose **Consumer** (or **Other** if Consumer is not available).
4. **App name**: e.g. `Facilon`.
5. **App contact email**: your email.
6. Click **Create App**.

### Step 2.2 – Add Facebook Login product

1. In the app dashboard, find **Facebook Login** and click **Set Up**.
2. Choose **Web**.
3. **Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
4. Save. You can skip “Quickstart” for now.

### Step 2.3 – Get App ID and App Secret

1. **Settings** → **Basic**.
2. Copy **App ID** and **App Secret** (click **Show** for secret).  
   Keep **App Secret** secure.

### Step 2.4 – Configure Valid OAuth Redirect URIs (Facebook)

1. **Facebook Login** → **Settings** (left menu).
2. Under **Valid OAuth Redirect URIs** add:
   ```
   https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/authresp
   ```
   Replace `facilonservices` with **your B2C tenant name**.
3. **Save Changes**.

### Step 2.5 – Add Facebook as identity provider in Azure B2C

1. Azure Portal → your B2C tenant → **Identity providers**.
2. Click **+ New OpenID Connect provider** (or **+ Add** → Facebook if available).

   If using **OpenID Connect** (Facebook’s limited OIDC):
   - Some tenants use a “Facebook” template; if so, use **Client ID** = App ID, **Client secret** = App Secret and the Facebook metadata URL if provided.

   If your B2C has a **Facebook** type:
   - **Name**: `Facebook`
   - **Client ID**: Facebook App ID
   - **Client secret**: Facebook App Secret

3. **Claim mapping**: map **User ID**, **Display Name**, **Email** as per the UI (Facebook may send `id`, `name`, `email`).
4. Click **Save**.

### Step 2.6 – Enable Facebook in your user flow

1. **User flows** → your flow → **Identity providers**.
2. Check **Facebook**.
3. **Save**.

---

## Part 3: Add Microsoft Account Sign-In

### Step 3.1 – Register app in Azure AD (for Microsoft accounts)

1. In **Azure Portal**, switch to your **main Azure AD** tenant (not B2C).  
   Use the directory switcher (top right) and select the tenant that has your Azure subscription.
2. Search **App registrations** → **New registration**.
3. **Name**: e.g. `Facilon Microsoft Login`.
4. **Supported account types**: **Accounts in any organizational directory and personal Microsoft accounts**.
5. **Redirect URI**:
   - Platform: **Web**
   - URI:
     ```
     https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/authresp
     ```
   Replace `facilonservices` with **your B2C tenant name**.
6. Click **Register**.

### Step 3.2 – Create client secret

1. In the app: **Certificates & secrets**.
2. **+ New client secret** → add description → **Add**.
3. Copy the **Value** (secret) once; it’s shown only once.

### Step 3.3 – Configure API permissions

1. **API permissions** → **Add a permission**.
2. **Microsoft Graph** → **Delegated**.
3. Add:
   - **openid**
   - **email**
   - **profile**
4. **Add permissions**. Optionally **Grant admin consent**.

### Step 3.4 – Add Microsoft Account as identity provider in B2C

1. Switch back to your **B2C tenant** in the portal.
2. **Identity providers** → **+ New OpenID Connect provider** (or **Microsoft Account** if listed).
3. Fill in:
   - **Name**: `Microsoft Account`
   - **Metadata URL**:  
     `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`
   - **Client ID**: Application (client) ID from Step 3.1
   - **Client secret**: Secret from Step 3.2
   - **Scope**: `openid profile email`
   - **Response type**: `code`
   - **Response mode**: `form_post` (or as per UI)

4. **Claim mapping**:
   - User ID: `sub`
   - Display Name: `name`
   - Given Name: `given_name`
   - Surname: `family_name`
   - Email: `email` or `preferred_username`

5. **Save**.

### Step 3.5 – Enable Microsoft Account in your user flow

1. **User flows** → your flow → **Identity providers**.
2. Check **Microsoft Account** (or the name you gave).
3. **Save**.

---

## Part 4: Redirect URI Summary

All social providers must allow this redirect URI from Azure B2C (replace `facilonservices` with your tenant name):

```
https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/authresp
```

- **Google**: Authorized redirect URIs (Credentials).
- **Facebook**: Valid OAuth Redirect URIs (Facebook Login → Settings).
- **Microsoft**: Redirect URI in App registration (main Azure AD app).

---

## Part 5: Test Social Login

### Step 5.1 – Run user flow

1. B2C → **User flows** → your flow → **Run user flow**.
2. **Application**: Your Facilon app.
3. **Reply URL**: e.g. `http://localhost:3000/login/callback`.
4. Click **Run user flow**.

### Step 5.2 – What you should see

- Sign-in page with:
  - **Email signup** (local account).
  - **Google** (if enabled).
  - **Facebook** (if enabled).
  - **Microsoft Account** (if enabled).

### Step 5.3 – Test each provider

1. Click **Google** (or Facebook / Microsoft).
2. Complete sign-in with that provider.
3. You should be redirected back to your app with tokens; in Facilon, that will be to `/login/callback` and then your app will exchange the token with your backend.

---

## Part 6: Optional – Custom page (GitHub Pages) social buttons

If you use custom HTML (e.g. `signin.html` on GitHub Pages), the social buttons are usually injected by Azure B2C. To style them:

1. In your custom HTML, ensure the container used by B2C for identity provider buttons is present (often `<div id="api">` or similar – check B2C custom UI docs).
2. Use CSS to target the social buttons B2C injects (e.g. by class or data attributes).  
   Example (adjust selectors to match B2C’s output):

   ```css
   /* Example: style social provider buttons */
   .social-idp-button { border-radius: 8px; padding: 12px; }
   ```

3. Redeploy your custom page and run the user flow again to verify.

---

## Checklist

### Google
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Web client created
- [ ] Redirect URI added in Google (B2C authresp URL)
- [ ] Identity provider added in B2C with correct Client ID/Secret and claim mapping
- [ ] Google enabled in user flow
- [ ] Tested sign-in with Google

### Facebook
- [ ] Facebook app created
- [ ] Facebook Login product added, redirect URI set
- [ ] App ID and App Secret copied
- [ ] Valid OAuth Redirect URI set (B2C authresp URL)
- [ ] Facebook identity provider added in B2C
- [ ] Facebook enabled in user flow
- [ ] Tested sign-in with Facebook

### Microsoft Account
- [ ] App registered in main Azure AD (not B2C)
- [ ] Redirect URI set to B2C authresp URL
- [ ] Client secret created
- [ ] Graph API permissions (openid, email, profile) added
- [ ] Microsoft Account identity provider added in B2C
- [ ] Microsoft Account enabled in user flow
- [ ] Tested sign-in with Microsoft Account

### General
- [ ] All redirect URIs use your real B2C tenant name
- [ ] User flow saved after enabling each provider
- [ ] Run user flow shows all enabled options
- [ ] No errors in browser console or B2C logs when testing

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| “Redirect URI mismatch” | Redirect URI in provider (Google/Facebook/Microsoft) must exactly match `https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/oauth2/authresp`. |
| Social button not showing | User flow → Identity providers → ensure the provider is checked and saved. |
| “Invalid client” | Client ID and Client secret in B2C identity provider match the provider’s app. |
| Consent screen / app not verified | For Google/Facebook, ensure app is in “Testing” with test users, or complete verification for production. |

---

## Links

- [Azure B2C – Add identity providers](https://learn.microsoft.com/en-us/azure/active-directory-b2c/add-identity-provider)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login for the Web](https://developers.facebook.com/docs/facebook-login/web)
- [Microsoft identity platform (OIDC)](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

After social login is working in Azure B2C, your existing Facilon flow (MSAL → `/login/callback` → backend) will work for social users as well; no extra front-end code is needed for the basic flow.
