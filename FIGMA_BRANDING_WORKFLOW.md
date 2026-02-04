# Figma → Claude MCP → Brand System Workflow

This guide explains how to use Claude Desktop with Figma MCP to automatically generate a complete brand system for each client project.

## Prerequisites

1. **Claude Desktop** - Download from https://claude.ai/download
2. **Figma API Key** - Get from https://www.figma.com/developers/api#authentication
3. **Client's Figma Design** - Access to their design file

---

## Setup Claude Desktop with Figma MCP

### Step 1: Get Your Figma API Key

1. Go to https://www.figma.com/
2. Click your profile → Settings → Account
3. Scroll to "Personal access tokens"
4. Click "Generate new token"
5. Copy the token (starts with `figd_...`)

### Step 2: Configure Claude Desktop

Edit your Claude Desktop config file:

**Mac:**
```bash
nano ~/.config/claude/claude_desktop_config.json
```

**Windows:**
```bash
notepad %APPDATA%\Claude\claude_desktop_config.json
```

Add this configuration:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "figd_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop. You should see "Figma" in the available tools.

---

## The Workflow

### 1. Get Client's Figma File URL

From client:
```
https://www.figma.com/design/ABC123/Client-Website-Design
```

Extract the file ID: `ABC123`

### 2. Open Claude Desktop and Prompt

```
I need to create a complete brand system from this Figma file:
File ID: ABC123

Please use the Figma MCP to:
1. Analyze the design file
2. Extract all design tokens (colors, typography, spacing, shadows)
3. Generate these files for my Astro + UnoCSS project:

   a) brand/branding-guide.md
      - Brand overview
      - Color palette with names and usage
      - Typography scale
      - Spacing system
      - Component patterns
      
   b) uno.config.ts (extended version)
      - Theme colors
      - Font families
      - Breakpoints
      - Spacing tokens
      - Custom shortcuts for common patterns
      
   c) src/styles/brand.css
      - CSS custom properties
      - Component base styles
      - Utility classes
      
   d) brand/tokens.json
      - Machine-readable design tokens
      - For potential future automation

Please make everything production-ready and follow UnoCSS best practices.
```

### 3. Claude Generates Everything

Claude will:
1. Connect to Figma via MCP
2. Analyze the design file
3. Extract all design tokens
4. Generate all 4 files
5. Provide implementation guidance

### 4. Copy Files to Client Project

```bash
# In your client project
mkdir -p brand src/styles

# Copy the generated files
# - brand/branding-guide.md
# - brand/tokens.json
# - uno.config.ts (replace or merge)
# - src/styles/brand.css
```

---

## What Gets Generated

### File 1: `brand/branding-guide.md`

Human-readable brand guide:

```markdown
# [Client Name] Brand Guide

## Color Palette

### Primary Colors
- **Ocean Blue** (`#0066CC`) - Primary brand color, CTAs, links
- **Sky Blue** (`#4D94FF`) - Hover states, accents
- **Navy** (`#003366`) - Headers, important text

### Secondary Colors
- **Coral** (`#FF6B6B`) - Alerts, highlights
- **Mint** (`#51CF66`) - Success states
- **Slate** (`#495057`) - Body text

### Neutral Colors
- **White** (`#FFFFFF`) - Backgrounds
- **Light Gray** (`#F8F9FA`) - Subtle backgrounds
- **Gray** (`#6C757D`) - Secondary text
- **Dark Gray** (`#212529`) - Primary text

## Typography

### Font Families
- **Headings**: Inter (Bold 700, Semibold 600)
- **Body**: Inter (Regular 400, Medium 500)
- **Mono**: JetBrains Mono (for code)

### Scale
- **Display**: 48px / 3rem (Hero titles)
- **H1**: 36px / 2.25rem
- **H2**: 30px / 1.875rem
- **H3**: 24px / 1.5rem
- **H4**: 20px / 1.25rem
- **Body**: 16px / 1rem
- **Small**: 14px / 0.875rem

## Spacing

Based on 4px base unit:
- **xs**: 4px / 0.25rem
- **sm**: 8px / 0.5rem
- **md**: 16px / 1rem
- **lg**: 24px / 1.5rem
- **xl**: 32px / 2rem
- **2xl**: 48px / 3rem
- **3xl**: 64px / 4rem

