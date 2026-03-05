#!/bin/bash
# Alternative deployment methods for ZEAL shop

echo "═══════════════════════════════════════════════════════"
echo "  ZEAL SHOP - ALTERNATIVE DEPLOYMENT"
echo "═══════════════════════════════════════════════════════"
echo ""

# Method 1: Try with explicit site ID
echo "Method 1: Deploying with explicit site ID..."
npx netlify deploy --site=cf48d55e-8149-40d7-986d-e46aff85b1d6 --prod --dir=dist 2>&1 || echo "Method 1 failed"

echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

# Method 2: Try creating a new site and deploying
echo "Method 2: Creating new site..."
echo "Run: npx netlify sites:create --name zeal-shop-v2"
echo "Then: npx netlify deploy --prod --dir=dist"

echo ""
echo "═══════════════════════════════════════════════════════"
echo ""

# Method 3: Manual drag-and-drop
echo "Method 3: Manual deployment via Netlify UI"
echo "1. Go to: https://app.netlify.com/sites/zeal-zedseclabs/deploys"
echo "2. Drag and drop the 'dist' folder to the deploy area"
echo "3. Or use: https://app.netlify.com/drop"
echo ""
echo "Your dist folder is at: $(pwd)/dist"
