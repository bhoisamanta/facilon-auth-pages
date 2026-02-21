# Deploy to GitHub Pages - Quick Guide

## Your GitHub Repository
Repository: https://github.com/bhoisamanta/facilon-auth-pages

## Step 1: Commit and Push Updated Files

```bash
# Navigate to directory
cd d:\sam\facilon\facilon\facilon-auth-pages

# Check git status
git status

# Add all files
git add .

# Commit with message
git commit -m "Update pages with Facilon branding and logo"

# Push to GitHub
git push origin main
```

## Step 2: Verify Deployment

After pushing (wait 1-2 minutes), verify these URLs work:

```
✅ Landing Page:
https://bhoisamanta.github.io/facilon-auth-pages/

✅ Sign In Page:
https://bhoisamanta.github.io/facilon-auth-pages/signin.html

✅ Sign Up Page:
https://bhoisamanta.github.io/facilon-auth-pages/signup.html

✅ Reset Password Page:
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

## Step 3: Use in Azure User Flow

In Azure Portal, when configuring User Flow > Page layouts:

### Sign-up or sign-in page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signin.html
```

### Sign-up page:
```
https://bhoisamanta.github.io/facilon-auth-pages/signup.html
```

### Password reset page:
```
https://bhoisamanta.github.io/facilon-auth-pages/resetpassword.html
```

## What's Updated

✅ Facilon logo added to all pages
✅ Brand colors updated (red #c41e3a and blue #2c5aa0)
✅ Gradient background matches logo
✅ All buttons use Facilon brand colors
✅ Links and focus states use brand colors
✅ Responsive design for mobile
✅ Accessibility enhancements

## Files Ready for Upload

- signin.html - Custom sign-in page
- signup.html - Registration page  
- resetpassword.html - Password reset page
- index.html - Landing/info page
- css/auth.css - Complete stylesheet with Facilon branding
- js/auth.js - JavaScript enhancements
- assets/logo.png - Your Facilon logo
- README.md - Documentation
- AZURE_SETUP_GUIDE.md - Azure configuration steps
- .gitignore - Git ignore rules

## Next Steps

1. Push these files to GitHub
2. Follow `AZURE_SETUP_GUIDE.md` to configure Azure
3. Test the complete flow
4. Implement backend integration (I'll help with this)
