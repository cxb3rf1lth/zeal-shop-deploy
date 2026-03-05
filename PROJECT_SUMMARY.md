# ZEAL - The Signature Hoodie (Revamped)

## Overview

Complete website redesign focusing on ONE product: **The ZEAL Signature Hoodie**.

## The Product

### The ZEAL Hoodie
**Price:** R1,299  
**Colors:** Midnight Black, Shadow Grey, Bone White  
**Sizes:** S, M, L, XL, XXL  
**Material:** 400gsm Premium Heavyweight Cotton

### Design Features

1. **Front - Large ZEAL Sigil**
   - Prominent occult symbol centered on chest
   - Gold embroidery/print aesthetic
   - The symbol of consciousness and awareness

2. **Back - Large ZEAL Sigil**
   - Full back design with triangle, eye, and ZEAL text
   - Gold accents
   - Commanding presence

3. **Right Sleeve - "As above"**
   - Running down the outside of the right arm
   - Gold text
   - The Hermetic principle

4. **Left Sleeve - "So below"**
   - Running down the outside of the left arm
   - Gold text
   - Completes the principle

5. **Hood Interior - Eye of Zeal**
   - Hidden detail
   - Only visible when hood is worn
   - All-seeing eye design
   - A secret for the wearer

## Website Structure

### 1. SummoningSeal (Loading Screen)
- Your ZEAL logo spins in the center
- Planetary symbols rotate around
- Text decode animation reveals "ZEAL"
- "As Above, So Below" banner
- Gold accent colors throughout

### 2. Hero Section
- Massive floating ZEAL logo
- "The First And Only" tagline
- Animated entrance
- Direct link to product

### 3. Product Showcase (NEW - Main Feature)
- **Interactive 3D-style hoodie display**
- Toggle between: Front View, Back View, Hood Detail
- Visual representation of all design features
- Color selector (Black, Charcoal, White)
- Size selector (S-XXL)
- Add to cart functionality
- Stock indicator
- Feature list with descriptions

### 4. About Section
- Brand philosophy
- Three feature cards explaining:
  - Front & Back Sigil
  - Sleeve Philosophy
  - The Hidden Eye
- Material specifications

### 5. Footer
- Newsletter signup
- Social links
- Contact information

### 6. Shopping Cart
- Slide-out sidebar
- Quantity controls
- Stock management
- Free shipping over R1500

### 7. Admin Panel (Password: 66696)
- Dashboard with stats
- Product image upload
- Stock management per size/color
- Order tracking
- Payment gateway configuration
- Store settings

## Technical Details

### Stack
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS
- Zustand state management
- GSAP animations
- Lucide icons

### Files Structure
```
zeal-shop/
├── src/
│   ├── components/
│   │   ├── SummoningSeal.tsx    (Loading animation)
│   │   ├── Hero.tsx             (Landing page)
│   │   ├── ProductShowcase.tsx  (Main product display)
│   │   ├── About.tsx            (Brand story)
│   │   ├── Navigation.tsx       (Header nav)
│   │   ├── Cart.tsx             (Shopping cart)
│   │   ├── Footer.tsx           (Footer)
│   │   └── AdminPanel.tsx       (Admin dashboard)
│   ├── store/
│   │   └── index.ts             (Single product state)
│   ├── types/
│   │   └── index.ts             (TypeScript types)
│   ├── App.tsx                  (Main app)
│   ├── main.tsx                 (Entry point)
│   └── index.css                (Styles)
├── public/
│   └── images/
│       └── zeal-logo.jpg        (Your logo)
├── package.json
├── vite.config.ts
└── index.html
```

## Key Improvements

### Visual Appeal
1. **Clean, Minimal Design** - Focus on the single product
2. **Gold Accent Colors** - Consistent with your logo
3. **Smooth Animations** - GSAP-powered transitions
4. **Dark Theme** - Occult aesthetic
5. **Typography** - Cinzel font for that premium occult feel

### Functionality
1. **Interactive Product Display** - Toggle between views
2. **Stock Management** - Real-time inventory tracking
3. **Size/Color Selection** - Visual selection with feedback
4. **Admin Dashboard** - Full product and order management
5. **Payment Ready** - Stripe, PayPal, PayFast configuration

### User Experience
1. **Single Focus** - No distractions, just the hoodie
2. **Clear CTA** - Easy path to purchase
3. **Storytelling** - Philosophy and meaning explained
4. **Mobile Responsive** - Works on all devices

## Deployment Instructions

### Step 1: Deploy to Netlify
```bash
cd /home/cxb3rf1lth/Projects/web/zeal-shop
npm install
npm run build
# Upload dist/ folder to Netlify
```

### Step 2: Configure Domain
1. Add custom domain in Netlify: `shop.zedseclabs.co.za`
2. Note the DNS settings provided

### Step 3: Update GoDaddy DNS
**Option A - CNAME Record:**
```
Type: CNAME
Name: shop
Value: [your-netlify-site].netlify.app
TTL: 1 Hour
```

**Option B - A Record:**
```
Type: A
Name: shop
Value: 75.2.60.5 (or 99.83.231.61)
TTL: 1 Hour
```

## Admin Access
- **URL:** Click lock icon in bottom right
- **Password:** `66696`

## Customization Options

### Change Product Images
In Admin Panel → Product:
- Upload new front image
- Upload new back image
- Changes reflect immediately

### Update Pricing
In Admin Panel → Product:
- Edit base price
- Individual variant prices

### Manage Stock
In Admin Panel → Product:
- See stock per size/color
- Increase/decrease inventory
- Track low stock

### Configure Payments
In Admin Panel → Payments:
- Add Stripe keys
- Add PayPal Client ID
- Add PayFast credentials
- Enable/disable gateways

## Future Expansion

The site is built to easily add:
- More products (when ready)
- Additional collections
- Blog/Content section
- Customer accounts
- Reviews system

## Brand Identity

**Colors:**
- Gold: #a08040 (Primary accent)
- Black: #050505 (Background)
- White: #f5f5f5 (Text)
- Grey variants for depth

**Fonts:**
- Cinzel (Headings - occult feel)
- Inter (Body - readability)

**Motto:**
"As Above, So Below"

---

## Summary

This is a focused, premium e-commerce experience for ONE product - The ZEAL Signature Hoodie. Every element is designed to showcase the hoodie's unique features:

- Front & back sigils
- Sleeve text
- Hidden Eye of Zeal

The site tells the story, displays the product beautifully, and makes purchasing simple. Ready for deployment to `shop.zedseclabs.co.za`.
