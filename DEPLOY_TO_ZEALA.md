# Deploy ZEAL Website to zeal.zedseclabs.co.za

## 📦 Deployment Package Ready

**File:** `zeal-deploy.zip` (600KB)  
**Location:** `/home/cxb3rf1lth/Projects/web/zeal-shop/`

---

## 🚀 Quick Deploy Options

### Option 1: cPanel File Manager (EASIEST)

1. **Login to cPanel** for zedseclabs.co.za
2. **Go to File Manager**
3. **Navigate to:** `public_html/zeal/` (create folder if doesn't exist)
4. **Upload** `zeal-deploy.zip`
5. **Extract** the zip file
6. **Move contents** from `dist/` to root of `zeal/` folder:
   ```
   zeal/
   ├── index.html
   └── images/
       ├── zeal-logo.jpg
       └── zeal-sigil-main.jpg
   ```

---

### Option 2: FTP Upload

1. **Connect via FTP** to your server
2. **Navigate to:** `/public_html/zeal/`
3. **Upload files:**
   - `dist/index.html` → `/zeal/index.html`
   - `dist/images/` → `/zeal/images/`

---

### Option 3: SSH/Terminal

```bash
# Connect to server
ssh username@zedseclabs.co.za

# Navigate to web root
cd /home/username/public_html

# Create zeal directory
mkdir -p zeal

# Upload zeal-deploy.zip via SCP from local machine
# Then extract:
cd zeal
unzip ~/zeal-deploy.zip
mv dist/* .
rm -rf dist zeal-deploy.zip

# Set permissions
chmod 755 .
chmod 644 index.html
chmod 755 images
chmod 644 images/*
```

---

## 🌐 DNS Configuration (If Needed)

If `zeal.zedseclabs.co.za` is not yet pointing to your server:

### In GoDaddy DNS:

```
Type: A
Name: zeal
Value: [YOUR_SERVER_IP]
TTL: 600 (10 minutes)
```

**Or if using a subdomain folder (like cPanel):**
- No DNS changes needed if main domain already points to server
- Just create the `zeal` folder in `public_html/`

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at `https://zeal.zedseclabs.co.za`
- [ ] Intro animation plays with new sigil
- [ ] "Enter" button appears after animation
- [ ] Main site reveals when clicking Enter
- [ ] Product images display correctly
- [ ] Navigation works
- [ ] Admin login works (password: 66696)
- [ ] SSL/HTTPS is active (green lock icon)

---

## 🔧 Troubleshooting

### Images Not Loading?
Check browser console (F12 → Console) for 404 errors.

**Fix:** Ensure images are in `/images/` folder relative to index.html:
```
zeal/
├── index.html
└── images/
    ├── zeal-logo.jpg
    └── zeal-sigil-main.jpg
```

### 500 Internal Server Error?
- Check file permissions (755 for folders, 644 for files)
- Check .htaccess file isn't blocking access
- Check error logs in cPanel

### SSL/HTTPS Issues?
- Ensure SSL certificate covers subdomains (*.zedseclabs.co.za)
- Or request Let's Encrypt SSL for zeal.zedseclabs.co.za
- Force HTTPS in .htaccess if needed

### Animation Not Playing?
- Check browser console for JavaScript errors
- Ensure browser supports CSS animations (all modern browsers do)
- Try clearing browser cache (Ctrl+Shift+R)

---

## 🎨 What's Included

### New Features:
✅ Intricate sigil intro animation  
✅ "New World Disorder" branding  
✅ Single product focus (The ZEAL Hoodie)  
✅ Interactive product viewer  
✅ Dark, smooth animations (no harsh flashes)  
✅ Mobile responsive  
✅ Admin panel (password: 66696)  

### Design Elements:
- Gold (#a08040) accent color
- Black background (#010101)
- Cinzel font for occult aesthetic
- Rune ring animation
- Central sigil reveal
- Letter-by-letter "ZEAL" text

---

## 📁 File Structure

```
zeal-deploy.zip
└── dist/
    ├── index.html          (Main website - 16KB)
    └── images/
        ├── zeal-logo.jpg       (153KB)
        └── zeal-sigil-main.jpg (479KB)
```

**Total Size:** ~650KB (very lightweight!)

---

## 🔒 Admin Access

- **URL:** Click lock icon (bottom right of site)
- **Password:** `66696`
- **Features:** Product management, stock levels, orders (demo)

---

## 📞 Need Help?

If deployment fails:
1. Check server error logs
2. Verify file permissions
3. Test with simple HTML file first
4. Contact hosting support if DNS issues

---

**Ready to deploy!** Upload the zip file and extract to `zeal.zedseclabs.co.za` folder. 🚀
