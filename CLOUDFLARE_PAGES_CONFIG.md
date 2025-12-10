# Cloudflare Pages Build Configuration

## Build Settings
- **Build Command**: `hugo`
- **Output Directory**: `public`
- **Node Version**: 18+ (recommended)

## Environment Variables
You can set the following environment variables in Cloudflare Pages dashboard:

- `HUGO_VERSION`: Set to your desired Hugo version (optional, defaults to latest)

## Deployment

### Via GitHub (Recommended)
1. Connect your GitHub repository to Cloudflare Pages
2. Set your build command to: `hugo`
3. Set your output directory to: `public`
4. Deploy!

### Via Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy public
```

## Notes
- The `public/` directory is automatically excluded from git via `.gitignore`
- Hugo will generate the static site during the build process
- No additional Node.js dependencies are required
