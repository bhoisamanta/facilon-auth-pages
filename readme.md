# Facilon Authentication Pages for Azure Entra External ID

Custom HTML pages for Azure Entra External ID (CIAM) authentication, designed to be hosted on GitHub Pages and integrated with Azure User Flows.

## Directory Structure

```
facilon-auth-pages/
├── signin.html          # Sign-in page
├── signup.html          # Sign-up/registration page
├── resetpassword.html   # Password reset page
├── css/
│   └── auth.css         # Shared stylesheet
├── js/
│   └── auth.js          # Custom JavaScript enhancements
├── assets/
│   ├── logo.png         # Facilon logo (add your logo here)
│   └── background.jpg   # Background image (add your image here)
└── README.md            # This file
```

## GitHub Pages Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. **Repository name**: `facilon-auth-pages` (or any name you prefer)
3. **Visibility**: Public (required for GitHub Pages)
4. **Initialize**: With README (optional)

### Step 2: Upload Files

Upload all files from this directory to your GitHub repository:

```bash
git clone https://github.com/yourusername/facilon-auth-pages.git
cd facilon-auth-pages
# Copy all files from this directory
git add .
git commit -m "Add custom authentication pages"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings** > **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` (or `master`)
4. **Folder**: `/ (root)`
5. Click **Save**

GitHub will provide your URL:
```
https://yourusername.github.io/facilon-auth-pages/
```

### Step 4: Add Your Assets

Replace placeholder assets:
- `assets/logo.png` - Your Facilon logo (recommended: 400x100px, transparent PNG)
- `assets/background.jpg` - Background image (recommended: 1920x1080px)

### Step 5: Test Pages

Access your pages:
- Sign In: `https://yourusername.github.io/facilon-auth-pages/signin.html`
- Sign Up: `https://yourusername.github.io/facilon-auth-pages/signup.html`
- Reset: `https://yourusername.github.io/facilon-auth-pages/resetpassword.html`

## Azure Entra External ID Setup (Step-by-Step)

### STEP 1: Create Azure Entra External ID Tenant

1. **Go to Azure Portal**: https://portal.azure.com
2. **Search for**: "Microsoft Entra External ID"
3. **Click**: "Create a tenant"
4. **Select**: "Customer identity and access management (CIAM)"
5. **Configuration**:
   - **Organization name**: Facilon Services
   - **Initial domain name**: `facilonexternal` (becomes `facilonexternal.ciamlogin.com`)
   - **Country/Region**: Your country
6. **Click**: "Review + create" → "Create"
7. **Wait**: 2-3 minutes for tenant creation
8. **Record**:
   - ✅ Tenant ID (GUID): `________________________________________`
   - ✅ Domain: `facilonexternal.ciamlogin.com`

### STEP 2: Create App Registration

1. **Switch to your new tenant**: Click your profile icon → Switch directory → Select your new tenant
2. **Navigate**: Azure Active Directory (or Microsoft Entra ID) → App registrations
3. **Click**: "New registration"
4. **Configuration**:
   - **Name**: `Facilon Platform`
   - **Supported account types**: "Accounts in this organizational directory only (Single tenant)"
   - **Redirect URI**: 
     - Type: **Single-page application (SPA)**
     - URI: `http://localhost:3000/auth/callback`
5. **Click**: "Register"
6. **Record**:
   - ✅ Application (client) ID: `________________________________________`
   - ✅ Directory (tenant) ID: `________________________________________`

### STEP 3: Configure Authentication

1. **Navigate**: App registration → Authentication
2. **Add more Redirect URIs**:
   - `http://localhost:3000`
   - `https://yourdomain.com/auth/callback` (production)
