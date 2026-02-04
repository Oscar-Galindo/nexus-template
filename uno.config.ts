import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

/**
 * Online Nexus Marketing - UnoCSS Configuration
 * Brand guidelines: See BRANDING_GUIDE.md
 * Last Updated: January 25, 2026
 */

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      },
    }),
  ],
  
  theme: {
    colors: {
      // Primary Colors (Brand Blue)
      primary: {
        50: '#EEF4FF',
        100: '#DAE6FF',
        200: '#BDD3FF',
        300: '#90B5FF',
        400: '#5B8BFF',
        500: '#3366FF', // Main brand color
        600: '#1A4FE8',
        700: '#1240D4',
        800: '#1437AC',
        900: '#163388',
        950: '#0F1F54',
        DEFAULT: '#3366FF',
      },
      
      // Secondary Colors (Brand Orange)
      secondary: {
        50: '#FFF8ED',
        100: '#FFEFD4',
        200: '#FFDBA8',
        300: '#FFC170',
        400: '#FF9B36',
        500: '#FF7A0F', // Accent color
        600: '#F05E05',
        700: '#C74506',
        800: '#9E370D',
        900: '#7F300E',
        950: '#451604',
        DEFAULT: '#FF7A0F',
      },
      
      // Accent Colors (Success Green)
      accent: {
        500: '#22C55E',
        100: '#DCFCE7',
        DEFAULT: '#22C55E',
      },
      
      // Neutral Colors
      neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0A0A0A',
      },
      
      // Semantic Colors
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    
    // Typography
    fontFamily: {
      sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      heading: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      '5xl': ['3rem', { lineHeight: '1.25' }],        // 48px
      '6xl': ['3.75rem', { lineHeight: '1.2' }],      // 60px
      '7xl': ['4.5rem', { lineHeight: '1.1' }],       // 72px
    },
    
    // Spacing (4px base unit)
    spacing: {
      1: '0.25rem',  // 4px
      2: '0.5rem',   // 8px
      3: '0.75rem',  // 12px
      4: '1rem',     // 16px
      6: '1.5rem',   // 24px
      8: '2rem',     // 32px
      12: '3rem',    // 48px
      16: '4rem',    // 64px
      20: '5rem',    // 80px
      24: '6rem',    // 96px
    },
    
    // Border Radius
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    
    // Shadows & Elevation
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      card: '0 2px 8px -2px rgb(0 0 0 / 0.08), 0 4px 16px -4px rgb(0 0 0 / 0.12)',
      button: '0 4px 12px -2px rgb(51 102 255 / 0.3)',
    },
    
    // Animation Duration
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    // Container
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
  },
  
  // Component Shortcuts
  shortcuts: {
    // === BUTTONS ===
    'btn': 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-normal cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    'btn-sm': 'px-4 py-2 text-sm',
    'btn-lg': 'px-8 py-4 text-lg',
    
    'btn-primary': 'btn bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-button',
    'btn-secondary': 'btn bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
    'btn-outline': 'btn border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    'btn-ghost': 'btn hover:bg-neutral-100 text-neutral-700',
    
    // === CARDS ===
    'card': 'bg-white rounded-xl p-6 shadow-card',
    'card-hover': 'card hover:shadow-lg transition-shadow duration-normal',
    'card-bordered': 'bg-white rounded-xl p-6 border border-neutral-200',
    
    // === CONTAINERS ===
    'container-brand': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'container-sm': 'max-w-3xl mx-auto px-4',
    'container-md': 'max-w-5xl mx-auto px-4',
    
    // === SECTIONS ===
    'section': 'py-16 md:py-24 lg:py-32',
    'section-sm': 'py-8 md:py-12',
    'section-muted': 'section bg-neutral-50',
    
    // === TYPOGRAPHY ===
    'heading-1': 'text-6xl md:text-7xl font-bold text-neutral-900 leading-tight',
    'heading-2': 'text-5xl md:text-6xl font-bold text-neutral-900 leading-tight',
    'heading-3': 'text-4xl font-bold text-neutral-900',
    'heading-4': 'text-3xl font-bold text-neutral-900',
    'heading-5': 'text-2xl font-semibold text-neutral-900',
    'heading-6': 'text-xl font-semibold text-neutral-900',
    
    'body-lg': 'text-lg text-neutral-700 leading-relaxed',
    'body': 'text-base text-neutral-600 leading-relaxed',
    'body-sm': 'text-sm text-neutral-600',
    
    // === BADGES ===
    'badge': 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
    'badge-primary': 'badge bg-primary-100 text-primary-700',
    'badge-secondary': 'badge bg-secondary-100 text-secondary-700',
    'badge-success': 'badge bg-accent-100 text-green-700',
    'badge-warning': 'badge bg-amber-100 text-amber-700',
    'badge-error': 'badge bg-red-100 text-red-700',
    
    // === FORMS ===
    'label': 'block text-sm font-medium text-neutral-700 mb-2',
    'input': 'w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition',
    'input-error': 'border-error focus:border-error focus:ring-red-200',
    
    // === LAYOUT HELPERS ===
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-start': 'flex items-start justify-start',
    
    // === GRIDS ===
    'grid-features': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    'grid-pricing': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto',
    
    // === HERO ===
    'hero': 'relative py-24 md:py-32 lg:py-40 overflow-hidden',
    'hero-content': 'container-brand text-center relative z-10',
  },
  
  // Custom Rules
  rules: [
    // Gradient backgrounds
    ['bg-gradient-brand', { 
      background: 'linear-gradient(135deg, #3366FF 0%, #1240D4 100%)' 
    }],
    ['bg-gradient-brand-reverse', { 
      background: 'linear-gradient(135deg, #1240D4 0%, #3366FF 100%)' 
    }],
    ['bg-gradient-accent', { 
      background: 'linear-gradient(135deg, #FF7A0F 0%, #F05E05 100%)' 
    }],
    
    // Text gradients
    ['text-gradient-brand', {
      background: 'linear-gradient(135deg, #3366FF 0%, #1240D4 100%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-clip': 'text',
    }],
    
    // Animations
    ['animate-fade-in', {
      animation: 'fadeIn 0.5s ease-out',
    }],
    ['animate-slide-up', {
      animation: 'slideUp 0.6s ease-out',
    }],
    ['animate-scale-in', {
      animation: 'scaleIn 0.3s ease-out',
    }],
  ],
  
  // Safelist - Always include these classes
  safelist: [
    'text-gradient-brand',
    'bg-gradient-brand',
    'animate-fade-in',
  ],
});
