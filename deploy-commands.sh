#!/bin/bash
# Quick deployment commands for ZEAL Shop

echo "═══════════════════════════════════════════════════"
echo "  ZEAL SHOP - DEPLOYMENT COMMANDS"
echo "═══════════════════════════════════════════════════"
echo ""

cd /home/cxb3rf1lth/Projects/web/zeal-shop

echo "Build Status:"
ls -lh dist/index.html dist/images/*.jpg 2>/dev/null | head -5
echo ""

echo "Deployment Package:"
ls -lh zeal-production-deploy.zip
echo ""

echo "═══════════════════════════════════════════════════"
echo "  QUICK DEPLOY COMMANDS"
echo "═══════════════════════════════════════════════════"
echo ""

echo "1. SCP Upload (if you have SSH access):"
echo "   scp -r dist/* u966106682@zeal.zedseclabs.co.za:/home/u966106682/domains/zeal.zedseclabs.co.za/public_html/"
echo ""

echo "2. RSYNC Upload (faster for updates):"
echo "   rsync -avz --delete dist/ u966106682@zeal.zedseclabs.co.za:/home/u966106682/domains/zeal.zedseclabs.co.za/public_html/"
echo ""

echo "3. Create zip for manual upload:"
echo "   Already created: zeal-production-deploy.zip"
echo ""

echo "═══════════════════════════════════════════════════"
echo "  VERIFICATION URLS"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Production URL: https://zeal.zedseclabs.co.za"
echo "Test locally: python3 -m http.server 8765 --directory dist"
echo ""
