# Online Nexus Marketing - Brand Guidelines

> **Version:** 1.0.0  
> **Last Updated:** January 25, 2026  
> **Source:** Figma Design File "online nexus new"

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Border Radius](#border-radius)
6. [Shadows & Elevation](#shadows--elevation)
7. [Animation](#animation)
8. [Component Patterns](#component-patterns)
9. [Usage Examples](#usage-examples)
10. [File Reference](#file-reference)

---

## Brand Overview

Online Nexus Marketing's visual identity is built on a foundation of trust, innovation, and clarity. Our design system emphasizes:

- **Professionalism** - Clean, modern aesthetic that builds client confidence
- **Accessibility** - High contrast ratios and readable typography
- **Consistency** - Unified design tokens across all touchpoints
- **Flexibility** - Adaptable components for various use cases

---

## Color System

### Primary Colors (Brand Blue)

Our primary blue represents trust, reliability, and professionalism.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#EEF4FF` | Light backgrounds, hover states |
| `primary-100` | `#DAE6FF` | Subtle backgrounds |
| `primary-200` | `#BDD3FF` | Border highlights |
| `primary-300` | `#90B5FF` | Inactive states |
| `primary-400` | `#5B8BFF` | Secondary actions |
| `primary-500` | `#3366FF` | **Primary actions, CTAs** |
| `primary-600` | `#1A4FE8` | Hover states |
| `primary-700` | `#1240D4` | Active/pressed states |
| `primary-800` | `#1437AC` | Dark accents |
| `primary-900` | `#163388` | Dark mode primary |
| `primary-950` | `#0F1F54` | Deepest shade |

### Secondary Colors (Brand Orange)

Our secondary orange adds energy and draws attention to key elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary-50` | `#FFF8ED` | Light backgrounds |
| `secondary-100` | `#FFEFD4` | Subtle highlights |
| `secondary-200` | `#FFDBA8` | Border highlights |
| `secondary-300` | `#FFC170` | Decorative elements |
| `secondary-400` | `#FF9B36` | Secondary indicators |
| `secondary-500` | `#FF7A0F` | **Accent CTAs, highlights** |
| `secondary-600` | `#F05E05` | Hover states |
| `secondary-700` | `#C74506` | Active/pressed states |
| `secondary-800` | `#9E370D` | Dark accents |
| `secondary-900` | `#7F300E` | Dark mode secondary |
| `secondary-950` | `#451604` | Deepest shade |

### Accent Colors (Success Green)

Used for positive feedback, success states, and environmental themes.

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-500` | `#22C55E` | Success states, positive indicators |
| `accent-100` | `#DCFCE7` | Success backgrounds |

### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#FAFAFA` | Page background |
| `neutral-100` | `#F5F5F5` | Card backgrounds, muted sections |
| `neutral-200` | `#E5E5E5` | Borders, dividers |
| `neutral-300` | `#D4D4D4` | Input borders |
| `neutral-400` | `#A3A3A3` | Placeholder text |
| `neutral-500` | `#737373` | Muted text |
| `neutral-600` | `#525252` | Secondary text |
| `neutral-700` | `#404040` | Body text |
| `neutral-800` | `#262626` | Heading text |
| `neutral-900` | `#171717` | Primary text |
| `neutral-950` | `#0A0A0A` | Pure black |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#22C55E` | Success messages, confirmations |
| `warning` | `#F59E0B` | Warnings, cautions |
| `error` | `#EF4444` | Errors, destructive actions |
| `info` | `#3B82F6` | Information, tips |

---

## Typography

### Font Families

```css
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px (0.75rem) | 1rem | Captions, labels |
| `text-sm` | 14px (0.875rem) | 1.25rem | Small text, metadata |
| `text-base` | 16px (1rem) | 1.5rem | Body text |
| `text-lg` | 18px (1.125rem) | 1.75rem | Large body text |
| `text-xl` | 20px (1.25rem) | 1.75rem | H6, lead text |
| `text-2xl` | 24px (1.5rem) | 2rem | H5 |
| `text-3xl` | 30px (1.875rem) | 2.25rem | H4 |
| `text-4xl` | 36px (2.25rem) | 2.5rem | H3 |
| `text-5xl` | 48px (3rem) | 1.25 | H2 |
| `text-6xl` | 60px (3.75rem) | 1.2 | H1 |
| `text-7xl` | 72px (4.5rem) | 1.1 | Display |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `font-light` | 300 | Decorative text |
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasized body |
| `font-semibold` | 600 | Subheadings, buttons |
| `font-bold` | 700 | Headings |
| `font-extrabold` | 800 | Display headings |

### Heading Styles

```html
<!-- H1 - Hero headlines -->
<h1 class="heading-1">Transform Your Digital Presence</h1>

<!-- H2 - Section titles -->
<h2 class="heading-2">Our Services</h2>

<!-- H3 - Subsection titles -->
<h3 class="heading-3">Search Engine Optimization</h3>

<!-- H4 - Card titles -->
<h4 class="heading-4">Starter Plan</h4>
```

---

## Spacing System

Our spacing system uses a 4px base unit for consistency.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `space-1` | 0.25rem | 4px | Tight spacing |
| `space-2` | 0.5rem | 8px | Element padding |
| `space-3` | 0.75rem | 12px | Small gaps |
| `space-4` | 1rem | 16px | Standard padding |
| `space-6` | 1.5rem | 24px | Card padding |
| `space-8` | 2rem | 32px | Section gaps |
| `space-12` | 3rem | 48px | Large gaps |
| `space-16` | 4rem | 64px | Section padding |
| `space-20` | 5rem | 80px | Large section padding |
| `space-24` | 6rem | 96px | Hero section padding |

### Common Spacing Patterns

```html
<!-- Card padding -->
<div class="p-6">Card content</div>

<!-- Section spacing -->
<section class="py-16 md:py-24 lg:py-32">Section content</section>

<!-- Grid gaps -->
<div class="grid gap-6">Grid items</div>
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 2px | Subtle rounding |
| `rounded` | 4px | Default rounding |
| `rounded-md` | 6px | Medium rounding |
| `rounded-lg` | 8px | Buttons, inputs |
| `rounded-xl` | 12px | Cards |
| `rounded-2xl` | 16px | Large cards, modals |
| `rounded-3xl` | 24px | Hero sections |
| `rounded-full` | 9999px | Pills, avatars |

---

## Shadows & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | Subtle shadow | Input focus |
| `shadow` | Light shadow | Default elevation |
| `shadow-md` | Medium shadow | Dropdowns |
| `shadow-lg` | Large shadow | Cards on hover |
| `shadow-xl` | Extra large | Modals |
| `shadow-2xl` | Maximum | Floating elements |
| `shadow-card` | Custom | Card elevation |
| `shadow-button` | Custom (blue tint) | Primary buttons |

### Card Shadow

```css
--shadow-card: 0 2px 8px -2px rgb(0 0 0 / 0.08), 
               0 4px 16px -4px rgb(0 0 0 / 0.12);
```

---

## Animation

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Quick interactions |
| `duration-normal` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Complex animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `ease-linear` | linear | Progress bars |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| `ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Default |

### Animation Classes

```html
<!-- Fade in -->
<div class="animate-fade-in">Content</div>

<!-- Slide up on scroll -->
<div class="animate-slide-up">Content</div>

<!-- Scale in (for modals) -->
<div class="animate-scale-in">Modal</div>
```

---

## Component Patterns

### Buttons

```html
<!-- Primary CTA -->
<button class="btn-primary">Get Started</button>

<!-- Secondary action -->
<button class="btn-secondary">Learn More</button>

<!-- Outline variant -->
<button class="btn-outline">Contact Us</button>

<!-- Sizes -->
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary btn-lg">Large</button>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>

<!-- Hoverable card -->
<div class="card-hover">
  <h3>Interactive Card</h3>
  <p>Hover for shadow effect.</p>
</div>

<!-- Bordered card -->
<div class="card-bordered">
  <h3>Bordered Card</h3>
  <p>With border instead of shadow.</p>
</div>
```

### Badges

```html
<span class="badge-primary">New</span>
<span class="badge-secondary">Featured</span>
<span class="badge-success">Active</span>
<span class="badge-warning">Pending</span>
<span class="badge-error">Urgent</span>
```

### Forms

```html
<label class="label">Email Address</label>
<input type="email" class="input" placeholder="you@example.com" />

<!-- Error state -->
<input type="email" class="input input-error" />
```

---

## Usage Examples

### Hero Section

```html
<section class="hero bg-gradient-to-br from-primary-500 to-primary-700">
  <div class="hero-content">
    <h1 class="heading-1 text-white">
      Grow Your Business Online
    </h1>
    <p class="body-lg text-primary-100 mt-6 max-w-2xl mx-auto">
      We help businesses thrive in the digital landscape with 
      data-driven marketing strategies.
    </p>
    <div class="flex-center gap-4 mt-8">
      <button class="btn-secondary btn-lg">Get Started</button>
      <button class="btn bg-white/10 text-white hover:bg-white/20">
        Learn More
      </button>
    </div>
  </div>
</section>
```

### Features Grid

```html
<section class="section">
  <div class="container-brand">
    <h2 class="heading-2 text-center mb-12">Our Services</h2>
    <div class="grid-features">
      <div class="card-hover text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-2xl flex-center mx-auto mb-4">
          <span class="i-lucide-search text-primary-500 text-2xl"></span>
        </div>
        <h3 class="heading-5 mb-2">SEO Optimization</h3>
        <p class="body-sm">Improve your search rankings and drive organic traffic.</p>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</section>
```

### Pricing Cards

```html
<section class="section-muted">
  <div class="container-brand">
    <h2 class="heading-2 text-center mb-12">Simple Pricing</h2>
    <div class="grid-pricing">
      <div class="card">
        <h3 class="heading-5">Starter</h3>
        <div class="mt-4">
          <span class="text-4xl font-bold">$499</span>
          <span class="text-neutral-500">/month</span>
        </div>
        <ul class="mt-6 space-y-3">
          <li class="flex items-center gap-2">
            <span class="i-lucide-check text-accent-500"></span>
            <span>5 Keywords</span>
          </li>
          <!-- More features... -->
        </ul>
        <button class="btn-outline w-full mt-8">Get Started</button>
      </div>
      <!-- More pricing cards... -->
    </div>
  </div>
</section>
```

---

## File Reference

| File | Purpose |
|------|---------|
| `brand/tokens.json` | Design tokens in JSON format (for tooling) |
| `src/styles/brand.css` | CSS custom properties |
| `uno.config.ts` | UnoCSS configuration with all tokens |
| `brand/branding-guide.md` | This documentation |

### Installation

1. Copy files to your Astro project
2. Install dependencies:
   ```bash
   npm install -D unocss @unocss/astro @unocss/preset-uno @unocss/preset-icons
   ```
3. Add UnoCSS to `astro.config.mjs`:
   ```js
   import UnoCSS from '@unocss/astro'
   
   export default defineConfig({
     integrations: [UnoCSS({ injectReset: true })],
   })
   ```
4. Import brand.css in your layout:
   ```astro
   ---
   import '../styles/brand.css'
   ---
   ```

---

## Need Help?

For questions about implementing these brand guidelines, contact the design team.

**Online Nexus Marketing** - *Growing businesses through digital excellence.*