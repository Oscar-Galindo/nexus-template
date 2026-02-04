# Online Nexus Marketing - Component Build Specifications

> **Designer Handoff Document**  
> **For:** Claude Code Developer  
> **Stack:** Astro v5 + React 18 + TypeScript + UnoCSS + Contentful + Cloudinary + GoHighLevel  
> **Date:** January 2026

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Design Tokens Reference](#design-tokens-reference)
3. [Global Components](#global-components)
4. [Homepage Sections](#homepage-sections)
5. [Standard Page Sections](#standard-page-sections)
6. [Contentful Integration](#contentful-integration)
7. [Responsive Breakpoints](#responsive-breakpoints)
8. [Animation Specifications](#animation-specifications)

---

## Project Structure

```
src/
├── components/
│   ├── global/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.tsx          # React (mobile menu interactivity)
│   │   ├── Button.astro
│   │   ├── Container.astro
│   │   └── Logo.astro
│   ├── sections/
│   │   ├── HeroSection.astro
│   │   ├── ServicesGrid.astro
│   │   ├── HowItWorks.astro
│   │   ├── StatsSection.astro
│   │   ├── TestimonialsCarousel.tsx  # React (carousel interactivity)
│   │   ├── CaseStudyFeature.astro
│   │   ├── PricingPreview.astro
│   │   ├── CTASection.astro
│   │   └── TrustLogos.astro
│   ├── cards/
│   │   ├── ServiceCard.astro
│   │   ├── StepCard.astro
│   │   ├── StatCard.astro
│   │   ├── TestimonialCard.astro
│   │   └── PricingCard.astro
│   └── ui/
│       ├── Badge.astro
│       ├── Icon.astro
│       └── Image.astro            # Cloudinary wrapper
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/
│   ├── index.astro                # Homepage
│   ├── about.astro
│   ├── pricing.astro
│   └── how-it-works.astro
├── lib/
│   ├── contentful.ts              # Contentful client
│   ├── cloudinary.ts              # Cloudinary helpers
│   └── gohighlevel.ts             # GHL form handlers
└── styles/
    └── brand.css                  # Design tokens (already provided)
```

---

## Design Tokens Reference

All design tokens are defined in `src/styles/brand.css` and `uno.config.ts`. Here's the quick reference:

### Colors (use UnoCSS classes)
```
Primary:    bg-primary-500, text-primary-500, border-primary-500
Secondary:  bg-secondary-500, text-secondary-500, border-secondary-500
Accent:     bg-accent-500, text-accent-500, border-accent-500
Neutral:    bg-neutral-100 through bg-neutral-950
```

### Typography Classes (from uno.config.ts shortcuts)
```
heading-1:  text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
heading-2:  text-4xl md:text-5xl font-bold tracking-tight
heading-3:  text-3xl md:text-4xl font-bold
heading-4:  text-2xl md:text-3xl font-semibold
heading-5:  text-xl md:text-2xl font-semibold
body-lg:    text-lg text-neutral-600 leading-relaxed
body:       text-base text-neutral-600 leading-normal
body-sm:    text-sm text-neutral-500
```

### Spacing
```
Section padding:  py-16 md:py-24 lg:py-32
Card padding:     p-6 md:p-8
Container:        max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16
Grid gaps:        gap-6 md:gap-8
```

---

## Global Components

### 1. Header (`components/global/Header.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]          [Nav Links]                    [CTA Button]    │
│                  Home | About | Pricing | How It Works          │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Height:** `h-20` (80px)
- **Background:** `bg-white/90 backdrop-blur-md` (glassmorphism)
- **Position:** `fixed top-0 left-0 right-0 z-50`
- **Shadow on scroll:** Add `shadow-sm` when `scrollY > 20`
- **Container:** `container-brand` (max-w-1280px centered)

**Logo:**
- Size: `h-10` (40px height)
- Text fallback: "Online Nexus" in `font-bold text-xl text-primary-600`

**Nav Links:**
- Class: `nav-link` (text-neutral-600 hover:text-primary-500 font-medium)
- Spacing: `gap-8`
- Active state: `nav-link-active` (text-primary-500 font-semibold)

**CTA Button:**
- Class: `btn-primary btn-sm`
- Text: "Get Started" or "Free Consultation"

**Mobile (< md):**
- Hide nav links, show hamburger icon
- Use `Navigation.tsx` React component for mobile menu
- Mobile menu: Full-screen overlay with `bg-white` and slide-in animation

**Contentful Fields:** `navigation` model
```typescript
interface Navigation {
  logo: Asset;
  navLinks: Array<{ label: string; url: string }>;
  ctaText: string;
  ctaUrl: string;
}
```

---

### 2. Footer (`components/global/Footer.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Logo]              [Services]    [Company]    [Contact]       │
│  Tagline text        - SEO         - About      - Email         │
│                      - PPC         - Blog       - Phone         │
│  [Social Icons]      - Social      - Careers    - Address       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © 2026 Online Nexus Marketing. All rights reserved.  [Legal]  │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-neutral-900`
- **Text color:** `text-neutral-300` (body), `text-white` (headings)
- **Padding:** `py-16 md:py-20`
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12`

**Column Headings:**
- Class: `text-white font-semibold text-lg mb-4`

**Links:**
- Class: `text-neutral-400 hover:text-white transition-colors duration-fast`
- Spacing: `space-y-3`

**Social Icons:**
- Size: `w-10 h-10`
- Style: `bg-neutral-800 hover:bg-primary-500 rounded-lg flex-center transition-colors`

**Bottom Bar:**
- Border: `border-t border-neutral-800 mt-12 pt-8`
- Layout: `flex-between` (copyright left, legal links right)

---

### 3. Button (`components/ui/Button.astro`)

**Props:**
```typescript
interface Props {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}
```

**Variants (from uno.config.ts):**
```
btn-primary:  bg-primary-500 text-white shadow-button hover:bg-primary-600
btn-secondary: bg-secondary-500 text-white hover:bg-secondary-600
btn-outline:  bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white
btn-ghost:    bg-transparent text-primary-500 hover:bg-primary-50
```

**Sizes:**
```
btn-sm: px-4 py-2 text-sm
btn (default): px-6 py-3 text-base
btn-lg: px-8 py-4 text-lg
```

**Hover effect:** `transform hover:-translate-y-0.5 transition-all duration-fast`

---

### 4. Container (`components/global/Container.astro`)

```astro
---
interface Props {
  size?: 'default' | 'narrow' | 'wide';
  class?: string;
}
const { size = 'default', class: className } = Astro.props;

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-[1280px]',
  wide: 'max-w-[1440px]'
};
---

<div class:list={[
  sizes[size],
  'mx-auto px-4 md:px-8 lg:px-16',
  className
]}>
  <slot />
</div>
```

---

## Homepage Sections

### Section 1: Hero (`components/sections/HeroSection.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    [Badge: "Marketing Agency"]                  │
│                                                                 │
│              Grow Your Business With                            │
│              Data-Driven Marketing                              │
│                                                                 │
│         We help businesses thrive in the digital                │
│         landscape with proven marketing strategies.             │
│                                                                 │
│            [Get Started]     [Watch Demo ▶]                     │
│                                                                 │
│                    ↓ Scroll indicator                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Height:** `min-h-[90vh]` with `flex items-center`
- **Background:** Gradient `bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900`
- **Decorative shapes:** 
  - Top-right: `absolute -top-20 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl`
  - Bottom-left: `absolute -bottom-32 -left-32 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl`
- **Content alignment:** `text-center`

**Badge:**
- Class: `badge bg-white/20 text-white backdrop-blur-sm mb-6`

**Headline:**
- Class: `heading-1 text-white mb-6`
- Consider animated text reveal (fade-up on load)

**Subheadline:**
- Class: `body-lg text-primary-100 max-w-2xl mx-auto mb-8`

**CTAs:**
- Layout: `flex flex-col sm:flex-row gap-4 justify-center`
- Primary: `btn-secondary btn-lg` (orange stands out on blue)
- Secondary: `btn bg-white/10 text-white hover:bg-white/20 btn-lg`

**Scroll Indicator:**
- Class: `absolute bottom-8 left-1/2 -translate-x-1/2`
- Animated chevron: `animate-bounce`

**Contentful Fields:** `heroSection` model
```typescript
interface HeroSection {
  headline: string;
  subheadline: string;
  backgroundImage?: Asset;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}
```

---

### Section 2: Services Grid (`components/sections/ServicesGrid.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    What We Do Best                              │
│         Comprehensive digital marketing solutions               │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│   │   [Icon]    │  │   [Icon]    │  │   [Icon]    │            │
│   │   SEO       │  │   PPC       │  │   Social    │            │
│   │   Desc...   │  │   Desc...   │  │   Desc...   │            │
│   │   [Arrow→]  │  │   [Arrow→]  │  │   [Arrow→]  │            │
│   └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│   │   Content   │  │   Email     │  │   Analytics │            │
│   └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-white` (section)
- **Padding:** `section` (py-16 md:py-24 lg:py-32)

**Section Header:**
- Headline: `heading-2 text-center mb-4`
- Subheadline: `body-lg text-center max-w-2xl mx-auto mb-12`

**Grid:**
- Class: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`

**Service Card (`components/cards/ServiceCard.astro`):**
```
┌─────────────────────────────┐
│  ┌──────┐                   │
│  │ Icon │   → (hover arrow) │
│  └──────┘                   │
│                             │
│  Service Title              │
│                             │
│  Short description of the   │
│  service offering...        │
│                             │
└─────────────────────────────┘
```

- Class: `card-hover group`
- Icon container: `w-14 h-14 bg-primary-100 rounded-2xl flex-center mb-4 group-hover:bg-primary-500 transition-colors`
- Icon: `text-primary-600 text-2xl group-hover:text-white transition-colors`
- Title: `heading-5 mb-2`
- Description: `body-sm`
- Arrow: `absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500`

**Contentful Fields:** `contentBlock` model with `blockType: "features"`

---

### Section 3: How It Works (`components/sections/HowItWorks.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    How It Works                                 │
│             Simple steps to grow your business                  │
│                                                                 │
│      ①───────────────②───────────────③───────────────④          │
│                                                                 │
│   ┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐      │
│   │   01   │     │   02   │     │   03   │     │   04   │      │
│   │ Disco- │     │ Strat- │     │ Imple- │     │ Opti-  │      │
│   │  very  │     │  egy   │     │ ment   │     │ mize   │      │
│   └────────┘     └────────┘     └────────┘     └────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-neutral-50` (muted section)
- **Padding:** `section-muted`

**Progress Line:**
- Desktop only: `hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-200`
- Sits behind the step cards

**Grid:**
- Class: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`

**Step Card (`components/cards/StepCard.astro`):**
```
┌─────────────────────────────┐
│       ┌─────────┐           │
│       │   01    │           │
│       └─────────┘           │
│                             │
│       Discovery             │
│                             │
│    We analyze your          │
│    current situation...     │
│                             │
└─────────────────────────────┘
```

- Card: `bg-white rounded-2xl p-6 text-center relative z-10`
- Step number: `w-16 h-16 bg-primary-500 text-white rounded-full flex-center text-xl font-bold mx-auto mb-4`
- Title: `heading-5 mb-2`
- Description: `body-sm`

**Contentful Fields:** `contentBlock` model with `blockType: "steps"`

---

### Section 4: Stats (`components/sections/StatsSection.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████   │
│  ██                                                         ██  │
│  ██   500+        98%          $2M+         150+            ██  │
│  ██   Clients    Success    Revenue      Campaigns          ██  │
│  ██   Served      Rate      Generated     Launched          ██  │
│  ██                                                         ██  │
│  ████████████████████████████████████████████████████████████   │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-gradient-to-r from-primary-600 to-primary-800`
- **Padding:** `py-16 md:py-20`
- **Text color:** `text-white`

**Grid:**
- Class: `grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`

**Stat Card (`components/cards/StatCard.astro`):**
- Value: `text-4xl md:text-5xl font-extrabold text-white mb-1`
  - Use count-up animation (React component for interactivity)
- Suffix: `text-secondary-400` (for +, %, etc.)
- Label: `text-primary-200 text-sm md:text-base`

**Contentful Fields:** `statItem` model
```typescript
interface StatItem {
  value: string;      // "500"
  label: string;      // "Clients Served"
  prefix?: string;    // "$"
  suffix?: string;    // "+"
}
```

---

### Section 5: Testimonials (`components/sections/TestimonialsCarousel.tsx`)

> **Note:** This is a React component for carousel interactivity

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  What Our Clients Say                           │
│                                                                 │
│        ┌─────────────────────────────────────┐                  │
│   [<]  │  "Amazing results! Our traffic      │  [>]             │
│        │   increased by 300% in 6 months."   │                  │
│        │                                     │                  │
│        │   ⭐⭐⭐⭐⭐                          │                  │
│        │                                     │                  │
│        │   [Photo] John Smith               │                  │
│        │           CEO, TechStartup          │                  │
│        └─────────────────────────────────────┘                  │
│                                                                 │
│                      ● ○ ○ ○ ○                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-white`
- **Padding:** `section`

**Testimonial Card (`components/cards/TestimonialCard.astro`):**
```
┌─────────────────────────────────────────┐
│                                         │
│  "Quote text goes here with nice        │
│   typography and proper spacing..."     │
│                                         │
│  ⭐⭐⭐⭐⭐                               │
│                                         │
│  ┌─────┐  John Smith                    │
│  │Photo│  CEO, TechStartup              │
│  └─────┘                                │
│                                         │
└─────────────────────────────────────────┘
```

- Card: `bg-neutral-50 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto`
- Quote: `text-xl md:text-2xl text-neutral-700 leading-relaxed mb-6`
- Quote marks: Use `"` character styled with `text-6xl text-primary-200 absolute -top-4 -left-2`
- Stars: `flex gap-1 text-secondary-500 mb-6`
- Author section: `flex items-center gap-4`
- Photo: `w-14 h-14 rounded-full object-cover`
- Name: `font-semibold text-neutral-900`
- Title: `text-sm text-neutral-500`

**Carousel Controls:**
- Arrows: `w-12 h-12 rounded-full bg-white shadow-md flex-center hover:bg-primary-50 transition-colors`
- Dots: `w-3 h-3 rounded-full bg-neutral-300` active: `bg-primary-500`

**Contentful Fields:** `testimonial` model

---

### Section 6: Case Study Feature (`components/sections/CaseStudyFeature.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────┐  ┌─────────────────────────────────┐ │
│   │                      │  │  Featured Case Study            │ │
│   │                      │  │                                 │ │
│   │   [Project Image]    │  │  How We Helped TechCorp         │ │
│   │                      │  │  Increase Sales by 400%         │ │
│   │                      │  │                                 │ │
│   │                      │  │  Brief description of the       │ │
│   │                      │  │  project and results...         │ │
│   │                      │  │                                 │ │
│   │                      │  │  • +400% Sales                  │ │
│   │                      │  │  • +250% Traffic                │ │
│   │                      │  │  • -30% Ad Spend                │ │
│   │                      │  │                                 │ │
│   │                      │  │  [Read Case Study →]            │ │
│   └──────────────────────┘  └─────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-neutral-50`
- **Padding:** `section-muted`

**Grid:**
- Class: `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`

**Image Side:**
- Container: `relative rounded-2xl overflow-hidden shadow-xl`
- Aspect ratio: `aspect-[4/3]`
- Use Cloudinary for responsive images

**Content Side:**
- Label: `badge-primary mb-4` text: "Featured Case Study"
- Title: `heading-3 mb-4`
- Description: `body-lg mb-6`
- Results list: `space-y-3 mb-8`
  - Each item: `flex items-center gap-3`
  - Checkmark: `w-6 h-6 bg-accent-100 rounded-full flex-center text-accent-600`
  - Text: `font-medium`
- CTA: `btn-primary`

**Contentful Fields:** `contentBlock` model

---

### Section 7: Pricing Preview (`components/sections/PricingPreview.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                 Simple, Transparent Pricing                     │
│                    Choose your growth plan                      │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│   │   Starter   │  │  ★ Growth   │  │   Scale     │            │
│   │             │  │  (Popular)  │  │             │            │
│   │   $499/mo   │  │   $999/mo   │  │  $1,999/mo  │            │
│   │             │  │             │  │             │            │
│   │  • Feature  │  │  • Feature  │  │  • Feature  │            │
│   │  • Feature  │  │  • Feature  │  │  • Feature  │            │
│   │  • Feature  │  │  • Feature  │  │  • Feature  │            │
│   │             │  │             │  │             │            │
│   │ [Get Start] │  │ [Get Start] │  │ [Contact]   │            │
│   └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│                   [See Full Pricing →]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-white`
- **Padding:** `section`

**Grid:**
- Class: `grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start`

**Pricing Card (`components/cards/PricingCard.astro`):**

Regular card:
- Class: `card border border-neutral-200`

Featured/Popular card:
- Class: `card border-2 border-primary-500 relative`
- Badge: `absolute -top-4 left-1/2 -translate-x-1/2 badge-primary`

**Card Structure:**
```
┌─────────────────────────────┐
│  [Popular Badge] (if feat.) │
│                             │
│  Plan Name                  │
│                             │
│  $999                       │
│  /month                     │
│                             │
│  Brief plan description     │
│                             │
│  ─────────────────────────  │
│                             │
│  ✓ Feature one              │
│  ✓ Feature two              │
│  ✓ Feature three            │
│  ✓ Feature four             │
│  ✓ Feature five             │
│                             │
│  [Get Started] (full width) │
│                             │
└─────────────────────────────┘
```

- Plan name: `heading-5 mb-2`
- Price: `text-4xl font-extrabold text-neutral-900`
- Period: `text-neutral-500 text-lg`
- Divider: `border-t border-neutral-200 my-6`
- Features list: `space-y-3 mb-8`
  - Each: `flex items-start gap-3`
  - Check icon: `text-accent-500 mt-0.5`
  - Text: `text-neutral-600`
- Button: `btn-primary w-full` (featured) or `btn-outline w-full` (regular)

**See Full Pricing Link:**
- Class: `text-center mt-8`
- Link: `link font-medium`

**Contentful Fields:** `pricingTier` model

---

### Section 8: Bottom CTA (`components/sections/CTASection.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████████████████████████████████████████████   │
│  ██                                                         ██  │
│  ██             Ready to Grow Your Business?                ██  │
│  ██                                                         ██  │
│  ██        Let's create a custom marketing strategy         ██  │
│  ██              that drives real results.                  ██  │
│  ██                                                         ██  │
│  ██        [Schedule Free Consultation]   [Call Us]         ██  │
│  ██                                                         ██  │
│  ████████████████████████████████████████████████████████████   │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-gradient-to-br from-secondary-500 via-secondary-600 to-secondary-700`
- **Padding:** `py-20 md:py-28`
- **Text alignment:** `text-center`

**Content Container:**
- Class: `max-w-3xl mx-auto`

**Headline:**
- Class: `heading-2 text-white mb-4`

**Subheadline:**
- Class: `body-lg text-secondary-100 mb-8`

**CTAs:**
- Layout: `flex flex-col sm:flex-row gap-4 justify-center`
- Primary: `btn bg-white text-secondary-600 hover:bg-neutral-100 btn-lg`
- Secondary: `btn bg-secondary-700/50 text-white hover:bg-secondary-700 btn-lg`

**Contentful Fields:** Reuse `heroSection` model

---

### Section 9: Trust Logos (`components/sections/TrustLogos.astro`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                   Trusted by 500+ Companies                     │
│                                                                 │
│   [Logo]   [Logo]   [Logo]   [Logo]   [Logo]   [Logo]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Background:** `bg-white`
- **Padding:** `py-12 md:py-16`
- **Border:** `border-t border-neutral-100`

**Label:**
- Class: `text-center text-neutral-500 text-sm uppercase tracking-wider mb-8`

**Logos Grid:**
- Class: `flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16`

**Logo Images:**
- Class: `h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`
- Use Cloudinary with auto-format

**Contentful Fields:** `homePage.trustedByLogos` (Asset array)

---

## Contentful Integration

### Client Setup (`src/lib/contentful.ts`)

```typescript
import contentful from 'contentful';

export const client = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// Type-safe content fetchers
export async function getHomePage() {
  const entries = await client.getEntries({
    content_type: 'homePage',
    include: 3, // Resolve nested references
    limit: 1,
  });
  return entries.items[0];
}

export async function getNavigation() {
  const entries = await client.getEntries({
    content_type: 'navigation',
    limit: 1,
  });
  return entries.items[0];
}

// Add similar functions for other content types
```

### Environment Variables (`.env`)

```env
CONTENTFUL_SPACE_ID=jn2q4lg00k6r
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
GHL_LOCATION_ID=your_location_id
GHL_API_KEY=your_api_key
```

---

## Cloudinary Integration

### Image Component (`src/components/ui/Image.astro`)

```astro
---
interface Props {
  src: string;           // Contentful asset URL
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

const { src, alt, width, height, class: className, loading = 'lazy', sizes } = Astro.props;

// Convert Contentful URL to Cloudinary fetch URL
const cloudinaryBase = `https://res.cloudinary.com/${import.meta.env.CLOUDINARY_CLOUD_NAME}/image/fetch`;
const transforms = `f_auto,q_auto,w_${width || 'auto'}`;
const cloudinaryUrl = `${cloudinaryBase}/${transforms}/${encodeURIComponent(src)}`;
---

<img 
  src={cloudinaryUrl}
  alt={alt}
  width={width}
  height={height}
  loading={loading}
  sizes={sizes}
  class={className}
/>
```

---

## GoHighLevel Form Integration

### Form Component (`src/lib/gohighlevel.ts`)

```typescript
const GHL_API_URL = 'https://rest.gohighlevel.com/v1';

export async function submitLead(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source?: string;
}) {
  const response = await fetch(`${GHL_API_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      locationId: import.meta.env.GHL_LOCATION_ID,
    }),
  });
  
  return response.json();
}
```

### Contact Form Component (React)

Create a React component for the contact form with client-side validation and submission to GoHighLevel.

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Common Responsive Patterns

```css
/* Typography scaling */
heading-1: text-4xl sm:text-5xl md:text-6xl lg:text-7xl

/* Grid columns */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Section padding */
py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32

/* Container padding */
px-4 sm:px-6 md:px-8 lg:px-16

/* Gap scaling */
gap-4 sm:gap-6 md:gap-8
```

---

## Animation Specifications

### Page Load Animations

1. **Hero content:** Fade up with stagger
   - Delay: 0ms (badge), 100ms (headline), 200ms (subheadline), 300ms (CTAs)
   - Duration: 600ms
   - Easing: `ease-out`

2. **Section reveals:** Trigger on scroll (intersection observer)
   - Threshold: 0.2 (20% visible)
   - Animation: `animate-slide-up`
   - Duration: 500ms

### Interactive Animations

1. **Button hover:**
   - Transform: `translateY(-2px)`
   - Duration: 150ms

2. **Card hover:**
   - Transform: `translateY(-4px)`
   - Shadow: `shadow-lg`
   - Duration: 200ms

3. **Link hover:**
   - Color transition
   - Duration: 150ms

### Micro-interactions

1. **Stats count-up:**
   - Duration: 2000ms
   - Easing: `ease-out`
   - Trigger: When section is in view

2. **Testimonial carousel:**
   - Slide duration: 400ms
   - Auto-advance: 6000ms
   - Easing: `ease-in-out`

---

## Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works throughout
- [ ] ARIA labels on icon-only buttons
- [ ] Skip-to-content link in header
- [ ] Reduced motion media query respected
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers

---

## File Naming Conventions

- Components: `PascalCase.astro` or `PascalCase.tsx`
- Utilities: `camelCase.ts`
- CSS: `kebab-case.css`
- Content types: `camelCase`
- CSS classes: Use UnoCSS shortcuts defined in config

---

## Questions for Developer

If any specifications are unclear, reach out for clarification on:

1. Exact animation timing preferences
2. Mobile navigation behavior (drawer vs overlay)
3. Carousel library preference (Swiper, Embla, custom)
4. Form validation requirements
5. Analytics/tracking implementation

---

**Happy building! 🚀**

*— Design Team, Online Nexus Marketing*