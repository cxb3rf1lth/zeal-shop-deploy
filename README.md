# ZEAL - New World Disorder

A premium e-commerce website for occult-inspired clothing featuring Major Arcana tarot designs.

## Features

### Frontend
- **Summoning Seal Loading Animation** - Mystical entrance with your ZEAL logo
- **Virtual Dressing Room** - 3D garment preview with zoom, rotation, and front/back views
- **Virtual Closet** - Save favorites and view recently viewed items
- **Product Collections** - 44 products across Celestial and Shadow Arcana collections
- **Responsive Design** - Optimized for all devices

### Admin Panel (Password: `66696`)
- **Dashboard** - Revenue, orders, and low stock alerts
- **Product Management** - Edit products, upload images, manage inventory
- **Order Management** - Track and update order status
- **Payment Configuration** - Stripe, PayPal, PayFast integration
- **Store Settings** - SEO, social media, analytics configuration

### Payment Gateways
- **Stripe** - Credit/debit card processing
- **PayPal** - Express checkout
- **PayFast** - South African payment gateway

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Zustand (state management)
- GSAP (animations)
- Lucide React (icons)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Option 1: Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Configure custom domain in Netlify settings
4. Update DNS records in GoDaddy

### Option 2: Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Configure custom domain

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your web server
3. Configure domain DNS to point to server

## GoDaddy DNS Configuration

To connect your domain (zedseclabs.co.za) to the website:

### For subdomain (shop.zedseclabs.co.za):

**Option A: Using CNAME (for Netlify/Vercel)**
```
Type: CNAME
Name: shop
Value: [your-netlify-or-vercel-domain]
TTL: 1 hour
```

**Option B: Using A Record (for traditional hosting)**
```
Type: A
Name: shop
Value: [your-server-ip-address]
TTL: 1 hour
```

### For root domain (zedseclabs.co.za):

```
Type: A
Name: @
Value: [your-server-ip-address]
TTL: 1 hour
```

## Admin Access

- URL: Click the lock icon in bottom right
- Password: `66696`

## Environment Variables

For production deployment, set these environment variables:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_id
```

## License

© 2024 ZEAL. All rights reserved.