## Components

### Buttons
- Primary: Ocean Blue background, white text, 12px padding
- Secondary: Transparent background, Ocean Blue border
- Hover: 10% darker
- Border radius: 8px

### Cards
- Background: White
- Border: 1px Light Gray
- Padding: 24px
- Border radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)

## Usage Examples
...
```

---

### File 2: `uno.config.ts` (Extended)

```typescript
import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  
  theme: {
    colors: {
      // Primary
      primary: {
        DEFAULT: '#0066CC',
        dark: '#003366',
        light: '#4D94FF',
      },
      // Secondary
      secondary: {
        DEFAULT: '#FF6B6B',
        dark: '#E85555',
        light: '#FF8888',
      },
      // Success/Error/Warning
      success: '#51CF66',
      warning: '#FFA94D',
      error: '#FF6B6B',
      // Neutrals
      gray: {
        50: '#F8F9FA',
        100: '#E9ECEF',
        200: '#DEE2E6',
        300: '#CED4DA',
        400: '#ADB5BD',
        500: '#6C757D',
        600: '#495057',
        700: '#343A40',
        800: '#212529',
        900: '#0D1117',
      },
    },
    
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.6' }],
      xl: ['1.25rem', { lineHeight: '1.5' }],
      '2xl': ['1.5rem', { lineHeight: '1.4' }],
      '3xl': ['1.875rem', { lineHeight: '1.3' }],
      '4xl': ['2.25rem', { lineHeight: '1.2' }],
      '5xl': ['3rem', { lineHeight: '1.1' }],
    },
    
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
    },
    
    borderRadius: {
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '9999px',
    },
    
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
      lg: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
      xl: '0 16px 48px 0 rgba(0, 0, 0, 0.2)',
    },
  },
  
  shortcuts: {
    // Buttons
    'btn': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors',
    'btn-primary': 'btn bg-primary text-white hover:bg-primary-dark',
    'btn-secondary': 'btn border-2 border-primary text-primary hover:bg-primary hover:text-white',
    'btn-ghost': 'btn hover:bg-gray-100',
    
    // Cards
    'card': 'bg-white rounded-xl p-6 shadow',
    'card-hover': 'card hover:shadow-lg transition-shadow',
    
    // Containers
    'container-sm': 'max-w-3xl mx-auto px-4',
    'container-md': 'max-w-5xl mx-auto px-4',
    'container-lg': 'max-w-7xl mx-auto px-4',
    
    // Sections
    'section': 'py-16 md:py-24',
    'section-sm': 'py-8 md:py-12',
    
    // Typography
    'heading-1': 'text-4xl md:text-5xl font-bold text-gray-900',
    'heading-2': 'text-3xl md:text-4xl font-bold text-gray-900',
    'heading-3': 'text-2xl md:text-3xl font-semibold text-gray-900',
    'body-large': 'text-lg text-gray-700',
    'body': 'text-base text-gray-600',
    
    // Flex utilities
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
  
  rules: [
    // Custom gradient rule
    ['bg-gradient-brand', { 
      background: 'linear-gradient(135deg, #0066CC 0%, #4D94FF 100%)' 
    }],
    // Glass morphism
    ['glass', {
      background: 'rgba(255, 255, 255, 0.8)',
      'backdrop-filter': 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }],
  ],
});
```

---

### File 3: `src/styles/brand.css`

```css
/* Brand CSS Variables & Component Styles */

:root {
  /* Colors */
  --color-primary: #0066CC;
  --color-primary-dark: #003366;
  --color-primary-light: #4D94FF;
  
  --color-secondary: #FF6B6B;
  --color-success: #51CF66;
  --color-warning: #FFA94D;
  --color-error: #FF6B6B;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition: 250ms ease;
  --transition-slow: 350ms ease;
}

