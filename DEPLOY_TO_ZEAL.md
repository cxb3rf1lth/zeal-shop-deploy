# 🚀 DEPLOY ZEAL WEBSITE TO: zeal.zedseclabs.co.za

---

## ✅ CORRECT DOMAIN: **zeal.zedseclabs.co.za**

---

## 📦 Your Deployment Package

**File:** `zeal-deploy.zip` (600KB)  
**Location:** `/home/cxb3rf1lth/Projects/web/zeal-shop/`

**Contains:**
```
zeal-deploy.zip
├── index.html          (Website - 17KB)
└── images/
    ├── zeal-logo.jpg       (150KB)
    └── zeal-sigil-main.jpg (468KB)
```

---

## ⚡ FASTEST DEPLOY METHOD (cPanel)

### Step 1: Access cPanel
Login to your hosting cPanel for zedseclabs.co.za

### Step 2: File Manager
1. Click **File Manager**
2. Navigate to `public_html/`
3. Click **+ Folder** (Create New Folder)
4. Name it: **`zeal`** ✓ (NOT "zeala")

### Step 3: Upload
1. Open **`zeal`** folder
2. Click **Upload**
3. Select `zeal-deploy.zip`
4. Wait for upload to complete

### Step 4: Extract
1. Right-click `zeal-deploy.zip`
2. Click **Extract**
3. Move files from `dist/` to root:
   - Select `dist/index.html` → Move to `/zeal/`
   - Select `dist/images/` → Move to `/zeal/`
4. Delete empty `dist/` folder

### Step 5: Done!
Visit: `https://zeal.zedseclabs.co.za` ✓

---

## 🌐 DNS Configuration

### Check GoDaddy DNS for subdomain:

```
Type: A
Name: zeal          ← (NOT "zeala")
Value: [YOUR_SERVER_IP]
TTL: 600
```

Or if using CNAME with Netlify:
```
Type: CNAME
Name: zeal
Value: [your-site].netlify.app
TTL: 3600
```

---

## ✅ Verify These Features Work

1. **Intro Animation**
   - Rune ring rotates
   - Central sigil fades in
   - "ZEAL" text appears letter-by-letter
   - "Enter" button appears

2. **Main Site**
   - Click Enter to reveal site
   - Navigation shows ZEAL logo
   - Hero section with large ZEAL text
   - "New World Disorder" tagline

3. **Product Page**
   - The ZEAL Hoodie displayed
   - Price: R1,299
   - Color options (Black, Charcoal, White)
   - Size options (S-XXL)
   - Add to Cart button

4. **Admin Panel**
   - Click lock icon (bottom right)
   - Password: `66696`
   - Demo admin dashboard shows

---

## 🔧 Troubleshooting

### Images Not Showing?
Check URL: `https://zeal.zedseclabs.co.za/images/zeal-sigil-main.jpg`

Should display the gold sigil image.

**Fix:** Ensure images are in `/zeal/images/` folder (NOT `/zeala/images/`)

### 404 Error?
Ensure `index.html` is at `/zeal/index.html` (root of **zeal** folder)

### Domain Not Working?
Double-check DNS record:
- Name should be: **`zeal`** (not "zeala")
- Wait for DNS propagation (1-48 hours)

---

## 🎨 What's Live

✅ **New intricate sigil** intro animation  
✅ **Dark, smooth transitions** (no harsh flashes)  
✅ **"New World Disorder"** branding  
✅ **Single product:** The ZEAL Hoodie  
✅ **R1,299** price  
✅ **3 colors:** Black, Charcoal, White  
✅ **5 sizes:** S, M, L, XL, XXL  
✅ **Admin panel** (password: 66696)  
✅ **Mobile responsive**  

---

## 📞 Need Help?

If deployment fails:
1. Check folder is named **`zeal`** (not zeala)
2. Check DNS record name is **`zeal`**
3. Check file permissions (755 folders, 644 files)
4. Check error logs in cPanel

---

## 🎯 SUCCESS CHECKLIST

- [ ] Created folder: `public_html/zeal/` ✓
- [ ] Uploaded `zeal-deploy.zip`
- [ ] Extracted files to `/zeal/` (not `/zeal/dist/`)
- [ ] Website loads at `zeal.zedseclabs.co.za` ✓
- [ ] DNS record: Name = `zeal` ✓
- [ ] Intro animation plays
- [ ] Can click "Enter" to view site
- [ ] Product images display
- [ ] Admin login works (66696)

---

**🚀 READY TO DEPLOY TO: zeal.zedseclabs.co.za**

**Remember:** Use **`zeal`** (not zeala) for folder name and DNS record!
