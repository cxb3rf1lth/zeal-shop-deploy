#!/bin/bash
# ZEAL Shop Production Deployment Script
# Usage: ./DEPLOY_PRODUCTION.sh [server_user] [server_host] [remote_path]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
SERVER_USER="${1:-u966106682}"
SERVER_HOST="${2:-zeal.zedseclabs.co.za}"
REMOTE_PATH="${3:-/home/u966106682/domains/zeal.zedseclabs.co.za/public_html}"
LOCAL_DIST="./dist"

echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  ZEAL SHOP - PRODUCTION DEPLOYMENT${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo ""

# Verify build exists
if [ ! -d "$LOCAL_DIST" ]; then
    echo -e "${RED}✗ Error: dist/ folder not found!${NC}"
    echo -e "${YELLOW}  Run 'npm run build' first${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build verified${NC}"
echo -e "  Server: ${YELLOW}$SERVER_USER@$SERVER_HOST${NC}"
echo -e "  Path: ${YELLOW}$REMOTE_PATH${NC}"
echo ""

# Check if we can connect via SSH
echo -e "${BLUE}Testing SSH connection...${NC}"
if ssh -o ConnectTimeout=5 -o BatchMode=yes "$SERVER_USER@$SERVER_HOST" "echo 'SSH OK'" 2>/dev/null; then
    echo -e "${GREEN}✓ SSH connection successful${NC}"
    USE_SSH=true
else
    echo -e "${YELLOW}! SSH not available or requires password${NC}"
    echo -e "${YELLOW}  Will use alternative deployment method${NC}"
    USE_SSH=false
fi
echo ""

if [ "$USE_SSH" = true ]; then
    echo -e "${BLUE}Deploying via SSH...${NC}"
    
    # Create backup of current deployment
    echo -e "  Creating backup...${NC}"
    ssh "$SERVER_USER@$SERVER_HOST" "cd $REMOTE_PATH && [ -f index.html ] && tar -czf backup-\$(date +%Y%m%d-%H%M%S).tar.gz *.html assets/ images/ 2>/dev/null || true"
    
    # Clear old files
    echo -e "  Clearing old files...${NC}"
    ssh "$SERVER_USER@$SERVER_HOST" "cd $REMOTE_PATH && rm -rf assets images *.html 2>/dev/null || true"
    
    # Upload new files
    echo -e "  Uploading new files...${NC}"
    scp -r "$LOCAL_DIST"/* "$SERVER_USER@$SERVER_HOST:$REMOTE_PATH/"
    
    echo -e "${GREEN}✓ Deployment complete!${NC}"
else
    echo -e "${YELLOW}════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  MANUAL DEPLOYMENT REQUIRED${NC}"
    echo -e "${YELLOW}════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BLUE}Option 1: Upload via cPanel File Manager${NC}"
    echo "  1. Log into cPanel"
    echo "  2. Open File Manager"
    echo "  3. Navigate to: public_html/"
    echo "  4. Delete existing files (backup first!)"
    echo "  5. Upload zeal-production-deploy.zip"
    echo "  6. Extract the zip file"
    echo ""
    echo -e "${BLUE}Option 2: Upload via FTP/SFTP${NC}"
    echo "  Server: $SERVER_HOST"
    echo "  Username: $SERVER_USER"
    echo "  Remote Path: $REMOTE_PATH"
    echo "  Local Files: $LOCAL_DIST/"
    echo ""
    echo -e "${BLUE}Option 3: Run this script with SSH key${NC}"
    echo "  ssh-copy-id $SERVER_USER@$SERVER_HOST"
    echo "  ./DEPLOY_PRODUCTION.sh"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  DEPLOYMENT PACKAGE READY${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Package: ${YELLOW}zeal-production-deploy.zip${NC}"
echo -e "Size: $(du -h zeal-production-deploy.zip | cut -f1)"
echo ""
echo -e "${BLUE}Features in this deployment:${NC}"
echo "  ✓ Summoning Seal intro animation"
echo "  ✓ Product showcase with 3 views (front/back/detail)"
echo "  ✓ Color selection (Black/Charcoal/White)"
echo "  ✓ Size selection (S/M/L/XL/XXL)"
echo "  ✓ Shopping cart with Zustand state"
echo "  ✓ Admin panel (password: 66696)"
echo "  ✓ Responsive navigation"
echo "  ✓ GSAP animations"
echo ""
echo -e "${BLUE}Post-deployment checklist:${NC}"
echo "  □ Visit https://zeal.zedseclabs.co.za"
echo "  □ Test Summoning Seal enter button"
echo "  □ Test product color/size selection"
echo "  □ Test add to cart"
echo "  □ Test admin login (password: 66696)"
echo "  □ Test mobile responsiveness"
echo ""
