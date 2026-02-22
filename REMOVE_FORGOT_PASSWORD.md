# 🔧 Remove "Forgot Password?" Link

## Two Methods to Remove It

---

## Method 1: Disable in Azure B2C Configuration (RECOMMENDED)

Remove it from the User Flow so Azure never injects it.

### Step-by-Step:

1. **Go to**: Azure Portal → Azure AD B2C → User flows
2. **Click**: Your user flow (e.g., `B2C_1_2Signin`)
3. **Left menu**: Click **"Properties"**
4. **Look for**: "Enable password reset" or "Self-service password reset"
5. **Uncheck**: ❌ "Enable self-service password reset"
6. **Click**: "Save"

This completely removes the forgot password functionality from the User Flow.

---

## Method 2: Hide with CSS (Already Done!)

If you want to keep the functionality in Azure but just hide the link:

### CSS Already Added:

In `css/auth.css`, I've added:

```css
/* Hide Azure-injected forgot password link */
#api #forgotPassword,
#api a[href*="forgotPassword"],
#api a[id="forgotPassword"],
#api .forgotPassword,
#api .forgot-password {
    display: none !important;
    visibility: hidden !important;
}
```

**This hides the link even if Azure injects it.**

---

## 📸 Where to Find "Enable Password Reset" Setting

### Location 1: User Flow → Properties

```
Azure AD B2C
 └── User flows
      └── B2C_1_2Signin
           └── Properties  ← Click here
                ├── User flow settings
                ├── Token lifetime
                └── ☐ Enable self-service password reset  ← UNCHECK THIS!
```

### Location 2: User Flow → Page layouts

Some B2C versions have:

```
Page layouts
 └── Password reset
      └── ☐ Enable password reset page  ← UNCHECK THIS!
```

---

## 🎯 Recommended Approach

### If You Don't Want Users to Reset Password:

**Use Method 1** (Disable in Azure):
- Cleaner solution
- Azure never injects the link
- No CSS hacks needed
- Removes the entire password reset flow

### If You Want to Keep the Functionality But Hide the Link:

**Use Method 2** (CSS):
- Users can still access reset via direct URL
- Link is just hidden from UI
- Flexibility to show/hide later

---

## ⚙️ Alternative: Create Separate Sign-In Only Flow

If your current flow is "Sign up and sign in" combined:

### Create New User Flow:

1. **Azure AD B2C** → User flows
2. **Click**: "New user flow"
3. **Select**: **"Sign in"** only (not "Sign up and sign in")
4. **Name**: `SigninOnly`
5. **Configure**: Without password reset option
6. **Use this flow** instead of combined flow

---

## 📝 What to Do Now

### Option A: Disable in Azure (Recommended)

1. Go to User Flow → Properties
2. Uncheck "Enable self-service password reset"
3. Save
4. Test again - link won't appear

### Option B: Use CSS (Already Done!)

1. Just push the current CSS to GitHub:
   ```bash
   cd d:\sam\facilon\facilon\facilon-auth-pages
   git add css/auth.css
   git commit -m "Hide forgot password link with CSS"
   git push
   ```
2. Wait 1-2 minutes for deployment
3. Clear cache and test

---

## 🧪 Testing

After making changes:

### If Disabled in Azure:
- ✅ Link never appears
- ✅ No CSS needed
- ✅ Users cannot reset password via UI
- ⚠️ They can only reset through admin

### If Hidden with CSS:
- ✅ Link hidden visually
- ✅ Users cannot see it
- ℹ️ They could still access reset URL if they know it
- ℹ️ Functionality still exists in Azure

---

## 🎨 Other UI Elements You Can Hide

If you want to hide other Azure-injected elements:

### Hide "Create account" link:
```css
#api #createAccount,
#api a[href*="signup"],
#api a[id="createAccount"] {
    display: none !important;
}
```

### Hide "Sign in with..." social providers:
```css
#api .social-button,
#api button[class*="social"] {
    display: none !important;
}
```

### Hide "Remember me" checkbox:
```css
#api input[type="checkbox"][name*="remember"],
#api .remember-me {
    display: none !important;
}
```

---

## 💡 Recommended Configuration

For a clean sign-in-only experience:

### In Azure B2C:
- ❌ Disable self-service password reset
- ❌ Disable social identity providers (if not needed)
- ✅ Keep only email/password local account

### In Your Custom Page:
- ✅ Show only "Create an account" link
- ✅ Direct users to your registration flow
- ✅ Handle password resets through admin/support

---

## 🚀 Deploy Changes

I've already updated the CSS. Push to GitHub:

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Hide forgot password link and fix 404 errors"
git push
```

---

## ✅ Summary

**Two changes made**:
1. ✅ Fixed 404 errors (absolute URLs for assets)
2. ✅ Hidden forgot password link (CSS + removed from HTML)

**What to do**:
1. Push to GitHub (command above)
2. OR disable in Azure B2C Properties (recommended)
3. Wait 2 minutes for deployment
4. Clear cache and test

**Result**: Clean sign-in page without forgot password option! 🎉
