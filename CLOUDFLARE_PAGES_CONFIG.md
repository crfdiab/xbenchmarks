# Cloudflare Pages Build Configuration

## Build Settings
- **Build Command**: `hugo`
- **Output Directory**: `public`
- **Node Version**: 18+ (recommended)

## Environment Variables
You can set the following environment variables in Cloudflare Pages dashboard:

- `HUGO_VERSION`: Set to your desired Hugo version (optional, defaults to latest)

## Setup Instructions

### Step 1: Connect GitHub Repository
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect your GitHub account and select the `xbenchmarks` repository

### Step 2: Configure Build Settings
In the Cloudflare Pages dashboard, set:
- **Production branch**: `diab_dev` (or your main branch)
- **Build command**: `hugo`
- **Build output directory**: `public`
- **Node.js version**: Leave as default (18+)

### Step 3: Environment Variables (Optional)
If you want to specify Hugo version, add:
- Name: `HUGO_VERSION`
- Value: `extended` or specific version (e.g., `0.120.0`)

### Step 4: Deploy
1. Click "Save and Deploy"
2. Cloudflare Pages will automatically deploy on every push

## Update baseURL
Update your `hugo.toml` to use your Cloudflare Pages domain:

```toml
baseURL = "https://your-project.pages.dev/"
```

## Troubleshooting

### Build fails with Hugo not found
- Ensure Hugo is specified in environment variables if needed
- Cloudflare Pages has Hugo pre-installed by default

### Asset paths are broken
- Make sure `baseURL` in `hugo.toml` matches your Cloudflare Pages domain

### Content not appearing
- Verify `public/` is set as the build output directory
- Check that Hugo build completes successfully in the logs

