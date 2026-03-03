# XCURSION — Deployment Guide

## Project Structure

After refactoring, your project is now split into three clean files:

```
xcursion/
├── index.html        ← HTML structure only
├── css/
│   └── styles.css    ← All styles
└── js/
    └── main.js       ← All JavaScript
```

This separation makes the code far easier to maintain: you can update styles
without touching HTML, and debug JS without wading through 800 lines of markup.

---

## Deploying to Vercel

Vercel is an excellent choice — it's free for personal projects, deploys in
seconds, and handles custom domains cleanly.

### Step 1 — Push to GitHub

Vercel deploys from a Git repository. If you haven't already:

1. Create a new repository on GitHub (e.g. `xcursion-site`)
2. In your project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/xcursion-site.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in with GitHub
2. Click **"Add New Project"**
3. Import your `xcursion-site` repository
4. Vercel will auto-detect it as a static site — no build settings needed
5. Click **Deploy**

Your site will be live at a `.vercel.app` URL within ~30 seconds.

### Step 3 — Add Your Custom Domain

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Click **"Add Domain"** and enter your domain (e.g. `xcursion.com`)
3. Vercel will show you DNS records to add — you'll need **one of**:

**If using Vercel's nameservers (recommended — simplest):**
- Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
- Change the nameservers to Vercel's:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

**If keeping your existing nameservers:**
- Add an **A record**: `@` → `76.76.21.21`
- Add a **CNAME record**: `www` → `cname.vercel-dns.com`

DNS changes can take a few minutes to a few hours to propagate.

### Step 4 — HTTPS

Vercel automatically provisions a free SSL certificate (via Let's Encrypt)
once your domain is pointing correctly. No action needed on your part.

---

## Future Deployments

Every time you push a commit to your `main` branch, Vercel will automatically
redeploy. No manual steps required after the initial setup.

---

## What to Consider Next

Now that the code is split properly, here are natural next steps as the site
grows:

**Blog posts** — Currently hardcoded in HTML. As you add more posts, consider
a static site generator like Astro or Eleventy, which lets you write posts in
Markdown files and generates the HTML automatically.

**Shop** — When you're ready to go live with purchases, Shopify's Buy Button
or Stripe Payment Links can be embedded without a full e-commerce rebuild.

**Images** — Add a folder `images/` or `assets/` to the project for any
product photos, project thumbnails, etc., and reference them with relative
paths like `<img src="images/tee-explorer.jpg">`.

**favicon** — Add a `favicon.ico` or `.png` to the root folder and link it
in the `<head>` of `index.html`:
```html
<link rel="icon" type="image/png" href="favicon.png">
```
