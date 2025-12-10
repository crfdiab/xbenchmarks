# XBenchmarks - Hugo Website Implementation

A minimal, primitive-style Hugo website for comparing laptops, CPUs, and GPUs with detailed specifications and benchmarks.

## Features

- **Dynamic Content Generation**: Uses Hugo content adapters to automatically generate pages from JSON data files
- **Three Main Content Types**:
  - **Laptops**: Browse detailed laptop specifications with performance scores
  - **CPUs**: Processor specifications with benchmark metrics
  - **GPUs**: Graphics card specs with gaming performance data

- **Interactive Configurator**: Select different CPU/GPU combinations and see real-time performance score updates
  - Performance Score (CPU-based)
  - Gaming Score (GPU-based)
  - Battery Life Score (combined TDP calculation)

- **Minimal, Primitive Design**: Clean, text-based aesthetic with:
  - Monospace font (Courier New)
  - Simple black borders and dashed lines
  - No heavy graphics or animations
  - Responsive grid layout
  - Accessible, easy-to-read typography

## Project Structure

```
xbenchmarks/
├── content/
│   ├── _content.gotmpl          # Laptop content adapter
│   ├── cpus/
│   │   └── _content.gotmpl      # CPU content adapter
│   └── gpus/
│       └── _content.gotmpl      # GPU content adapter
├── data/
│   ├── cpus.json                # CPU specifications
│   ├── gpus.json                # GPU specifications
│   └── laptops.json             # Laptop models
├── layouts/
│   ├── _default/
│   │   ├── baseof.html          # Base template
│   │   ├── laptop-single.html   # Laptop page layout
│   │   ├── cpu-single.html      # CPU page layout
│   │   └── gpu-single.html      # GPU page layout
│   └── index.html               # Homepage layout
├── static/
│   ├── css/
│   │   └── style.css            # Minimal CSS styling
│   └── js/
│       └── configurator.js      # Dynamic score calculator
└── hugo.toml                    # Hugo configuration
```

## Key Features

### Content Adapters
- Automatically generate pages from JSON data files
- No need for individual markdown files
- Uses Hugo v0.126.0+ `AddPage` feature

### Templates
- **baseof.html**: Base layout with header, navigation, footer
- **laptop-single.html**: Displays laptop specs, images, and interactive configurator
- **cpu-single.html**: Shows processor specs, benchmarks, and related laptops
- **gpu-single.html**: Displays graphics specs, gaming performance, and related laptops
- **index.html**: Homepage with statistics and navigation cards

### Styling
- **Monospace font** for a technical, minimal appearance
- **Simple borders and dashed lines** for visual separation
- **Responsive grid layout** that adapts to mobile devices
- **Score bars** for visual performance indicators
- **Card-based design** for specs and components

### JavaScript
- **configurator.js**: Real-time score calculation when CPU/GPU changes
- Calculates:
  - Performance score from Geekbench metrics
  - Gaming score from GPU FPS data
  - Battery life score from CPU TDP + GPU TGP

## Build & Deploy

### Development
```bash
hugo server -D
```
Visit `http://localhost:1313` to preview the site.

### Production Build
```bash
hugo --minify
```
Output generated in `public/` directory.

## Performance Scoring

### Performance Score
Calculated from Geekbench v6 metrics, normalized to 0-100 scale based on processor specifications.

### Gaming Score
Based on average FPS at 1080p high settings:
- Formula: `(FPS / 60) * 100`
- Capped at 100

### Battery Life Score
Combined calculation using power consumption:
- Total Power = CPU TDP + GPU TGP + 10W (base)
- Battery Hours = Battery Capacity (Wh) / Total Power
- Score = `(Hours / 12) * 100`

## Customization

### Styling
Edit `static/css/style.css` to customize:
- Color scheme (primary color, accent color, background)
- Typography (fonts, sizes)
- Spacing and layout
- Border styles

### Configuration
Edit `hugo.toml` to modify:
- Site title and baseURL
- Navigation menu items
- Pagination settings
- Hugo build parameters

### Calculations
Edit `static/js/configurator.js` to adjust:
- Score calculation formulas
- Weighting factors
- Normalization values

## Data Structure

### Laptops (laptops.json)
```json
{
  "1143": {
    "id": 1143,
    "name": "Laptop Name",
    "slug": "laptop-slug",
    "image": "https://...",
    "base_price": "999",
    "configurations": {
      "cpus": [{"id": "694", "name": "CPU Name"}],
      "gpus": [{"id": "1523", "name": "GPU Name"}],
      "ram": ["16GB", "32GB"],
      "storage": ["512GB", "1024GB"]
    },
    "specs": { ... }
  }
}
```

### CPUs (cpus.json)
```json
{
  "559": {
    "id": 559,
    "name": "CPU Name",
    "slug": "cpu-slug",
    "benchmarks": {
      "geekbench_v6": { "metrics": { ... } },
      "cpu": { "metrics": { ... } },
      "package": { "metrics": { ... } }
    },
    "specs": { ... }
  }
}
```

### GPUs (gpus.json)
```json
{
  "gpu_id": {
    "id": "gpu_id",
    "name": "GPU Name",
    "slug": "gpu-slug",
    "gaming_fps": { "average_fps_of_all_games": { ... } },
    "specs": { ... }
  }
}
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

## License
MIT

## Notes
- Data files are large (CPUs: 80K+ lines, GPUs: similar, Laptops: 286K+ lines)
- Hugo generates static pages for all entries
- No backend required - fully static site
- CSS is minimal for fast loading and easy customization
