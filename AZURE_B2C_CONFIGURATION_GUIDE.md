# Azure AD B2C Configuration Guide for Facilon

This guide provides step-by-step instructions for configuring Azure AD B2C (Classic) for the Facilon application with MSAL integration.

## Prerequisites

- Access to Azure Portal with permissions to manage Azure AD B2C
- Your Azure B2C tenant name (e.g., `facilonservices`)
- Application Client ID (e.g., `54e55d9e-551a-4db4-b1e1-92fdb3e38c01`)

---

## 1. Register Redirect URIs (Required)

Azure B2C must know which URLs are allowed to receive authentication responses.

### Steps:

1. **Navigate to Azure Portal**: https://portal.azure.com
2. **Open Azure AD B2C**: Search for "Azure AD B2C" in the search bar
3. **Select your B2C tenant**: Click on your tenant (e.g., `facilonservices`)
4. **Go to App registrations**:
   - Left sidebar → Applications → App registrations
   - Click on your application (the one with your Client ID)

5. **Add Redirect URIs**:
   - Left sidebar → Authentication
   - Under "Platform configurations", find or add **Single-page application** platform
   - Click "Add a platform" if it doesn't exist, then select "Single-page application (SPA)"
   
6. **Add these Redirect URIs**:
   ```
   http://localhost:3000/login/callback
   https://yourdomain.com/login/callback
   ```
   *(Replace `yourdomain.com` with your production domain)*

7. **Important Settings**:
   - ✅ DO NOT check "Access tokens" under Implicit grant
   - ✅ DO NOT check "ID tokens" under Implicit grant
   - ✅ Leave implicit grant UNCHECKED (MSAL uses Authorization Code Flow with PKCE)

8. **Save** changes

---

## 2. Configure Logout Redirect URIs (Front-channel logout)

After logout, Azure B2C will redirect users back to your application.

### Steps:

1. **Same Authentication page** as above
2. **Scroll to "Front-channel logout URL"** section
3. **Add logout URIs**:
   ```
   http://localhost:3000/login
   https://yourdomain.com/login
   ```

4. **Save** changes

---

## 3. Verify User Flow Configuration

Ensure your Sign-in user flow is configured correctly.

### Steps:

1. **Left sidebar → User flows**
2. **Click on your sign-in flow** (e.g., `B2C_1_2Signin`)
3. **Verify settings**:
   - **Identity providers**: Check that local account (email) or social providers are enabled
   - **Application claims**: Ensure these claims are returned:
     - ✅ Email Addresses
     - ✅ User's Object ID
     - ✅ Given Name
     - ✅ Surname
     - ✅ Display Name

4. **Test your user flow**:
   - Click "Run user flow" button
   - Select your application
   - Verify it shows your redirect URI in the dropdown
   - Click "Run user flow" to test authentication

---

## 4. API Permissions (Optional but Recommended)

If your application needs to call Microsoft Graph or other APIs:

### Steps:

1. **Left sidebar → API permissions**
2. **Add Microsoft Graph permissions** if needed:
   - `User.Read` (for reading user profile)
   - `openid`, `profile`, `email` (for basic authentication)

3. **Grant admin consent** if required by your organization

---

## 5. Application Environment Variables

Update your backend configuration file (`application-dev.yml` or environment variables):

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

### Environment Variables to Set:

- `AZURE_B2C_TENANT_NAME`: Your B2C tenant name
- `AZURE_B2C_CLIENT_ID`: Your application's client ID
- `AZURE_B2C_CLIENT_SECRET`: Your application's client secret (from Certificates & secrets)
- `AZURE_B2C_SIGNIN_POLICY`: Your sign-in user flow name (e.g., `B2C_1_2Signin`)

---

## 6. Frontend Environment Variables

Create or update `.env` file in `facilon/Facilon-platform-Web/`:

```env
REACT_APP_AZURE_B2C_AUTHORITY=https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/B2C_1_2Signin
REACT_APP_AZURE_B2C_CLIENT_ID=54e55d9e-551a-4db4-b1e1-92fdb3e38c01
REACT_APP_AZURE_B2C_KNOWN_AUTHORITIES=facilonservices.b2clogin.com
REACT_APP_REDIRECT_URI=http://localhost:3000/login/callback
```

---

## 7. Verify CORS Settings (If Applicable)

If your backend API is on a different domain than your frontend:

### Steps:

1. **Azure Portal → Your B2C App**
2. **Left sidebar → Expose an API** → **CORS**
3. **Add your frontend domain**:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

---

## 8. Testing Checklist

After configuration, test the following:

- [ ] Navigate to `http://localhost:3000/login`
- [ ] Automatically redirects to Azure B2C login page
- [ ] Enter credentials and sign in
- [ ] Redirects back to `http://localhost:3000/login/callback`
- [ ] Successfully exchanges tokens with backend
- [ ] Lands on appropriate dashboard (`/investor/dashboard`)
- [ ] Click logout
- [ ] Clears session in Azure B2C
- [ ] Redirects back to `/login`

---

## Common Issues

### Issue: `redirect_uri_mismatch` error

**Solution**: Verify the exact redirect URI is registered in Azure Portal:
- Must match exactly (including `http` vs `https`, port, path)
- Check for typos or trailing slashes
- Ensure it's under "Single-page application" platform, NOT "Web" platform

### Issue: `AADB2C90077: User does not have an existing session`

**Solution**: This is normal on first login. User will be prompted to sign in.

### Issue: Token validation fails on backend

**Solution**:
- Verify `client-secret` is correct in backend config
- Check that the `sign-in-policy` name matches exactly (case-sensitive)
- Ensure backend has network access to Azure B2C endpoints

### Issue: Logout doesn't clear Azure B2C session

**Solution**:
- Verify "Front-channel logout URL" is configured
- Check that `postLogoutRedirectUri` in MSAL matches registered logout URI
- Ensure user flow includes logout endpoint

---

## Security Recommendations

1. **Never commit secrets**: Use environment variables for `client-secret`
2. **Use HTTPS in production**: All redirect URIs should use HTTPS
3. **Rotate secrets regularly**: Update client secrets every 6-12 months
4. **Enable MFA**: Configure multi-factor authentication in user flows
5. **Monitor sign-ins**: Use Azure AD B2C logs and Application Insights

---

## Support

For more information:
- [Azure AD B2C Documentation](https://learn.microsoft.com/en-us/azure/active-directory-b2c/)
- [MSAL React Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
- [MSAL Browser Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser)
