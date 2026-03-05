# Xcursion Studios — Project README

> Full technical documentation: Next.js · Sanity CMS · Vercel · Cloudflare

-----

## 1. Project Overview

Xcursion Studios is a lifestyle and creative brand website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. Content is managed via Sanity CMS and deployed to Vercel with a custom Cloudflare domain.

|             |                                         |
|-------------|-----------------------------------------|
|**Framework**|Next.js 16.1.6 (App Router, Turbopack)   |
|**Language** |TypeScript                               |
|**Styling**  |Tailwind CSS + custom CSS variables      |
|**CMS**      |Sanity v5                                |
|**Hosting**  |Vercel                                   |
|**Domain**   |xcursionstudios.com (Cloudflare DNS)     |
|**Fonts**    |Cormorant Garamond, Cormorant SC, DM Mono|
|**React**    |v19 with React Compiler enabled          |

-----

## 2. Repository Structure

```
xcursion-studios-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout — Nav, Background, Cursor
│   │   ├── page.tsx                    # Homepage (scroll-snap sections)
│   │   ├── blog/
│   │   │   ├── page.tsx                # Blog listing
│   │   │   └── [slug]/page.tsx         # Individual post
│   │   ├── shop/
│   │   │   ├── page.tsx                # Shop listing
│   │   │   └── [slug]/page.tsx         # Product page
│   │   ├── projects/
│   │   │   ├── page.tsx                # Projects listing
│   │   │   └── [slug]/page.tsx         # Project case study
│   │   └── studio/[[...tool]]/page.tsx # Sanity Studio
│   ├── components/
│   │   ├── Background.tsx              # bg image + grain + dots
│   │   ├── Nav.tsx                     # Fixed navigation
│   │   └── Cursor.tsx                  # Custom cursor with lag
│   ├── sanity/
│   │   ├── config.ts                   # Project ID, dataset, API version
│   │   ├── client.ts                   # Sanity client
│   │   ├── queries.ts                  # GROQ query functions
│   │   ├── sanity.config.ts            # Studio config
│   │   └── schemas/                    # Content type schemas
│   └── app/globals.css                 # All CSS variables and base styles
├── public/
│   └── bg.png                          # Site background image
├── vercel.json                         # Vercel build config
└── next.config.ts                      # Next.js config with React Compiler
```

-----

## 3. Local Development Setup

### Prerequisites

- Node.js v20+
- npm v10+
- GitHub Codespaces or local environment

### Install & Run

```bash
git clone https://github.com/XCURSION-STUDIOS/xcursion-studios-website.git
cd xcursion-studios-website
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### Environment

No `.env` file is required for local development. The Sanity project ID and dataset are hardcoded in `src/sanity/config.ts` for public read access. The Sanity API write token is only needed for seeding content (see Section 5).

-----

## 4. Next.js Architecture

### 4.1 Homepage Scroll Engine

The homepage uses a custom JavaScript scroll-snap engine rather than CSS scroll-snap. This gives precise control over sensitivity and transition timing.

- 5 full-viewport sections: Hero, Shop, Blog, Projects, Contact
- Wheel events with a 1 second cooldown lock after each section jump
- Touch events supported with a 40px minimum swipe threshold
- Section transition: `translateY` with `cubic-bezier(0.77, 0, 0.175, 1)` over 750ms
- Progress dots fixed to the right side of the viewport

### 4.2 Shared Layout Components

`Background`, `Nav`, and `Cursor` are rendered once in `layout.tsx` and persist across all page navigations — the key performance advantage of Next.js over vanilla HTML. Each component checks `usePathname()` and returns `null` on `/studio` routes.

### 4.3 React Compiler

Enabled in `next.config.ts` via `reactCompiler: true` and the `babel-plugin-react-compiler` devDependency. Automatically optimises re-renders without manual `useMemo` or `useCallback`.

### 4.4 Dynamic vs Static Pages

|Route                |Type                                                |
|---------------------|----------------------------------------------------|
|`/`                  |Static — `force-dynamic` to prevent prerender errors|
|`/blog`              |Static shell, client-side Sanity fetch              |
|`/blog/[slug]`       |Dynamic — server-rendered on demand                 |
|`/shop`              |Static shell, client-side Sanity fetch              |
|`/shop/[slug]`       |Dynamic — server-rendered on demand                 |
|`/projects`          |Static shell, client-side Sanity fetch              |
|`/projects/[slug]`   |Dynamic — server-rendered on demand                 |
|`/studio/[[...tool]]`|Dynamic — Sanity Studio                             |

-----

## 5. Sanity CMS

### 5.1 Project Details

|               |                                  |
|---------------|----------------------------------|
|**Project ID** |`8k1899aj`                        |
|**Dataset**    |`production`                      |
|**API Version**|`2024-01-01`                      |
|**Studio URL** |https://xcursionstudios.com/studio|

### 5.2 Content Types

#### `post` (Blog Post)

|Field       |Type                       |
|------------|---------------------------|
|title       |string                     |
|slug        |slug (auto from title)     |
|category    |string                     |
|date        |string                     |
|readTime    |string                     |
|excerpt     |text                       |
|heroGradient|string (CSS gradient)      |
|content     |array of blocks (rich text)|

#### `project`

|Field      |Type                 |
|-----------|---------------------|
|name       |string               |
|slug       |slug (auto from name)|
|category   |string               |
|year       |string               |
|tags       |array of strings     |
|description|text                 |
|gradient   |string (CSS gradient)|
|label      |string               |
|overview   |text                 |
|tools      |array of strings     |
|outcomes   |array of strings     |

#### `product`

|Field      |Type                             |
|-----------|---------------------------------|
|name       |string                           |
|slug       |slug (auto from name)            |
|price      |string                           |
|badge      |string                           |
|category   |string                           |
|description|text                             |
|gradient   |string (CSS gradient)            |
|label      |string                           |
|specs      |array of objects `{label, value}`|

### 5.3 Seeding Content

To seed all content from scratch, run with a valid Sanity Editor token:

```bash
SANITY_TOKEN=your_token node seed.js
```

Generate a write token at: `sanity.io/manage` → your project → API → Tokens → Add API Token (Editor).

### 5.4 CORS Configuration

Add the following origins at `sanity.io/manage` → API → CORS Origins, with **Allow Credentials** enabled:

- `https://xcursionstudios.com`
- `https://xcursion-studios-website.vercel.app`
- `http://localhost:3000`

