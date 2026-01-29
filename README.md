This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing Locally with ChatGPT

To test your ChatGPT app locally without deploying, you need to expose your local server to the internet using a tunneling service. Here are the steps:

### Quick Start (Using Helper Script)

You can use the included helper script to get started:

```bash
pnpm dev:tunnel
# or
npm run dev:tunnel
```

This will guide you through the setup process.

### Option 1: Using ngrok (Recommended)

1. **Install ngrok** (if not already installed):
   ```bash
   # macOS
   brew install ngrok
   
   # Or download from https://ngrok.com/download
   ```

2. **Start your Next.js dev server**:
   ```bash
   pnpm dev
   ```

3. **In a new terminal, start ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** from ngrok (e.g., `https://abc123.ngrok.io`)

5. **Create a `.env.local` file** in the project root:
   ```env
   MCP_WIDGET_HELLOWORLD_URL=https://abc123.ngrok.io/widgets/sayhello
   MCP_SERVER_VERSION=1.0.2
   ```

6. **Restart your Next.js dev server** to load the new environment variables

7. **Configure ChatGPT to use your MCP server**:
   - In ChatGPT, go to Settings → MCP Servers
   - Add a new server with the URL: `https://abc123.ngrok.io/api/mcp`
   - Save and test the connection

### Option 2: Using Cloudflare Tunnel (cloudflared)

1. **Install cloudflared**:
   ```bash
   # macOS
   brew install cloudflare/cloudflare/cloudflared
   ```

2. **Start your Next.js dev server**:
   ```bash
   pnpm dev
   ```

3. **In a new terminal, start the tunnel**:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

4. **Follow steps 4-7 from Option 1**, using the Cloudflare tunnel URL instead

### Option 3: Using localtunnel

1. **Install localtunnel**:
   ```bash
   npm install -g localtunnel
   ```

2. **Start your Next.js dev server**:
   ```bash
   pnpm dev
   ```

3. **In a new terminal, start localtunnel**:
   ```bash
   lt --port 3000
   ```

4. **Follow steps 4-7 from Option 1**, using the localtunnel URL instead

### Important Notes

- **Keep both terminals running**: Your Next.js dev server AND the tunnel must stay running
- **Update MCP_SERVER_VERSION**: Increment this value in `.env.local` when you make changes to force ChatGPT to reload the configuration
- **HTTPS required**: ChatGPT requires HTTPS, so make sure your tunnel provides an HTTPS URL
- **Widget URL**: The `MCP_WIDGET_HELLOWORLD_URL` should point to your tunneled URL + `/widgets/sayhello`
- **MCP Endpoint**: ChatGPT will connect to your tunneled URL + `/api/mcp`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
