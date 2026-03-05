# ZEAL Website - Deployment Guide

## Current Domain: zeala.zedseclabs.co.za

## Option 1: Manual File Upload (FASTEST)

Since the build environment has dependency issues, here are two approaches:

### Method A: Use This Pre-built Structure

The `dist/` folder should contain:

```
dist/
├── index.html                 (Main HTML file)
├── assets/                    (CSS, JS, images)
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── images/
│       ├── zeal-logo.jpg
│       └── zeal-sigil-main.jpg
└── _redirects                 (For SPA routing)
```

### Method B: Simple Static HTML Version

I've created a simplified version that works without React build:

**File: `simple-index.html`** (in this folder)

This is a single-file version with embedded CSS that displays:
- The new sigil animation intro
- Product showcase
- About section
- Working cart (localStorage)

## Option 2: Build on Your Local Machine

```bash
# 1. Download this folder to your computer
cd zeal-shop

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Upload dist/ folder to your hosting
```

## Option 3: Netlify Drop (EASIEST)

1. Go to https://app.netlify.com/drop
2. Drag and drop the entire `zeal-shop` folder
3. Get the Netlify URL
4. Configure custom domain in Netlify settings
5. Update DNS in GoDaddy

## DNS Configuration for zeala.zedseclabs.co.za

### If using Netlify:
```
Type: CNAME
Name: zeala
Value: [your-netlify-site].netlify.app
TTL: 3600
```

### If using traditional hosting:
```
Type: A
Name: zeala
Value: [your-server-ip]
TTL: 3600
```

## Admin Access

- Click the lock icon (bottom right)
- Password: `66696`

## Features Ready

✅ New intricate sigil intro animation  
✅ Single product: The ZEAL Hoodie  
✅ 3 colors: Black, Charcoal, White  
✅ 5 sizes: S, M, L, XL, XXL  
✅ Interactive product viewer  
✅ Shopping cart  
✅ Admin panel with stock management  
✅ Payment gateway config (Stripe/PayPal/PayFast)  
✅ "New World Disorder" branding  

## Troubleshooting

**If images don't load:**
- Check that images are in `/images/` folder
- Verify paths are correct in HTML

**If animations don't work:**
- Check browser console for errors
- Ensure GSAP is loaded

**If cart doesn't persist:**
- localStorage must be enabled
- Check browser privacy settings

## Support

For issues with deployment, check:
1. File permissions (755 for folders, 644 for files)
2. .htaccess for Apache (if using)
3. SSL certificate is active
4. DNS has propagated (can take up to 48 hours)

---

Last Updated: March 4, 2026
