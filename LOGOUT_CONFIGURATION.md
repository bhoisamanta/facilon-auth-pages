# Azure B2C Logout Configuration

## Quick Summary

To enable proper logout functionality with Azure AD B2C and MSAL, you need to configure **Front-channel logout URLs** in the Azure Portal.

---

## Step-by-Step Configuration

### 1. Navigate to Your Application

1. Go to **Azure Portal**: https://portal.azure.com
2. Search for **Azure AD B2C**
3. Select your tenant (e.g., `facilonservices`)
4. Go to **App registrations** (left sidebar)
5. Click on your application (the one with your Client ID)

### 2. Configure Authentication

1. Click **Authentication** in the left sidebar
2. Scroll down to **Front-channel logout URL** section

### 3. Add Logout Redirect URIs

Add the following URIs where users should land after logout:

**For Development:**
```
http://localhost:3000/login
```

**For Production:**
```
https://yourdomain.com/login
```

### 4. Save Changes

Click **Save** at the top of the page.

---

## How Logout Works with MSAL

When a user clicks "Logout" in the Facilon application:

1. **Frontend** calls `instance.logoutRedirect()` from MSAL
2. **MSAL** clears local tokens and session storage
3. **Redirects to Azure B2C logout endpoint** with these parameters:
   - `post_logout_redirect_uri`: Where to go after logout
   - `id_token_hint`: Current user's ID token (optional)
4. **Azure B2C** clears the user's session
5. **Azure B2C redirects** to the configured `post_logout_redirect_uri`
6. **User lands** on `/login` page, fully logged out

---

## Configuration in Code

### Frontend (already implemented):

```typescript
// In AuthContext.tsx
await instance.logoutRedirect({
  postLogoutRedirectUri: window.location.origin + '/login',
});
```

### Backend (application-dev.yml):

```yaml
azure:
  b2c:
    post-logout-redirect-uri: http://localhost:3000/login
```

---

## Testing Logout

1. **Log in** to the application via Azure B2C
2. **Navigate** to any dashboard
3. **Click logout** from the header dropdown
4. **Verify**:
   - ✅ Redirects to Azure B2C logout page (may be quick)
   - ✅ Redirects back to `/login`
   - ✅ Session is cleared (localStorage is empty)
   - ✅ MSAL cache is cleared (no accounts in `instance.getAllAccounts()`)
   - ✅ Attempting to access protected routes redirects to login

---

## Troubleshooting

### Issue: "Invalid redirect URI" on logout

**Solution**: Ensure the logout URL is registered in the "Front-channel logout URL" field in Azure Portal.

### Issue: User session persists after logout

**Solution**: 
- Check that you're calling `instance.logoutRedirect()` (not just clearing localStorage)
- Verify Azure B2C has access to clear cookies (not blocked by browser)
- Test in incognito mode to rule out cookie/cache issues

### Issue: Logout redirects to wrong URL

**Solution**: Verify `postLogoutRedirectUri` in the code matches the registered URI in Azure Portal exactly.

---

## Security Notes

- **Always use HTTPS in production** for all redirect URIs
- **Front-channel logout** clears session in the browser context
- For **back-channel logout** (server-initiated), additional configuration is needed
- Consider implementing **session timeout** for additional security
