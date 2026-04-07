# Paw & Co. Boutique - GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Click "Deploy" - Vercel handles everything automatically

### Option 2: Deploy to GitHub Pages

Since this is a Next.js app with dynamic features, you'll need to export it as a static site.

#### Step 1: Configure for Static Export

Add to `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

#### Step 2: Build the Static Site

```bash
npm run build
```

This creates an `out` folder with your static site.

#### Step 3: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Go to repository Settings > Pages
4. Select "GitHub Actions" as the source
5. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Admin Panel Access

- URL: `your-domain.com/admin`
- Default Password: `admin123`
- Change password in Settings after first login

## CJ Dropshipping Integration

1. Create account at [cjdropshipping.com](https://cjdropshipping.com)
2. Get API token from [Developer Portal](https://developers.cjdropshipping.com)
3. Add token in Admin > Settings > CJ API Key
4. Import products from Admin > CJ Import

## Product Management

### Adding Products Manually
1. Go to Admin > Products > New Product
2. Fill in product details
3. Add images (paste image URLs)
4. Set CJ Product ID for automatic ordering

### Importing from CJ Dropshipping
1. Go to Admin > CJ Import
2. Search for products or paste product URL
3. Click "Import" to add to your catalog
4. Edit product name and price as needed

### Exporting Products
1. Go to Admin > Settings
2. Click "Export Products"
3. Save the JSON file
4. Upload to `/public/data/products.json` in your repository

## Folder Structure

```
/
├── app/                    # Next.js pages
│   ├── admin/              # Admin panel pages
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── import/
│   │   └── settings/
│   ├── produkt/[id]/       # Product detail page
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── admin/              # Admin components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utilities
│   ├── products.ts         # Product management
│   ├── cj-api.ts           # CJ Dropshipping API
│   └── auth.ts             # Authentication
└── public/
    └── data/
        └── products.json   # Product data
```

## Environment Variables (Optional)

For production, you can add these environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Need Help?

- For CJ Dropshipping API issues, check their [documentation](https://developers.cjdropshipping.com/api2.0/v1/doc.html)
- For Next.js deployment, see [Vercel docs](https://vercel.com/docs)
- For GitHub Pages, see [GitHub docs](https://docs.github.com/pages)
