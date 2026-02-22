# 🔧 Fix: Forgot Password Custom Page Not Showing

## 🚨 Problem

When you click "Forgot password?", you get Azure's default page instead of your custom page.

**Error in your React app**:
```
http://localhost:3000/?error=access_denied&error_description=AADB2C90118
```

**Cause**: Custom page URL is ONLY set for sign-in, NOT for password reset.

---

## ✅ Solution: Configure Custom Page for Password Reset

Go to Azure Portal and add the custom page URL for the password reset page.

---

## 📋 Step-by-Step Instructions

### Step 1: Open Azure Portal

1. Go to: https://portal.azure.com
2. Search: "Azure AD B2C"
3. Click: Your B2C tenant

---

### Step 2: Navigate to Your User Flow

1. **Left menu**: Click **"User flows"**
2. **Click**: `B2C_1_2Signin` (your user flow name)

---

### Step 3: Open Page Layouts

1. **Left sidebar**: Click **"Page layouts"**
2. You'll see a list of pages that you can customize

---

### Step 4: Configure Password Reset Page

Look for the table with these columns:

| Page layout | Use custom page content | Custom page URI |
|-------------|------------------------|-----------------|
| Local account sign-in page | ✅ Yes | https://bhoisamanta... |
| **Password reset page** | ❌ No | *(empty)* ← **FIX THIS!** |

#### Actions:

1. **Find row**: "Password reset page" or "Forgot password page"
2. **Click**: On that row to expand/edit it
3. **Toggle ON**: "Use custom page content"
4. **Paste URL** in "Custom page URI":
   ```
   https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
   ```
5. **Click**: "OK" or "Save"

---

### Step 5: Save the User Flow

1. **At the top** of the page, click the **"Save"** button
2. **Wait**: 30 seconds for changes to propagate

---

## 📸 What It Should Look Like

### Before Configuration:

```
Page Layouts:
┌─────────────────────────────┬────────────────────┬─────────────────┐
│ Page layout                 │ Use custom page    │ Custom page URI │
├─────────────────────────────┼────────────────────┼─────────────────┤
│ Local account sign-in page  │ ✅ Yes             │ https://...     │
│ Password reset page         │ ❌ No              │ (empty)         │ ← Problem!
└─────────────────────────────┴────────────────────┴─────────────────┘
```

### After Configuration:

```
Page Layouts:
┌─────────────────────────────┬────────────────────┬─────────────────┐
│ Page layout                 │ Use custom page    │ Custom page URI │
├─────────────────────────────┼────────────────────┼─────────────────┤
│ Local account sign-in page  │ ✅ Yes             │ https://...     │
│ Password reset page         │ ✅ Yes             │ https://...     │ ← Fixed!
└─────────────────────────────┴────────────────────┴─────────────────┘
```

---

## 🔍 Can't Find "Password Reset Page"?

If you don't see "Password reset page" in the list:

### Enable It First:

1. Go to: **User flows** → **B2C_1_2Signin**
2. **Left menu**: Click **"Properties"**
3. Scroll down to find: **"Self-service password reset"**
4. **Check**: ☑️ "Enable self-service password reset"
5. **Save**
6. **Go back** to "Page layouts" - it should now appear!

---

## 🎯 Alternative: Create Separate Password Reset Flow

If you prefer separate flows (recommended for production):

### Step 1: Create Password Reset User Flow

1. **User flows** → "➕ New user flow"
2. **Select**: "Password reset (Recommended)"
3. **Name**: `PasswordReset` (becomes `B2C_1_PasswordReset`)
4. **Configure**:
   - Identity providers: Local Account
   - User attributes: Email (required)
   - Application claims: Select what to return
5. **Page layouts**:
   - Email verification page: (optional custom)
   - Password reset page: `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html`
6. **Create**

### Step 2: Update Forgot Password Link

In your signin page, update the Azure-injected link... Actually, Azure handles this automatically when you have separate flows! Just make sure "Self-service password reset" is enabled in your sign-in flow properties.

