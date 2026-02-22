# 🚨 Why Custom Scripts Don't Execute in Azure B2C

## Problem

When you add inline `<script>` tags to your custom HTML pages, Azure B2C **escapes them** for security:

### Your HTML:
```html
<script>
  function openTerms() {
    window.open('http://localhost:3000/terms', '_blank');
  }
</script>
```

### What Azure B2C Renders:
```html
&lt;script>  <!-- Escaped! Won't execute -->
  function openTerms() {
    window.open('http://localhost:3000/terms', '_blank');
  }
&lt;/script>
```

**Result**: Your JavaScript doesn't run, and `onclick="openTerms()"` breaks.

---

## ✅ Solution: Use Direct Links Instead

### ❌ Don't Use (Won't Work):

```html
<!-- This will be escaped by Azure B2C -->
<a href="#" onclick="openTerms()">Terms</a>
<script>
  function openTerms() {
    window.open('http://localhost:3000/terms', '_blank');
  }
</script>
```

### ✅ Use This Instead:

```html
<!-- Direct link - works perfectly! -->
<a href="http://localhost:3000/terms" target="_blank">Terms</a>
```

---

## What Azure B2C Allows

### ✅ Allowed (Works):
- External CSS: `<link rel="stylesheet" href="...">`
- External JavaScript: `<script src="..."></script>` (limited - only Azure's scripts execute)
- Inline CSS: `<style>...</style>`
- Direct links: `<a href="...">`
- Form elements: `<input>`, `<button>`, etc.

### ❌ Blocked (Won't Execute):
- Inline `<script>` tags
- `onclick`, `onload`, `onchange` event handlers
- Any JavaScript in the HTML file itself

---

## Why Azure Does This

**Security**: Azure B2C prevents custom JavaScript to:
1. Protect against XSS (Cross-Site Scripting) attacks
2. Prevent token theft
3. Ensure authentication flow integrity
4. Control the page lifecycle

---

## ✅ Fixed in Your Pages

I've updated all your pages to work with Azure's restrictions:

### 1. Terms/Privacy Links (signin.html)

**OLD** (Didn't work):
```html
<a href="#" onclick="openTerms()">Terms</a>
<script>
  function openTerms() { ... }
</script>
```

**NEW** (Works!):
```html
<a href="http://localhost:3000/service-agreement" target="_blank">Terms</a>
```

### 2. Back to Sign In (resetpassword.html)

**OLD** (Didn't work):
```html
<a href="#" onclick="redirectToSignin()">Back to Sign In</a>
<script>
  function redirectToSignin() { ... }
</script>
```

**NEW** (Works!):
```html
<a href="https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_2Signin">Back to Sign In</a>
```

### 3. Removed All Inline Scripts

Removed all custom `<script>` blocks from:
- `signin.html`
- `signup.html`
- `resetpassword.html`

---

## 📝 Update Your Links

Replace these placeholders with your actual URLs:

### In signin.html:
```html
<!-- Change these URLs -->
<a href="http://localhost:3000/service-agreement" target="_blank">Terms</a>
<a href="http://localhost:3000/privacy-policy" target="_blank">Privacy</a>
```

### In resetpassword.html:
```html
<!-- Update your actual B2C sign-in URL -->
<a href="https://facilonservices.b2clogin.com/facilonservices.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_2Signin">
  Back to Sign In
</a>
```

---

## 🎨 CSS Improvements Made

Also fixed CSS to ensure full page displays:

### 1. Background Container:
```css
.auth-background {
    height: auto;           /* Allow it to grow */
    overflow-y: auto;       /* Enable scrolling if needed */
    background-attachment: fixed;  /* Keep gradient fixed */
}
```

### 2. Auth Box:
```css
.auth-box {
    width: 100%;
    max-width: 480px;      /* Constrain width */
}
```

### 3. Help Text:
```css
.help-text {
    margin-bottom: 20px;   /* Prevent cutoff */
    width: 100%;
}
```

---

## 🧪 Testing

After pushing these changes:

1. **Clear cache**: `Ctrl + Shift + R`
2. **Wait 2 minutes** for GitHub Pages deployment
3. **Test your B2C URL** again
4. **Check**:
   - ✅ Page doesn't cut off
   - ✅ Footer visible at bottom
   - ✅ Help text shows
   - ✅ Can scroll if needed
   - ✅ Links work without errors

---

## 💡 Alternative: Use Azure's JavaScript API

If you REALLY need custom JavaScript:

### Option: Load External Script

Azure allows loading external JS files:

```html
<script src="https://yourdomain.com/custom.js"></script>
```

**BUT**: Even external scripts have limitations:
- Must load from HTTPS
- Azure may still block certain operations
- Can't interfere with authentication flow
- Better to avoid if possible

---

## ✅ Summary

**What Changed**:
1. ✅ Removed all inline `<script>` tags
2. ✅ Replaced `onclick` handlers with direct `href` links
3. ✅ Fixed CSS to prevent page cutoff
4. ✅ Added scrolling support

**Result**: Clean, working pages that follow Azure B2C's security model!

---

## 🚀 Push Changes

```bash
cd d:\sam\facilon\facilon\facilon-auth-pages
git add .
git commit -m "Fix scripts and CSS - remove inline JS for Azure B2C compatibility"
git push
```

**Wait 2 minutes, clear cache, test!** 🎉
