# XBenchmarks Quick Start Guide

## 🚀 Get Started in 30 Seconds

### 1. Start the Development Server
```powershell
cd "d:\The Laptops Shop\Rebuilding\fresh_start\v2\xbenchmarks"
hugo server -D
```

### 2. Open in Browser
Visit: **http://localhost:1313**

### 3. Explore the Site
- **Homepage**: Main landing page with statistics
- **Laptops**: Click "Browse Laptops" to see laptop pages
- **CPUs**: Click "Browse CPUs" to see processor pages  
- **GPUs**: Click "Browse GPUs" to see graphics card pages

---

## 📱 What You'll See

### Homepage
- Title: "XBenchmarks"
- Description: "Compare laptops, CPUs, and GPUs with detailed specifications and benchmarks"
- 3 Browse Cards (Laptops, CPUs, GPUs)
- Statistics showing total counts

### Laptop Pages
- Laptop image and basic info (price, battery)
- Detailed specifications in card layout
- **Interactive Configurator** section with:
  - CPU selector dropdown
  - GPU selector dropdown
  - Real-time performance scores
  - Score bars that animate

### CPU Pages
- Processor specifications
- Benchmark metrics
- List of laptops with this CPU
- Links to related GPUs

### GPU Pages
- Graphics card specifications
- Gaming performance (FPS at various settings)
- List of laptops with this GPU
- Links to related CPUs

---

## 🎮 Try the Interactive Features

1. **Go to any laptop page**
2. **Scroll to "Performance Calculator"**
3. **Change the CPU selector** → Scores update instantly
4. **Change the GPU selector** → All scores recalculate
5. **Watch the score bars animate** to new values

---

## 📁 Key Files to Know

| File | Purpose | Edit for |
|------|---------|----------|
| `static/css/style.css` | All styling | Colors, fonts, layout |
| `static/js/configurator.js` | Score calculation | Calculation formulas |
| `hugo.toml` | Site configuration | Title, baseURL, menu |
| `layouts/_default/*.html` | Page layouts | HTML structure |
| `data/*.json` | Content source | Laptop/CPU/GPU data |

---

## 🎨 Customize the Design

### Change Colors
Edit `static/css/style.css`, find `:root`:
```css
:root {
  --primary-color: #000;      /* Change to your color */
  --accent-color: #0066cc;    /* Change link color */
  --bg-color: #fff;           /* Change background */
}
```
Then rebuild: `hugo`

### Change Fonts
In `style.css`, search for `font-family`:
```css
body {
  font-family: 'Courier New', Courier, monospace;
  /* Change to: Arial, Helvetica, Georgia, etc. */
}
```

### Change Layout Spacing
In `style.css`, modify `--spacing-unit`:
```css
:root {
  --spacing-unit: 1rem;  /* Increase or decrease for more/less space */
}
```

---

## 🔧 Customize Performance Scoring

Edit `static/js/configurator.js`:

### CPU Performance Score
```javascript
function calculatePerformanceScore(cpu) {
  // Modify this to change how CPU scores are calculated
  // Current: Based on Geekbench v6 metrics
}
```

### Gaming Score
```javascript
function calculateGamingScore(gpu) {
  // Modify this to change how GPU/gaming scores are calculated
  // Current: Based on 1080p High FPS
}
```

### Battery Life Score
```javascript
function calculateBatteryScore(cpu, gpu, laptop) {
  // Modify this to change battery calculation
  // Current: (CPU_TDP + GPU_TGP + 10W) / Battery_Wh
}
```

---

## 📊 Understanding the Data Structure

### Laptops (`data/laptops.json`)
```json
{
  "1143": {
    "id": 1143,
    "name": "Acer Aspire 14",
    "slug": "acer-aspire-14",
    "image": "https://...",
    "base_price": "699",
    "configurations": {
      "cpus": [
        {"id": "694", "name": "Intel Core i7"}
      ],
      "gpus": [],
      "ram": ["8GB", "16GB", "32GB"],
      "storage": ["256GB", "512GB", "1TB"]
    }
  }
}
```

### CPUs (`data/cpus.json`)
```json
{
  "694": {
    "id": 694,
    "name": "Intel Core i7 9750H",
    "slug": "intel-core-i7-9750h",
    "benchmarks": {
      "geekbench_v6": {
        "metrics": { ... }
      }
    }
  }
}
```