/* Global Styles */
body {
  font-family: var(--font-sans);
  color: #212529;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

/* Component Base Styles */
.brand-button {
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all var(--transition);
  cursor: pointer;
}

.brand-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.brand-card {
  background: white;
  border-radius: 0.75rem;
  padding: var(--space-xl);
  box-shadow: var(--shadow);
  transition: all var(--transition);
}

.brand-card:hover {
  box-shadow: var(--shadow-lg);
}

/* Brand-specific animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Utility classes */
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-padding {
  padding: var(--space-3xl) var(--space-md);
}

@media (min-width: 768px) {
  .section-padding {
    padding: 4rem var(--space-xl);
  }
}
```

---

### File 4: `brand/tokens.json`

```json
{
  "client": {
    "name": "Client Name",
    "industry": "Technology",
    "generated": "2026-01-25"
  },
  "colors": {
    "primary": {
      "base": "#0066CC",
      "dark": "#003366",
      "light": "#4D94FF"
    },
    "secondary": {
      "base": "#FF6B6B",
      "dark": "#E85555",
      "light": "#FF8888"
    },
    "neutrals": {
      "50": "#F8F9FA",
      "100": "#E9ECEF",
      "500": "#6C757D",
      "900": "#0D1117"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": "Inter",
      "heading": "Inter",
      "mono": "JetBrains Mono"
    },
    "fontSizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    },
    "fontWeights": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "base": "0.5rem",
    "md": "0.75rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "base": "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
    "lg": "0 8px 32px 0 rgba(0, 0, 0, 0.15)"
  }
}
```

---

## How to Use in Components

### Astro Component

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro';
---

<Layout title="Home">
  <!-- Using UnoCSS shortcuts -->
  <section class="section container-lg">
    <h1 class="heading-1 mb-6">Welcome to Our Site</h1>
    <p class="body-large mb-8">
      This is using the brand system generated from Figma
    </p>
    
    <!-- Using shortcuts -->
    <div class="flex gap-4">
      <button class="btn-primary">Get Started</button>
      <button class="btn-secondary">Learn More</button>
    </div>
  </section>
  
  <!-- Using custom gradient -->
  <section class="section bg-gradient-brand">
    <div class="container-md">
      <h2 class="heading-2 text-white">Our Services</h2>
      <!-- Cards with brand styling -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="card-hover">
          <h3 class="heading-3 mb-4">Service 1</h3>
          <p class="body">Description here</p>
        </div>
        <div class="card-hover">
          <h3 class="heading-3 mb-4">Service 2</h3>
          <p class="body">Description here</p>
        </div>
        <div class="card-hover">
          <h3 class="heading-3 mb-4">Service 3</h3>
          <p class="body">Description here</p>
        </div>
      </div>
    </div>
  </section>
</Layout>
```

### React Component

```tsx
// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="section container-lg">
      <div className="flex-center flex-col text-center">
        <h1 className="heading-1 mb-6 animate-fade-in-up">
          <span className="text-gradient">Transform</span> Your Business
        </h1>
        <p className="body-large max-w-2xl mb-8">
          We help companies grow with modern design and technology
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-secondary">
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## Benefits

✅ **Automated** - Claude extracts everything from Figma
✅ **Consistent** - All projects follow same structure
✅ **Type-safe** - UnoCSS provides autocompletion
✅ **Maintainable** - Centralized theme configuration
✅ **Documented** - Branding guide for reference
✅ **Scalable** - Easy to update/extend per client

---

## Tips

1. **Test the workflow** with a sample Figma file first
2. **Refine the prompt** based on your first few clients
3. **Create templates** for common component patterns
4. **Version control** the brand files in each client repo
5. **Update Claude** with feedback to improve outputs

---

## Troubleshooting

### "Figma MCP not found"
- Restart Claude Desktop after config changes
- Check your config file syntax (valid JSON)
- Ensure Figma token is correct

### "Can't access Figma file"
- Verify file ID is correct
- Check file permissions (need at least view access)
- Token must have read access

### "Generated theme doesn't match design"
- Review extracted tokens in tokens.json
- Manually adjust uno.config.ts if needed
- Provide Claude with more context in prompt

---

## Next Steps

1. Set up Claude Desktop + Figma MCP (10 min)
2. Test with sample Figma file (20 min)
3. Refine prompt for your needs (30 min)
4. Document your refined workflow
5. Use for next client project