3. **Logout URL**: `http://localhost:3000/logout`
4. **Implicit grant and hybrid flows**: 
   - ❌ **DO NOT CHECK** "Access tokens"
   - ❌ **DO NOT CHECK** "ID tokens"
   - (You're using Authorization Code Flow with PKCE, not implicit flow)
5. **Allow public client flows**: No (leave unchecked)
6. **Click**: "Save"

### STEP 4: Configure API Permissions

1. **Navigate**: App registration → API permissions
2. **Click**: "Add a permission"
3. **Select**: "Microsoft Graph"
4. **Select**: "Delegated permissions"
5. **Add these permissions**:
   - ✅ `openid`
   - ✅ `profile`
   - ✅ `email`
   - ✅ `offline_access`
   - ✅ `User.Read`
6. **Click**: "Add permissions"
7. **Optional**: Click "Grant admin consent" if you have admin rights

### STEP 5: Create User Flow

1. **Navigate**: Microsoft Entra External ID → User flows
2. **Click**: "New user flow"
3. **Select**: "Sign up and sign in"
4. **Configuration**:
   - **Name**: `signup_signin` (becomes `B2C_1_signup_signin`)
   - **Version**: Recommended
5. **Click**: "Create"

### STEP 6: Configure Identity Providers

1. **In your user flow**: Identity providers
2. **Select**: "Email signup" (local account)
3. **Optional**: Add social providers:
   - Microsoft Account
   - Google
   - Facebook
   - etc.
4. **Click**: "Save"

### STEP 7: Configure User Attributes

1. **In your user flow**: User attributes
2. **Select attributes to collect**:
   - ✅ Email Address
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
3. **Select claims to return in token**:
   - ✅ Email Addresses
   - ✅ Display Name
   - ✅ Given Name
   - ✅ Surname
   - ✅ User's Object ID
4. **Click**: "Save"

### STEP 8: Configure Custom Page Layouts (CRITICAL!)

This is where you link your GitHub Pages:

1. **In your user flow**: Page layouts
2. **For each page type**, configure custom page URI:

#### Sign-up or sign-in page:
- **Use custom page content**: ✅ Yes
- **Custom page URI**: `https://yourusername.github.io/facilon-auth-pages/signin.html`
- **Click**: "Save"

#### Sign-up page:
- **Use custom page content**: ✅ Yes
- **Custom page URI**: `https://yourusername.github.io/facilon-auth-pages/signup.html`
- **Click**: "Save"

#### Password reset page:
- **Use custom page content**: ✅ Yes
- **Custom page URI**: `https://yourusername.github.io/facilon-auth-pages/resetpassword.html`
- **Click**: "Save"

### STEP 9: Test User Flow

1. **In your user flow**: Click "Run user flow"
2. **Application**: Select your app registration
3. **Reply URL**: Select `http://localhost:3000/auth/callback`
4. **Click**: "Run user flow"
5. **Verify**: Your custom page loads from GitHub Pages
6. **Test**: Try signing in with a test account

### STEP 10: Get User Flow URLs

You'll need these URLs for your React app:

```
Authorize URL:
https://facilonexternal.ciamlogin.com/<TENANT-ID>/oauth2/v2.0/authorize

Token URL:
https://facilonexternal.ciamlogin.com/<TENANT-ID>/oauth2/v2.0/token

Logout URL:
https://facilonexternal.ciamlogin.com/<TENANT-ID>/oauth2/v2.0/logout
```

Replace `<TENANT-ID>` with your actual tenant GUID.

## Important URLs to Record

Fill in these values after setup:

```
✅ Tenant Name: facilonexternal
✅ Tenant ID (GUID): ________________________________________
✅ Client ID (GUID): ________________________________________
✅ User Flow Name: B2C_1_signup_signin
✅ GitHub Pages URL: https://yourusername.github.io/facilon-auth-pages/
✅ Authority: https://facilonexternal.ciamlogin.com/<TENANT-ID>
```

## CORS Configuration (Not Needed for GitHub Pages!)

GitHub Pages automatically serves content with CORS headers that allow any origin, so you don't need to configure CORS like you would with Azure Blob Storage.

However, if Azure reports CORS issues:
1. Pages must be served over HTTPS (GitHub Pages does this automatically)
2. Content-Type headers must be correct (GitHub Pages handles this)
3. Pages must be publicly accessible (GitHub Pages are public by default)

## Troubleshooting

### Custom Page Not Loading

**Symptoms**: User Flow shows Microsoft's default page instead of your custom page

**Solutions**:
1. ✅ Verify GitHub Pages is enabled and site is published
2. ✅ Check URL is accessible: Open `https://yourusername.github.io/facilon-auth-pages/signin.html` in browser
3. ✅ Ensure repository is **public** (private repos require GitHub Pro for Pages)
4. ✅ Verify URL in User Flow > Page layouts is correct (no typos)
5. ✅ Check browser console for errors
6. ✅ Try clearing browser cache and cookies

### Form Not Appearing

**Symptoms**: Your custom page loads but no authentication form appears

**Solutions**:
1. ✅ Verify `<div id="api"></div>` exists in your HTML
2. ✅ Check browser console for JavaScript errors
3. ✅ Ensure no CSS is hiding the #api div (check `display`, `visibility`, `height`)
4. ✅ Wait 2-3 seconds - Azure might take time to inject content
5. ✅ Test with browser DevTools open (Network tab) to see if Azure is fetching your page

### CORS Errors

**Symptoms**: Browser shows CORS policy errors

**Solutions**:
1. ✅ GitHub Pages should serve with proper CORS headers automatically
2. ✅ Ensure you're using HTTPS (GitHub Pages uses HTTPS by default)
3. ✅ Check if you have any custom headers or meta tags blocking content
4. ✅ Try disabling browser extensions that might interfere

### Assets Not Loading

**Symptoms**: Logo or background images don't appear

**Solutions**:
1. ✅ Verify file paths are correct: `assets/logo.png` (relative path)
2. ✅ Check files are uploaded to GitHub: `assets/` folder exists
3. ✅ Verify file names match exactly (case-sensitive on Linux servers)
4. ✅ Check file extensions: `.png`, `.jpg` (not `.PNG`, `.JPG`)
5. ✅ Test asset URLs directly in browser

## Customization

### Change Colors/Branding

Edit `css/auth.css`:

```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your brand colors */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Change Logo

Replace `assets/logo.png` with your company logo:
- Recommended size: 400x100px
- Format: PNG with transparent background
- Max file size: 100KB

### Change Background

Replace `assets/background.jpg` with your background image:
- Recommended size: 1920x1080px
- Format: JPG (optimized for web)
- Max file size: 500KB

### Add Custom Text

Edit the HTML files directly:
- `signin.html` - Change welcome message, links
- `signup.html` - Change description, terms
- `resetpassword.html` - Change instructions

## Security Notes

1. **HTTPS Required**: GitHub Pages uses HTTPS by default
2. **No Sensitive Data**: These pages should not contain API keys or secrets
3. **Public Access**: Pages are publicly accessible (they need to be for Azure to load them)
4. **Content Security**: Azure validates and sanitizes user input on their end
5. **PKCE Flow**: The Authorization Code Flow with PKCE is secure for public clients

## Testing Checklist

Before going to production:

- [ ] GitHub Pages is published and accessible
- [ ] All assets (logo, background) are uploaded and loading
- [ ] Custom pages load correctly in browser
- [ ] `<div id="api"></div>` exists in all HTML pages
- [ ] User Flow is configured with correct URLs
- [ ] Test sign-in flow works end-to-end
- [ ] Test sign-up flow works end-to-end
- [ ] Test password reset flow works end-to-end
- [ ] Error handling displays correctly
- [ ] Mobile responsive design works
- [ ] Branding matches company style guide

## Next Steps

After setting up these pages in GitHub:

1. Configure your React app callback handler
2. Set up backend to validate Entra ID tokens
3. Test complete authentication flow
4. Deploy to production

## Support

For issues with:
- **Azure Configuration**: Contact Azure Support
- **GitHub Pages**: Check [GitHub Pages Documentation](https://docs.github.com/pages)
- **Custom Pages**: Review Azure Entra External ID custom page requirements
- **Integration**: Check the main Facilon Platform documentation
