# GoDaddy DNS Access Requirements

To deploy the ZEAL website to `shop.zedseclabs.co.za`, you need access to modify DNS records for your domain.

## What You Need

### Option 1: Full GoDaddy Account Access (Easiest)

**Login Credentials:**
- GoDaddy account email/username
- Password
- 2FA code (if enabled)

**What I can do with this:**
- Login to GoDaddy
- Navigate to DNS Management
- Add/modify DNS records
- Configure subdomain
- Set up SSL if needed

---

### Option 2: Delegate Access (Recommended for Security)

GoDaddy allows you to give someone access to manage specific domains without sharing your password.

**How to grant delegate access:**
1. Login to your GoDaddy account
2. Go to "Account Settings" → "Delegate Access"
3. Click "Grant Access"
4. Enter the delegate's email
5. Select "Products, Domains, and Purchase" or "Domains Only"
6. Set expiration date (optional)

**What I can do with delegate access:**
- Manage DNS records for specified domains
- Cannot change account settings or passwords
- Cannot make purchases

---

### Option 3: DNS Management Instructions

If you prefer to handle DNS yourself, here are the exact steps:

#### Step 1: Get the Hosting Details
After I deploy to Netlify, you'll receive:
- Netlify site URL (e.g., `zealous-apparel-123.netlify.app`)
- Or IP addresses if using A records

#### Step 2: Login to GoDaddy
1. Go to https://dcc.godaddy.com
2. Login with your credentials
3. Find your domain: `zedseclabs.co.za`

#### Step 3: Access DNS Management
1. Click on the domain
2. Go to "DNS" tab
3. Click "Add" to add new records

#### Step 4: Add DNS Records

**For Netlify deployment (CNAME method - RECOMMENDED):**

```
Type: CNAME
Name: shop
Value: [your-netlify-site].netlify.app
TTL: 1 Hour
```

**For server with IP (A record method):**

```
Type: A
Name: shop
Value: [server-ip-address]
TTL: 1 Hour
```

#### Step 5: Wait for Propagation
- DNS changes can take 1-48 hours
- Usually takes 1-4 hours
- Test with: `nslookup shop.zedseclabs.co.za`

---

## DNS Records Reference

### Current Records (Likely Present)
```
Type: A
Name: @ (root)
Value: [your-main-website-ip]

Type: CNAME
Name: www
Value: @
```

### New Records to Add
```
Type: CNAME
Name: shop
Value: [netlify-site].netlify.app
```

---

## Verification Commands

After DNS is updated, verify with:

```bash
# Check DNS resolution
nslookup shop.zedseclabs.co.za

# Or using dig
dig shop.zedseclabs.co.za

# Check HTTPS
https://shop.zedseclabs.co.za
```

---

## Security Considerations

### Option 1: Temporary Password
1. Change your GoDaddy password to a temporary one
2. Share temporary credentials
3. I complete the DNS setup
4. You change password back

### Option 2: Limited Time Access
1. Grant delegate access for 24-48 hours
2. I complete the work
3. Access automatically expires

### Option 3: Screen Sharing
1. You maintain control
2. I guide you through the steps
3. You make the changes yourself

---

## What Happens After DNS is Configured

1. **SSL Certificate**: Netlify/Vercel will automatically provision SSL
2. **HTTPS**: Site will be accessible via https://shop.zedseclabs.co.za
3. **WWW Redirect**: Can configure www.shop.zedseclabs.co.za if needed
4. **Email**: Existing email setup won't be affected

---

## Troubleshooting

### DNS Not Propagating
- Clear local DNS cache: `ipconfig /flushdns` (Windows) or `sudo killall -HUP mDNSResponder` (Mac)
- Check global propagation: https://www.whatsmydns.net/
- Verify TTL is set to 1 hour (3600 seconds)

### SSL Certificate Issues
- Ensure CNAME points correctly
- Wait 24 hours for SSL provisioning
- Check Netlify dashboard for SSL status

### Site Not Loading
- Verify DNS records are correct
- Check if domain is active in hosting platform
- Ensure no conflicting records exist

---

## Quick Checklist

- [ ] Domain is registered: zedseclabs.co.za
- [ ] Access to GoDaddy account or DNS management
- [ ] Decide on subdomain: shop.zedseclabs.co.za
- [ ] Choose hosting platform: Netlify (recommended)
- [ ] Have admin password ready: 66696

---

## Contact & Support

If you have issues:
- GoDaddy Support: https://www.godaddy.com/help
- Netlify Support: https://www.netlify.com/support/
- DNS Propagation Check: https://www.whatsmydns.net/
