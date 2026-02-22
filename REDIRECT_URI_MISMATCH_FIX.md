# Fix: redirect_uri_mismatch (AADB2C90006)

When you see:

```
The redirect URI 'http://localhost:3000/login/callback' provided in the request 
is not registered for the client id '54e55d9e-551a-4db4-b1e1-92fdb3e38c01'.
```

Azure B2C is rejecting the redirect because that URI is not in the app registration.

---

## Fix in Azure Portal

1. Open **Azure Portal** → **Azure AD B2C** (or your B2C tenant).
2. Go to **App registrations**.
3. Open the app with client ID `54e55d9e-551a-4db4-b1e1-92fdb3e38c01` (e.g. "Facilon Platform").
4. In the left menu, click **Authentication**.
5. Under **Platform configurations**:
   - If there is no **Web** platform: click **Add a platform** → choose **Web**.
   - Under **Redirect URIs**, click **Add URI** and add **exactly**:
     ```
     http://localhost:3000/login/callback
     ```
   - For production, also add your production callback (e.g. `https://yourdomain.com/login/callback`).
6. Click **Save** at the top.

---

## Exact URI to register

| Environment | Redirect URI |
|-------------|--------------|
| Local      | `http://localhost:3000/login/callback` |
| Production | `https://<your-domain>/login/callback`  |

The URI must match **exactly** (including path `/login/callback` and no trailing slash).

After saving, try signing in again; the redirect_uri_mismatch error should be resolved.
