# Online Nexus Marketing - Brand System

This folder contains the complete brand system for Online Nexus Marketing.

## Files

| File | Purpose |
|------|---------|
| `BRANDING_GUIDE.md` | Complete brand guidelines documentation |
| `tokens.json` | Machine-readable design tokens (JSON format) |

## Implementation Files

The brand system is implemented across these files:

| File | Purpose |
|------|---------|
| `uno.config.ts` (root) | UnoCSS configuration with all brand tokens |
| `src/styles/brand.css` | CSS custom properties and global styles |

## Quick Start

### 1. Install Dependencies

```bash
npm install -D unocss @unocss/astro @unocss/preset-uno @unocss/preset-icons @iconify-json/lucide
```

### 2. Import Brand Styles

In your Astro layout file:

```astro
---
import '../styles/brand.css';
---
```

### 3. Use Brand Classes

```html
<!-- Buttons -->
<button class="btn-primary">Get Started</button>
<button class="btn-secondary">Learn More</button>

<!-- Cards -->
<div class="card-hover">
  <h3 class="heading-3">Card Title</h3>
  <p class="body">Card content goes here.</p>
</div>

<!-- Typography -->
<h1 class="heading-1">Hero Title</h1>
<p class="body-lg">Large body text</p>

<!-- Layout -->
<section class="section container-brand">
  <div class="grid-features">
    <!-- Feature cards -->
  </div>
</section>
```

## Color Palette

### Primary (Brand Blue)
- **Main**: `#3366FF` - Use for CTAs, links, primary actions
- **Hover**: `#1A4FE8` - Hover states
- **Light**: `#EEF4FF` - Backgrounds

### Secondary (Brand Orange)
- **Main**: `#FF7A0F` - Accent CTAs, highlights
- **Hover**: `#F05E05` - Hover states
- **Light**: `#FFF8ED` - Backgrounds

### Usage in Code

```html
<!-- Using UnoCSS classes -->
<div class="bg-primary-500 text-white">Primary Background</div>
<div class="bg-secondary-500 text-white">Secondary Background</div>

<!-- Using CSS variables -->
<div style="background: var(--color-primary)">Custom styling</div>
```

## Typography

### Font Families
- **Primary**: Inter (headings and body)
- **Mono**: JetBrains Mono (code)

### Heading Classes
```html
<h1 class="heading-1">Display Title (60px)</h1>
<h2 class="heading-2">Section Title (48px)</h2>
<h3 class="heading-3">Subsection (36px)</h3>
<h4 class="heading-4">Card Title (30px)</h4>
```

### Body Classes
```html
<p class="body-lg">Large body text (18px)</p>
<p class="body">Regular body text (16px)</p>
<p class="body-sm">Small text (14px)</p>
```

## Component Shortcuts

### Buttons
- `btn-primary` - Primary blue button
- `btn-secondary` - Secondary orange button
- `btn-outline` - Outline button
- `btn-ghost` - Ghost button (no background)
- `btn-sm` / `btn-lg` - Size variants

### Cards
- `card` - Basic card with shadow
- `card-hover` - Card with hover effect
- `card-bordered` - Card with border instead of shadow

### Layout
- `container-brand` - Max-width container (1280px)
- `section` - Section with vertical padding
- `section-muted` - Section with gray background
- `grid-features` - 3-column responsive grid
- `grid-pricing` - Pricing cards grid

### Badges
- `badge-primary` - Blue badge
- `badge-secondary` - Orange badge
- `badge-success` - Green badge
- `badge-warning` - Yellow badge
- `badge-error` - Red badge

## Spacing

Based on 4px base unit:

```html
<!-- Padding -->
<div class="p-4">16px padding</div>
<div class="p-6">24px padding</div>
<div class="p-8">32px padding</div>

<!-- Margin -->
<div class="mt-8">32px top margin</div>
<div class="mb-12">48px bottom margin</div>

<!-- Gaps -->
<div class="flex gap-4">16px gap</div>
<div class="grid gap-6">24px gap</div>
```

## Animations

```html
<!-- Fade in -->
<div class="animate-fade-in">Content</div>

<!-- Slide up on scroll -->
<div class="animate-slide-up">Content</div>

<!-- Scale in (for modals) -->
<div class="animate-scale-in">Modal</div>

<!-- With delays -->
<div class="animate-slide-up animate-delay-100">First</div>
<div class="animate-slide-up animate-delay-200">Second</div>
<div class="animate-slide-up animate-delay-300">Third</div>
```

## Gradients

```html
<!-- Brand gradient background -->
<div class="bg-gradient-brand">Content</div>

<!-- Gradient text -->
<h1 class="text-gradient-brand">Gradient Title</h1>
```

## Icons

Using Lucide icons via UnoCSS:

```html
<span class="i-lucide-search text-2xl"></span>
<span class="i-lucide-check text-accent-500"></span>
<span class="i-lucide-arrow-right"></span>
```

Browse icons: https://lucide.dev/icons/

## Best Practices

1. **Use shortcuts over individual utilities** - More maintainable
   ```html
   <!-- Good -->
   <button class="btn-primary">Click me</button>
   
   <!-- Avoid -->
   <button class="bg-primary-500 text-white px-6 py-3 rounded-lg...">Click me</button>
   ```

2. **Use semantic color names**
   ```html
   <!-- Good -->
   <div class="bg-primary-500">Primary action</div>
   
   <!-- Avoid -->
   <div class="bg-#3366FF">Blue thing</div>
   ```

3. **Follow the spacing scale**
   - Use `space-4` (16px), `space-6` (24px), `space-8` (32px)
   - Avoid arbitrary values when possible

4. **Consistent component patterns**
   - Cards use `rounded-xl` and `shadow-card`
   - Buttons use `rounded-lg`
   - Inputs use `rounded-lg`

## Need Help?

- **Full Guidelines**: See `BRANDING_GUIDE.md`
- **Design Tokens**: See `tokens.json`
- **UnoCSS Config**: See `uno.config.ts` in root
- **Custom Styles**: See `src/styles/brand.css`

---

**Online Nexus Marketing** - *Growing businesses through digital excellence.*
