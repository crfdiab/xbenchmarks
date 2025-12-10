# XBenchmarks - Visual Architecture & Data Flow Diagrams

## 1. Site Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         XBenchmarks                              │
│                    Minimal & Primitive Design                    │
└─────────────────────────────────────────────────────────────────┘

                              ▼

┌────────────────────┬────────────────────┬────────────────────┐
│   Hugo v0.152.2    │  Content Adapters  │   Static Assets    │
│   Build Engine     │   (_content.gotmpl)│   (CSS + JS)       │
└────────────────────┴────────────────────┴────────────────────┘

                              ▼

┌──────────────────────────────────────────────────────────────┐
│  data/laptops.json    data/cpus.json    data/gpus.json       │
│  (5000+ entries)      (6000+ entries)   (2000+ entries)      │
└──────────────────────────────────────────────────────────────┘

                              ▼

┌──────────────────────────────────────────────────────────────┐
│         13,000+ Static HTML Pages Generated                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐              │
│  │ 5000+      │  │ 6000+      │  │ 2000+      │              │
│  │ Laptop     │  │ CPU        │  │ GPU        │              │
│  │ Pages      │  │ Pages      │  │ Pages      │              │
│  └────────────┘  └────────────┘  └────────────┘              │
└──────────────────────────────────────────────────────────────┘

                              ▼

                    public/ (build output)
                    - Ready to deploy
                    - All static files
                    - Zero runtime dependencies