### 5.5 Adding New Content

Log in to the Sanity Studio at `https://xcursionstudios.com/studio`. Create, edit, and publish blog posts, projects, and products without touching any code. Changes are reflected on the live site immediately on next page load.

-----

## 6. Vercel Deployment

### 6.1 Configuration

`vercel.json` in the project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "installCommand": "npm install"
}
```

### 6.2 Manual Deploy

```bash
npx vercel --prod
```

### 6.3 CI/CD via GitHub

The GitHub repository is connected to Vercel for automatic deployments:

- Pushing to `production` branch deploys to `xcursionstudios.com`
- Pushing to any other branch creates a preview deployment with a unique URL
- Preview URLs are posted as comments on GitHub commits automatically

### 6.4 Production URLs

|                    |                                                                    |
|--------------------|--------------------------------------------------------------------|
|**Primary domain**  |https://xcursionstudios.com                                         |
|**Vercel alias**    |https://xcursion-studios-website.vercel.app                         |
|**Vercel dashboard**|https://vercel.com/xcursionstudios-projects/xcursion-studios-website|

-----

## 7. Git Branch Strategy

|Branch                    |Purpose                                                 |
|--------------------------|--------------------------------------------------------|
|`production`              |Live site — deploys to xcursionstudios.com on every push|
|`dev` / `main` / any other|Preview deployment — unique URL on every push           |

**Recommended workflow:**

1. Work on `dev` branch
1. Push to get a preview URL and test
1. Merge to `production` when ready to go live

-----

## 8. Design System

### 8.1 CSS Variables

|Variable        |Value                      |
|----------------|---------------------------|
|`--cream`       |`#ede8e0`                  |
|`--cream-dim`   |`rgba(237,232,224,0.5)`    |
|`--cream-faint` |`rgba(237,232,224,0.2)`    |
|`--white`       |`#f8f4ee`                  |
|`--black`       |`#07060d`                  |
|`--font-display`|`Cormorant Garamond, serif`|
|`--font-sc`     |`Cormorant SC, serif`      |
|`--font-mono`   |`DM Mono, monospace`       |

### 8.2 Background

The background image is stored at `public/bg.png` and served via the `.bg-layer` CSS class as a fixed full-viewport layer. The grain animation (`.bg-grain`) uses an inline SVG `feTurbulence` filter animated across 5 random offsets at 0.4s intervals for a film grain effect.

### 8.3 Custom Cursor

The `Cursor` component uses `requestAnimationFrame` for smooth lag interpolation on the ring element. The dot snaps directly to mouse position; the ring follows at 10% per frame (0.1 lerp factor). On hover over links and buttons both elements scale up.

-----

## 9. Common Issues & Fixes

|Issue                           |Fix                                                                     |
|--------------------------------|------------------------------------------------------------------------|
|Studio shows “Tool not found”   |Ensure `basePath: "/studio"` is set in `sanity.config.ts`               |
|Studio auth fails               |Add your domain to Sanity CORS origins with credentials enabled         |
|Vercel not detecting Next.js    |Check `vercel.json` has `"framework": "nextjs"`                         |
|Sub-pages not scrolling         |Ensure `body` has no `overflow:hidden` — only `.scroll-container` should|
|`npm run dev` fails with ENOENT |Wrong directory — `cd xcursion-studios-website` first                   |
|Sanity data not showing         |Check project ID in `src/sanity/config.ts` matches `sanity.io/manage`   |
|Build fails with prerender error|Add `export const dynamic = 'force-dynamic'` to the affected page       |
|Cloudflare domain not resolving |Ensure proxy is disabled (grey cloud) in Cloudflare DNS settings        |