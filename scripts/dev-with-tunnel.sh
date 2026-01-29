#!/bin/bash

# Helper script to run Next.js dev server with tunnel setup instructions
# This script helps you test your ChatGPT app locally

set -e

echo "🚀 ChatGPT App Local Development Helper"
echo "========================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found. Creating one..."
    echo ""
    echo "Please set up your tunnel first, then update .env.local with:"
    echo "  MCP_WIDGET_HELLOWORLD_URL=https://your-tunnel-url/widgets/sayhello"
    echo "  MCP_SERVER_VERSION=1.0.2"
    echo ""
    read -p "Press Enter to continue..."
fi

# Check if ngrok is available
if command -v ngrok &> /dev/null; then
    echo "✅ ngrok is installed"
    echo ""
    echo "To start ngrok in another terminal, run:"
    echo "  ngrok http 3000"
    echo ""
elif command -v cloudflared &> /dev/null; then
    echo "✅ cloudflared is installed"
    echo ""
    echo "To start cloudflared in another terminal, run:"
    echo "  cloudflared tunnel --url http://localhost:3000"
    echo ""
elif command -v lt &> /dev/null; then
    echo "✅ localtunnel is installed"
    echo ""
    echo "To start localtunnel in another terminal, run:"
    echo "  lt --port 3000"
    echo ""
else
    echo "⚠️  No tunneling tool found. Please install one:"
    echo "  - ngrok: brew install ngrok"
    echo "  - cloudflared: brew install cloudflare/cloudflare/cloudflared"
    echo "  - localtunnel: npm install -g localtunnel"
    echo ""
fi

echo "📝 Next steps:"
echo "1. Start your tunnel in a separate terminal (see commands above)"
echo "2. Copy the HTTPS URL from your tunnel"
echo "3. Update .env.local with: MCP_WIDGET_HELLOWORLD_URL=https://your-tunnel-url/widgets/sayhello"
echo "4. In ChatGPT, add MCP server: https://your-tunnel-url/api/mcp"
echo ""
echo "Starting Next.js dev server..."
echo ""

# Start the dev server
pnpm dev