```

---

## 2. Content Generation Flow

```
INPUT: JSON Data Files
│
│  data/laptops.json ────────┐
│  data/cpus.json ───────┐   │
│  data/gpus.json ─┐     │   │
│                  │     │   │
│                  ▼     ▼   ▼
│         Content Adapters (_content.gotmpl)
│                  │
│  ┌───────────────┼───────────────┐
│  │               │               │
│  ▼               ▼               ▼
│  Laptops →     CPUs →         GPUs →
│  Adapter       Adapter         Adapter
│  │             │               │
│  ▼             ▼               ▼
│  Creates:     Creates:        Creates:
│  Path:        Path:           Path:
│  /laptop-     /cpus/cpu-      /gpus/gpu-
│  brands/*/    vendors/-cpus/  vendors/-gpus/
│               │               │
│  Layout:      Layout:         Layout:
│  laptop-      cpu-            gpu-
│  single.html  single.html     single.html
│
└─────────────────┬─────────────────┘
                  │
                  ▼
            Hugo Build Process
                  │
                  ▼
            public/ folder
         (13,000+ HTML files)
```

---

## 3. Page Structure Template

```
┌────────────────────────────────────────────────────────────────┐
│                         baseof.html                             │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Header & Navigation                   │  │
│  │  [XBENCHMARKS] [Home] [Laptops] [CPUs] [GPUs]           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │    {{ block "main" . }}{{ end }}                         │  │
│  │                                                            │  │
│  │    ↓ Replaced by:                                        │  │
│  │    - laptop-single.html                                 │  │
│  │    - cpu-single.html                                    │  │
│  │    - gpu-single.html                                    │  │
│  │    - index.html                                         │  │
│  │                                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Footer & Scripts                             │  │
│  │  © 2025 XBenchmarks | <script>configurator.js</script> │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

---

## 4. Laptop Page Data Flow

```
Laptop Page Request
│
▼ laptop-single.html (template)
│
├─ Laptop Data (from params)
│  ├─ Image URL
│  ├─ Model Name & Price
│  ├─ Battery Info
│  └─ Configurations (CPU/GPU IDs)
│
├─ CPU Data (from window.cpusData)
│  ├─ Benchmarks (Geekbench, Passmark)
│  ├─ Specifications (cores, TDP, etc.)
│  └─ Links to CPU pages
│
├─ GPU Data (from window.gpusData)
│  ├─ Gaming FPS
│  ├─ Specifications (memory, TGP, etc.)
│  └─ Links to GPU pages
│
▼ Render HTML Page
│
├─ Display Sections:
│  ├─ Laptop Image & Basic Info
│  ├─ Specifications Grid
│  ├─ Configuration Options
│  ├─ Performance Calculator
│  │  ├─ CPU Selector
│  │  ├─ GPU Selector
│  │  └─ Dynamic Score Bars
│  └─ Related Components
│
▼ Attach Event Listeners (JavaScript)
│
├─ CPU selector change → recalculateScores()
├─ GPU selector change → recalculateScores()
└─ Initial calculation on page load
│
▼ User Interacts
│
├─ Selects new CPU
│  └─ JavaScript calculates new performance score
│
├─ Selects new GPU
│  ├─ JavaScript calculates new gaming score
│  └─ JavaScript recalculates battery score
│
└─ Score bars animate to new values

OUTPUT: Interactive Laptop Page
```

---

## 5. Score Calculation Flow

```
User Changes CPU/GPU Selection
│
▼ Event Listener Triggered
│
├─ Get selected CPU ID
├─ Get selected GPU ID
├─ Fetch CPU data from window.cpusData
└─ Fetch GPU data from window.gpusData

PARALLEL CALCULATIONS:
│
├─ calculatePerformanceScore(cpu)
│  ├─ Extract Geekbench v6 metrics
│  ├─ Average metric values
│  ├─ Normalize to 0-100 scale
│  └─ Return score (0-100)
│
├─ calculateGamingScore(gpu)
│  ├─ Get 1080p High FPS from GPU data
│  ├─ Formula: (FPS / 60) * 100
│  ├─ Cap at 100
│  └─ Return score (0-100)
│
└─ calculateBatteryScore(cpu, gpu, laptop)
   ├─ Get CPU TDP
   ├─ Get GPU TGP
   ├─ Get Battery Wh
   ├─ Formula:
   │  Total Power = CPU_TDP + GPU_TGP + 10
   │  Hours = Battery_Wh / Total_Power
   │  Score = (Hours / 12) * 100
   └─ Return score (0-100)

UPDATE DOM:
│
├─ updateScoreDisplay('perf-score', 'perf-fill', performanceScore)
│  ├─ Set text: performanceScore
│  └─ Set bar width: performanceScore%
│
├─ updateScoreDisplay('game-score', 'game-fill', gamingScore)
│  ├─ Set text: gamingScore
│  └─ Set bar width: gamingScore%
│
└─ updateScoreDisplay('batt-score', 'batt-fill', batteryScore)
   ├─ Set text: batteryScore
   └─ Set bar width: batteryScore% (with animation)

VISUAL RESULT:
│
└─ Performance: ████░░░░░░ 40
   Gaming:      ██████░░░░ 60
   Battery:     ████████░░ 80
```

---

## 6. Internal Linking Architecture

```
Homepage (/)
│
├─ Browse Laptops Link
│  └─ /laptop-brands/
│     ├─ /acer/acer-aspire-14/
│     │  ├─ Links to: /cpus/cpu-vendors/-cpus/intel-core-5-120u/
│     │  │  └─ Contains: "Laptops with this CPU"
│     │  │     └─ Links back to /acer/acer-aspire-14/
│     │  │
│     │  └─ Links to: /gpus/gpu-vendors/-gpus/intel-iris-xe/
│     │     └─ Contains: "Laptops with this GPU"
│     │        └─ Links back to /acer/acer-aspire-14/
│     │
│     └─ /apple/macbook-pro-16/
│        ├─ Links to: /cpus/.../
│        └─ Links to: /gpus/.../
│
├─ Browse CPUs Link
│  └─ /cpus/cpu-vendors/-cpus/
│     ├─ /intel-core-5-120u/
│     │  └─ "Laptops with this CPU"
│     │     ├─ /acer/acer-aspire-14/
│     │     ├─ /acer/acer-aspire-14-ai/
│     │     └─ ... (all laptops with this CPU)
│     │
│     └─ /amd-ryzen-5-7520u/
│        └─ "Laptops with this CPU"
│           └─ ... (all laptops with this CPU)
│
└─ Browse GPUs Link
   └─ /gpus/gpu-vendors/-gpus/
      ├─ /intel-iris-xe/
      │  └─ "Laptops with this GPU"
      │     └─ ... (all laptops with this GPU)
      │
      └─ /nvidia-rtx-4060/
         └─ "Laptops with this GPU"
            └─ ... (all laptops with this GPU)

Bidirectional Links:
Laptop ↔ CPU ↔ Laptop
Laptop ↔ GPU ↔ Laptop
CPU ↔ Laptop ↔ GPU
```

---

## 7. Design System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     COLOR PALETTE                             │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Primary:      ████ #000000 (Black)                          │
│  Text:         ████ #000000 (Black)                          │
│  Background:   ████ #FFFFFF (White)                          │
│  Accent:       ████ #0066CC (Blue)                           │
│  Borders:      ████ #CCCCCC (Light Gray)                     │
│  Cards BG:     ████ #FAFAFA (Off-White)                      │
│                                                                │
└──────────────────────────────────────────────────────────────┘

TYPOGRAPHY HIERARCHY:

h1 {                          h2 {                     h3 {
  font-size: 2rem;              font-size: 1.5rem;       font-size: 1.25rem;
  font-weight: bold;            font-weight: bold;       font-weight: bold;
  border-bottom: 2px solid;     border-bottom: 2px;      border-bottom: 2px;
  font-family:                  font-family:             font-family:
    Courier New                   Courier New              Courier New
    (monospace)                   (monospace)              (monospace)
}                             }                        }

p { font-size: 1rem; line-height: 1.6; }

BUTTONS:

.btn {
  background: #000;
  color: white;
  border: 2px solid #000;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  
  &:hover {
    background: white;
    color: #000;
  }
}

CARDS:

.spec-card {
  border: 2px solid #ccc;
  padding: 1.5rem;
  background: #fafafa;
  
  &:hover {
    border-color: #000;
    box-shadow: 2px 2px 0 #000;
  }
}

FORMS:

select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ccc;
  font-family: Courier New;
  
  &:hover, &:focus {
    border-color: #000;
  }
}
```

---

## 8. File Dependency Graph

```
baseof.html (Base Template)
│
├─ laptop-single.html
│  ├─ Uses: window.laptopData
│  ├─ Uses: window.cpusData
│  ├─ Uses: window.gpusData
│  └─ Includes: /js/configurator.js
│
├─ cpu-single.html
│  ├─ Uses: window.cpusData
│  ├─ Uses: window.laptopData
│  └─ Includes: /js/configurator.js
│
├─ gpu-single.html
│  ├─ Uses: window.gpusData
│  ├─ Uses: window.laptopData
│  └─ Includes: /js/configurator.js
│
└─ index.html
   ├─ Uses: .Site.Data.laptops
   ├─ Uses: .Site.Data.cpus
   ├─ Uses: .Site.Data.gpus
   └─ Includes: /js/configurator.js

style.css (Global Stylesheet)
├─ Applied to: All pages
├─ Media Queries:
│  ├─ @media (max-width: 768px)
│  └─ @media (max-width: 480px)
└─ CSS Variables:
   ├─ --primary-color
   ├─ --secondary-color
   ├─ --accent-color
   └─ --spacing-unit

configurator.js (Score Calculator)
├─ DOMContentLoaded Event
├─ Event Listeners:
│  ├─ #cpu-select change
│  ├─ #gpu-select change
│  └─ Initial calculation
└─ DOM Updates:
   ├─ #perf-score, #perf-fill
   ├─ #game-score, #game-fill
   └─ #batt-score, #batt-fill

hugo.toml (Configuration)
├─ Activates: Content adapters
├─ Defines: Site structure
├─ Sets: Build options
└─ Configures: Menu items
```

---

## 9. Build Process Timeline

```
START: hugo command
  │
  ├─ Read hugo.toml (configuration)
  │
  ├─ Load data files:
  │  ├─ data/laptops.json (286K lines)
  │  ├─ data/cpus.json (80K lines)
  │  └─ data/gpus.json (~30K lines)
  │
  ├─ Process content adapters:
  │  ├─ content/_content.gotmpl
  │  │  └─ Generate 5,000+ laptop pages
  │  ├─ content/cpus/_content.gotmpl
  │  │  └─ Generate 6,000+ CPU pages
  │  └─ content/gpus/_content.gotmpl
  │     └─ Generate 2,000+ GPU pages
  │
  ├─ Render templates:
  │  ├─ layouts/_default/baseof.html
  │  ├─ layouts/_default/laptop-single.html
  │  ├─ layouts/_default/cpu-single.html
  │  ├─ layouts/_default/gpu-single.html
  │  └─ layouts/index.html
  │
  ├─ Process static assets:
  │  ├─ static/css/style.css → public/css/
  │  └─ static/js/configurator.js → public/js/
  │
  ├─ Generate indexes:
  │  ├─ public/index.xml
  │  └─ public/sitemap.xml
  │
  └─ Output Statistics:
     ├─ Total Pages: 13,000+
     ├─ Build Time: ~110ms
     ├─ CSS Size: ~35KB
     ├─ JS Size: ~4KB
     └─ Status: SUCCESS ✓

END: public/ folder ready for deployment
```

---

## 10. Mobile Responsiveness Breakpoints

```
Desktop (> 768px)
┌────────────────────────────────────┐
│ [NAV LOGO]  [NAV LINKS HORIZONTAL] │
├────────────────────────────────────┤
│                                    │
│   [IMAGE 300px]  [INFO]            │
│                                    │
│  ┌───────────┬───────────┐         │
│  │ Specs Gr1 │ Specs Gr2 │         │
│  ├───────────┼───────────┤         │
│  │ Specs Gr3 │ Specs Gr4 │         │
│  └───────────┴───────────┘         │
│                                    │
└────────────────────────────────────┘

Tablet (768px - 480px)
┌──────────────────────┐
│[NAV LOGO]  [MENU ☰]  │
├──────────────────────┤
│   [IMAGE]            │
│   [INFO]             │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ Specs (1 column) │ │
│ ├──────────────────┤ │
│ │ Specs (1 column) │ │
│ └──────────────────┘ │
└──────────────────────┘

Mobile (< 480px)
┌──────────┐
│[LOGO ☰]  │
├──────────┤
│ [IMAGE]  │
│ [INFO]   │
├──────────┤
│ [Spec]   │
├──────────┤
│ [Spec]   │
├──────────┤
│ [Calc]   │
└──────────┘
```

---

## 11. Technology Stack Pyramid

```
                    ┌───────────────┐
                    │   Browsers    │
                    │ (Display HTML)│
                    └───────────────┘
                           △
                           │
        ┌──────────────────┴──────────────────┐
        │                                      │
   ┌────▼─────┐                         ┌─────▼────┐
   │    CSS   │                         │ JavaScript│
   │ (Styling)│                         │ (Behavior)│
   └──────────┘                         └───────────┘
        △                                     △
        │                                     │
        └──────────────┬──────────────────────┘
                       │
            ┌──────────▼──────────┐
            │   HTML Templates    │
            │ (Layout Structure)  │
            └─────────────────────┘
                       △
                       │
            ┌──────────▼──────────┐
            │   Go Templates      │
            │  (Hugo v0.152.2)    │
            └─────────────────────┘
                       △
                       │
              ┌────────▼─────────┐
              │  JSON Data Files │
              │ (Content Source) │
              └──────────────────┘
                       △
                       │
            ┌──────────▼──────────┐
            │  Content Adapters   │
            │ (_content.gotmpl)   │
            └─────────────────────┘
```

---

## 12. User Interface Components Map

```
COMPONENT HIERARCHY:

Page
├─ Header
│  ├─ Logo
│  └─ Navigation Menu
│     ├─ Home
│     ├─ Laptops
│     ├─ CPUs
│     └─ GPUs
│
├─ Main Content
│  ├─ Hero Section (homepage only)
│  │  ├─ Title
│  │  └─ Subtitle
│  │
│  ├─ Browse Cards (homepage only)
│  │  ├─ Laptop Card
│  │  ├─ CPU Card
│  │  └─ GPU Card
│  │
│  ├─ Statistics (homepage only)
│  │  ├─ Laptop Count
│  │  ├─ CPU Count
│  │  └─ GPU Count
│  │
│  ├─ Component Header (detail pages)
│  │  ├─ Image
│  │  └─ Basic Info
│  │
│  ├─ Specifications Section
│  │  ├─ Spec Cards (grid)
│  │  │  ├─ List of specs
│  │  │  └─ Hover effects
│  │  └─ Configuration Options
│  │
│  ├─ Configurator Section (laptop only)
│  │  ├─ CPU Selector
│  │  ├─ GPU Selector
│  │  └─ Score Display
│  │     ├─ Performance Bar
│  │     ├─ Gaming Bar
│  │     └─ Battery Bar
│  │
│  ├─ Benchmarks Section (CPU/GPU)
│  │  └─ Benchmark Table
│  │     ├─ Metric Name
│  │     └─ Score Value
│  │
│  └─ Related Section
│     └─ Related Grid
│        ├─ Related Card 1
│        ├─ Related Card 2
│        └─ ... (n cards)
│
└─ Footer
   └─ Copyright Info
```

---

**Generated**: December 10, 2025  
**Status**: ✅ Complete with Visual Documentation  
**Implementation**: Fully Functional
