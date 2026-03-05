#!/bin/bash
# Deploy to Cloudflare Pages using Direct Upload API

ACCOUNT_ID="your-account-id"
PROJECT_NAME="zeal-shop"
API_TOKEN="your-api-token"

echo "To deploy to Cloudflare Pages:"
echo "1. Get your API token from https://dash.cloudflare.com/profile/api-tokens"
echo "   - Create token with 'Cloudflare Pages:Edit' permission"
echo "2. Get your Account ID from the right sidebar in Cloudflare dashboard"
echo ""
echo "Then run:"
echo "  export CF_API_TOKEN=your_token"
echo "  export CF_ACCOUNT_ID=your_account_id"
echo "  ./deploy-cloudflare.sh"