---

## 🧪 Testing After Configuration

### Test Flow:

1. **Open**: Your B2C sign-in URL
2. **Verify**: Custom sign-in page shows (Facilon branding)
3. **Click**: "Forgot your password?"
4. **Expected**: Custom password reset page shows
5. **Check**: 
   - ✅ Facilon logo displays
   - ✅ Gradient background (red/blue)
   - ✅ "Reset Your Password" header
   - ✅ Email field
   - ✅ "Send verification code" button
   - ✅ "Back to Sign In" link

### If It Still Doesn't Work:

1. **Wait longer** (up to 2 minutes for Azure to apply changes)
2. **Clear cache** again: `Ctrl + Shift + R`
3. **Try incognito/private browsing**
4. **Check URL** is exactly: `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html`
5. **Verify** GitHub Pages is accessible: Open the URL directly in browser

---

## 📊 Complete Custom Page Configuration

Set custom URLs for ALL pages in your User Flow:

### In "Page layouts", configure:

| Page Type | Custom URL |
|-----------|-----------|
| **Self-asserted page** (sign-in) | `https://bhoisamanta.github.io/facilon-auth-pages/signin.html` |
| **Password reset page** | `https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html` |
| **Sign-up page** (optional) | `https://bhoisamanta.github.io/facilon-auth-pages/signup.html` |
| **Email verification** (optional) | Use default or custom |
| **Error page** (optional) | Use default or custom |

---

## 🔧 Troubleshooting

### Issue: "Password reset page" not in list

**Solution**: Enable self-service password reset in Properties first.

### Issue: Custom page shows but wrong branding

**Solution**: Check the URL is correct and GitHub Pages deployed latest changes.

### Issue: Gets redirect to React app with error

**Solution**: 
- Configure custom page URL in Azure (this guide)
- React app now handles error gracefully (already fixed)

### Issue: CORS errors

**Solution**: GitHub Pages has open CORS - no config needed!

---

## ✅ What I've Fixed

### In React App (Already Committed):

1. **LoginCallback.tsx**: Now detects `AADB2C90118` error and redirects to password reset
2. **authentication.service.ts**: Added `getAzureB2CPasswordResetUrl()` method

### In GitHub Pages (Already Pushed):

1. **resetpassword.html**: Ready to use
2. **CSS**: Properly styled with Facilon branding
3. **All absolute URLs**: Assets will load correctly

### What YOU Need to Do in Azure:

1. **Configure** custom page URL for password reset page
2. **Test** the flow

---

## 🎯 Summary

**The custom pages ARE ready and working!**

**The issue is**: Azure B2C doesn't know to use your custom page for password reset yet.

**The fix is**: 5-minute configuration in Azure Portal (this guide).

**Follow the steps above** → Your custom password reset page will show! 🚀

---

## 💬 Need Help Finding It?

If you can't find "Page layouts" or "Password reset page":

### Try These Paths:

**Path 1** (Most B2C versions):
```
Azure Portal
 → Azure AD B2C
   → User flows
     → B2C_1_2Signin
       → Page layouts  ← YOU ARE HERE
         → Password reset page ← CONFIGURE THIS
```

**Path 2** (Some B2C versions):
```
Azure Portal
 → Azure AD B2C
   → User flows
     → B2C_1_2Signin
       → Customize
         → Page layouts ← YOU ARE HERE
           → Password reset page ← CONFIGURE THIS
```

**Path 3** (Older B2C versions):
```
Azure Portal
 → Azure AD B2C
   → User flows
     → B2C_1_2Signin
       → Page layouts (in the main view, not sidebar)
         → Password reset page ← CONFIGURE THIS
```

---

## 📞 Still Stuck?

Take a screenshot of your Azure B2C User Flow screen and I can help you find exactly where to configure it!

**Your custom pages are perfect - just need Azure configuration!** ✅
