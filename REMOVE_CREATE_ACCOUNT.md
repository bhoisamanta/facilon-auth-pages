# 🔧 Remove "Create an Account" Link

## Two Methods to Remove It

---

## Method 1: Use Sign-In Only User Flow (RECOMMENDED)

Create a separate User Flow that ONLY allows sign-in, not sign-up.

### Step-by-Step:

1. **Go to**: Azure Portal → Azure AD B2C → User flows
2. **Click**: "➕ New user flow"
3. **Select**: **"Sign in (Recommended)"** 
   - ⚠️ **NOT** "Sign up and sign in"
4. **Name**: `SigninOnly` or `Signin`
5. **Configure**:
   - Enable email/password
   - Disable password reset if needed
6. **Page layouts** → Upload your custom HTML URL
7. **Save**
8. **Update** your React app to use this new flow instead

### Update React App:

In your `authentication.service.ts` or wherever you build the B2C URL, change:

```typescript
// OLD (combined sign up and sign in)
const policy = 'B2C_1_2Signin';

// NEW (sign in only)
const policy = 'B2C_1_SigninOnly';
```

**Result**: Azure will never show sign-up options because the User Flow doesn't support it.

---

## Method 2: Disable Sign-Up in Combined Flow

If you want to keep using the combined "Sign up and sign in" flow but disable sign-up:

### Azure Portal:

1. **Go to**: Azure AD B2C → User flows
2. **Click**: Your user flow (e.g., `B2C_1_2Signin`)
3. **Left menu**: Click **"Properties"**
4. **Look for**: "Enable local accounts" or "Sign-up settings"
5. **Find**: "Allow users to sign up" or similar
6. **Disable** it

⚠️ **Note**: Not all B2C versions support disabling sign-up in a combined flow. If you can't find this option, use Method 1 instead.

---

## Method 3: Hide with CSS (Already Done!)

If you want to keep the functionality in Azure but just hide the link:

### CSS Already Added:

In `css/auth.css`, I've added:

```css
/* Hide Azure-injected create account/sign-up link */
#api #createAccount,
#api a[href*="signup"],
#api a[href*="SignUp"],
#api a[id="createAccount"],
#api .createAccount,
#api .create-account {
    display: none !important;
    visibility: hidden !important;
}
```

**This hides the link even if Azure injects it.**

---

## 📸 Where to Find Settings

### Option 1: Create New Sign-In Only Flow

```
Azure AD B2C
 └── User flows
      └── ➕ New user flow
           └── Select flow type
                ├── ✅ Sign in (Recommended)  ← SELECT THIS
                ├── ❌ Sign up and sign in
                └── ❌ Sign up
```

### Option 2: Disable in Combined Flow Properties

```
Azure AD B2C
 └── User flows
      └── B2C_1_2Signin (your combined flow)
           └── Properties  ← Click here
                └── Local accounts
                     └── ☐ Allow users to sign up  ← UNCHECK THIS
```

---

## 🎯 Recommended Approach

### For Production (Most Control):

**Use Method 1** (Create separate Sign-In Only flow):
- Cleanest solution
- Azure never injects sign-up links
- Clear separation of flows
- Best user experience

### Quick Fix (Keep Combined Flow):

**Use Method 3** (CSS):
- Simple and fast
- Just hide the link
- No Azure reconfiguration needed
- Already implemented!

---

## ⚙️ Complete Configuration Example

### Separate User Flows Approach:

Create **three separate flows** instead of one combined:

1. **`B2C_1_SigninOnly`**: Just sign-in
   - Custom page: `signin.html`
   - No sign-up option
   - Use this for returning users

2. **`B2C_1_SignupOnly`**: Just sign-up
   - Custom page: `signup.html`
   - For new users only
   - Accessible only when you want

3. **`B2C_1_PasswordReset`**: Just password reset
   - Custom page: `resetpassword.html`
   - Only for password reset
   - Accessible only through support

**Benefits**:
- Complete control over when/where each flow is accessible
- No need to hide UI elements
- Cleaner user experience
- Better security (explicit flow control)

---

## 📝 What to Do Now

### Quick Fix (CSS - Already Done!):

I've already removed the link from HTML and added CSS. Just push to GitHub:

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Remove create account link"
git push
```

### Long-term Solution (Azure Config):

1. **Create** new "Sign in only" User Flow in Azure
2. **Configure** with your custom page URL
3. **Update** React app to use new flow policy name
4. **Test** - no sign-up option will appear

---

## 🧪 Testing

After making changes:

### If Using Sign-In Only Flow:
- ✅ No sign-up link appears
- ✅ Users cannot create accounts via this flow
- ✅ Clean, focused sign-in experience

### If Hidden with CSS:
- ✅ Link hidden visually
- ✅ Users cannot see it
- ℹ️ Functionality still exists in Azure
- ℹ️ Someone could bypass CSS and access sign-up

---

## 🚀 Files Updated

### Changes Made:
1. ✅ Removed `<a>Create an account</a>` from `signin.html`
2. ✅ Added CSS rules to hide Azure-injected create account links
3. ✅ Updated comment explaining both links are removed

### Push to GitHub:

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git status        # See changes
git add .
git commit -m "Remove create account and forgot password links"
git push
```

---

## 💡 User Registration Strategy

If users cannot create accounts via the sign-in page, how do they register?

### Options:

1. **Admin-Created Accounts**:
   - Admins create accounts manually in Azure
   - Users receive credentials via email
   - More controlled onboarding

2. **Separate Registration Flow**:
   - Have a "Get Started" page on your main website
   - Links to the Sign-Up User Flow
   - Only accessible when you want it

3. **Invitation-Based**:
   - Send invite links that go to sign-up flow
   - Time-limited or one-time use
   - Better security

4. **API-Based Registration**:
   - Handle registration in your own backend
   - Create B2C accounts via Azure Graph API
   - Full control over validation and approval

---

## ✅ Summary

**Changes Made**:
1. ✅ Removed "Create an account" link from HTML
2. ✅ Added CSS to hide Azure-injected sign-up links
3. ✅ Already had "Forgot password" hidden

**Your Sign-In Page Now**:
- 📧 Email/password fields only
- 🔐 Sign-in button
- ❌ No forgot password
- ❌ No create account

**Next Steps**:
1. Push to GitHub (command above)
2. Wait 1-2 minutes for deployment
3. Clear browser cache
4. Test your B2C login

**Clean, minimal sign-in page!** 🎉
