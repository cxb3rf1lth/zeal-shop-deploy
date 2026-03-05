#!/bin/bash

echo "====================================="
echo "ZEAL Shop - Deployment Script"
echo "====================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found!"
    echo "Please run this script from the zeal-shop directory"
    exit 1
fi

echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

echo "Step 2: Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "Error: dist folder not found!"
    exit 1
fi

# Check if logo exists in dist
if [ ! -f "dist/images/zeal-logo.jpg" ]; then
    echo "Warning: Logo not found in dist/images/"
    echo "Copying logo to dist folder..."
    mkdir -p dist/images
    cp public/images/zeal-logo.jpg dist/images/
fi

echo "Step 3: Build complete!"
echo ""
echo "====================================="
echo "Next Steps:"
echo "====================================="
echo ""
echo "Option 1 - Deploy to Netlify:"
echo "  1. Go to https://app.netlify.com/drop"
echo "  2. Drag and drop the 'dist' folder"
echo "  3. Get your Netlify URL"
echo ""
echo "Option 2 - Deploy to Vercel:"
echo "  1. Install Vercel CLI: npm i -g vercel"
echo "  2. Run: vercel --prod"
echo ""
echo "Option 3 - Upload to hosting:"
echo "  1. Upload contents of 'dist/' folder to your server"
echo "  2. Point domain to server IP"
echo ""
echo "====================================="
echo "GoDaddy DNS Configuration:"
echo "====================================="
echo ""
echo "For subdomain shop.zedseclabs.co.za:"
echo ""
echo "If using Netlify (CNAME):"
echo "  Type: CNAME"
echo "  Name: shop"
echo "  Value: [your-netlify-site].netlify.app"
echo "  TTL: 3600"
echo ""
echo "If using your own server (A Record):"
echo "  Type: A"
echo "  Name: shop"
echo "  Value: [your-server-ip]"
echo "  TTL: 3600"
echo ""
echo "====================================="
echo "Admin Access:"
echo "====================================="
echo "Password: 66696"
echo "Click lock icon in bottom right"
echo ""
echo "✓ Ready for deployment!"