### GPUs (`data/gpus.json`)
```json
{
  "1523": {
    "id": 1523,
    "name": "NVIDIA RTX 3060",
    "slug": "nvidia-rtx-3060",
    "gaming_fps": {
      "average_fps_of_all_games": {
        "1080p_high": "120"
      }
    }
  }
}
```

---

## 🏗️ Building for Production

### Generate Final Build
```powershell
hugo --minify
```

### Output
- All files in `public/` folder
- Ready to deploy anywhere

### Deploy to Hosting
```powershell
# Option 1: Netlify (drag & drop public/ folder)
# Option 2: Copy to web server
# Option 3: Push to GitHub Pages
```

---

## 🧪 Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] Laptop pages display specs
- [ ] CPU pages show benchmarks
- [ ] GPU pages show gaming FPS
- [ ] Configurator dropdown works
- [ ] Scores update when changed
- [ ] Score bars animate smoothly
- [ ] Related items section works
- [ ] Mobile view is responsive
- [ ] All links are not broken
- [ ] Images load correctly

---

## 📝 Edit Site Content

### Update Site Title
`hugo.toml`:
```toml
title = "My New Title"
```

### Update Navigation Menu
`hugo.toml`:
```toml
[[menu.main]]
  name = "New Menu Item"
  url = "/new-page/"
```

### Update Homepage
`layouts/index.html`:
```html
<h1>Your New Title</h1>
<p>Your new description</p>
```

### Add Laptop Data
Edit `data/laptops.json` and add new entry:
```json
{
  "new_id": {
    "id": "new_id",
    "name": "New Laptop Model",
    ...
  }
}
```

---

## 🆘 Troubleshooting

### Build Fails
```powershell
# Clean and rebuild
hugo --cleanDestinationDir

# Show detailed errors
hugo --logLevel debug
```

### Server Won't Start
```powershell
# Stop any existing processes
Stop-Process -Name hugo -Force

# Restart server
hugo server -D
```

### CSS Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check `static/css/style.css` exists
- Rebuild: `hugo`

### JavaScript Not Working
- Open browser console (F12)
- Check for errors
- Verify `static/js/configurator.js` exists

### Pages Not Generating
- Check JSON file syntax (use JSON validator)
- Ensure `_content.gotmpl` exists in correct directory
- Check Hugo version: `hugo version`

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| `README.md` | User documentation |
| `IMPLEMENTATION.md` | Technical summary |
| `COMPLETE_GUIDE.md` | Comprehensive reference |
| `FILE_LISTING.md` | Detailed file manifest |
| `ARCHITECTURE_DIAGRAMS.md` | Visual diagrams |
| `QUICKSTART.md` | This file |

---

## 🔗 Useful Commands

```powershell
# Start development server
hugo server -D

# Build production site
hugo --minify

# List all content
hugo list all

# Check Hugo version
hugo version

# Generate with drafts
hugo --buildDrafts

# Specify config file
hugo -c config.toml

# Change output directory
hugo -d output

# View help
hugo --help
```

---

## 📞 Quick Reference

| Task | How To |
|------|--------|
| Change colors | Edit `:root` in `style.css` |
| Update title | Edit `hugo.toml` `title` |
| Add laptop | Edit `data/laptops.json` |
| Change scoring | Edit `configurator.js` functions |
| Deploy site | Copy `public/` folder to host |
| View site | Visit `http://localhost:1313` |
| Stop server | Press `Ctrl+C` in terminal |
| Rebuild | Type `hugo` in terminal |

---

## ✨ Tips & Tricks

1. **Fast Rebuild**: Hugo rebuilds on file changes automatically
2. **Clear Cache**: Use `--ignoreCache` flag to force full rebuild
3. **Minify**: Use `hugo --minify` for smallest file sizes
4. **Watch Logs**: Terminal shows build messages and errors
5. **Browser DevTools**: Use F12 to inspect and debug
6. **Git Tracking**: Ignore `public/` folder in version control

---

## 🎯 Next Steps

1. ✅ Start the server (`hugo server -D`)
2. ✅ Explore the site
3. ✅ Try the interactive configurator
4. ✅ Customize colors in `style.css`
5. ✅ Build production version (`hugo --minify`)
6. ✅ Deploy to hosting

---

## 🎓 Learn More

- **Hugo Docs**: https://gohugo.io/
- **Go Templates**: https://golang.org/pkg/text/template/
- **CSS Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Current Status**: ✅ Running at http://localhost:1313  
**Build Status**: ✅ Production Ready  
**Last Updated**: December 10, 2025

Happy coding! 🚀
