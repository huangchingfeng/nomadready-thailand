# NomadReady Website — Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. (Optional) Add your API keys to .env.local

# 4. Start development server
npm run dev
```

The site runs at `http://localhost:3000`. Without any API keys, the AI chat uses mock mode (keyword-based responses that cover all 11 chapters).

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Claude API key for AI chat. Without it, mock mode is used. |
| `GUMROAD_API_KEY` | No | Gumroad API key for license verification. Without it, any non-empty key is accepted (dev mode). |
| `GUMROAD_PRODUCT_ID` | No | Gumroad product permalink. Defaults to `nomadready-thailand`. |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL for OG images and sitemap. Defaults to `https://nomadready.com`. |

---

## Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **Settings > API Keys** ([direct link](https://console.anthropic.com/settings/keys))
4. Click **Create Key**, give it a name like `nomadready-chat`
5. Copy the key (starts with `sk-ant-`)
6. Paste it as `ANTHROPIC_API_KEY` in your `.env.local`

**Pricing**: The chat uses `claude-sonnet-4-20250514`. Typical cost is ~$0.003-0.01 per chat message. A budget of $10/month handles thousands of conversations.

**Mock mode**: If you leave `ANTHROPIC_API_KEY` empty, the chat falls back to keyword-based responses. These cover all 11 chapters of the Thailand guide and work well for demos and development.

---

## Setting Up Gumroad

### 1. Create the Product

1. Go to [gumroad.com](https://gumroad.com/) and create an account
2. Click **New Product** > **Digital Product**
3. Set product name: `NomadReady Thailand Guide`
4. Set price: `$19` (or your chosen price)
5. Upload the guide PDF
6. Enable **Generate a unique license key per sale** in product settings
7. Note the product permalink (e.g., `nomadready-thailand`) — this is your `GUMROAD_PRODUCT_ID`

### 2. Get the API Key

1. Go to [Settings > Advanced](https://app.gumroad.com/settings/advanced)
2. Under **Application API Key**, copy the key
3. Paste it as `GUMROAD_API_KEY` in your `.env.local`

### 3. How License Verification Works

- User buys the guide on Gumroad and receives a license key via email
- User enters the license key on the NomadReady website
- The website calls `/api/verify-license` which validates the key with Gumroad's API
- Valid keys unlock Pro features (unlimited AI chat, full chapter access)
- In development (no `GUMROAD_API_KEY`), any non-empty key is accepted

---

## Custom Domain Setup

### Option A: Vercel (recommended)

1. Deploy to Vercel (see below)
2. Go to your Vercel project > **Settings > Domains**
3. Add `nomadready.com`
4. At your domain registrar, add the DNS records Vercel provides:
   - `A` record: `76.76.21.21`
   - `CNAME` record for `www`: `cname.vercel-dns.com`
5. SSL is automatic

### Option B: Other hosting

1. Build the site: `npm run build`
2. Deploy the `.next` output to your hosting provider
3. Configure DNS to point to your server
4. Set up SSL (Let's Encrypt / Certbot recommended)

---

## Deploy to Vercel

### Via GitHub (recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com/) and sign up with GitHub
3. Click **Import Project** and select your repository
4. Vercel auto-detects Next.js — no configuration needed
5. Add environment variables in **Settings > Environment Variables**:
   - `ANTHROPIC_API_KEY` (your Claude API key)
   - `GUMROAD_API_KEY` (your Gumroad API key)
   - `GUMROAD_PRODUCT_ID` (your product permalink)
   - `NEXT_PUBLIC_SITE_URL` (your domain, e.g., `https://nomadready.com`)
6. Click **Deploy**

### Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add ANTHROPIC_API_KEY
vercel env add GUMROAD_API_KEY

# Deploy to production
vercel --prod
```

### Preview Deployments

Every push to a non-main branch creates a preview URL automatically. Use this for testing before merging.

---

## Project Structure

```
src/
  app/
    api/
      chat/route.ts          # AI chat endpoint (Claude API or mock)
      verify-license/route.ts # Gumroad license verification
    page.tsx                  # Homepage
    ...
  lib/
    auth.ts                   # License key management + verification
    chat.ts                   # Chat utilities, rate limiting, knowledge base
  components/                 # React components
public/                       # Static assets
```

---

## Development Notes

- **Mock mode**: Great for development. No API costs. Covers all 11 chapters with detailed keyword-based responses.
- **Rate limiting**: Free users get 5 AI chat questions per day. Pro users (verified license) get unlimited.
- **Knowledge base**: The chat system prompt includes the full guide content from `src/lib/chat.ts`. Update `GUIDE_KNOWLEDGE` when guide content changes.
- **Chapter references**: The chat automatically detects which chapter is relevant and shows a link to it.
