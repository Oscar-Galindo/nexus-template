/**
 * Navigation Component - Online Nexus Marketing
 * 
 * Responsive navigation with mobile menu (React for interactivity)
 */

import { useState, useEffect } from 'react';
import type { NavigationItem } from '@/lib/contentful';

interface NavigationProps {
  navLinks: NavigationItem[];
  ctaText: string;
  ctaUrl: string;
  currentPath?: string;
}

export default function Navigation({ navLinks, ctaText, ctaUrl, currentPath = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const isActive = (url: string) => {
    if (url === '/') return currentPath === '/';
    return currentPath.startsWith(url);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={`font-medium transition-colors duration-fast ${
              isActive(link.url)
                ? 'text-primary-500 font-semibold'
                : 'text-neutral-600 hover:text-primary-500'
            }`}
            {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {link.label}
          </a>
        ))}
        <a
          href={ctaUrl}
          className="btn-primary btn-sm"
        >
          {ctaText}
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 md:hidden animate-slide-in-right"
          >
            <nav className="flex flex-col h-full pt-24 px-6 pb-8">
              {/* Nav Links */}
              <div className="flex flex-col gap-6 mb-8">
                {navLinks.map((link, index) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className={`text-xl font-medium transition-colors animate-slide-in-right ${
                      isActive(link.url)
                        ? 'text-primary-500'
                        : 'text-neutral-900 hover:text-primary-500'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={ctaUrl}
                className="btn-primary btn-lg w-full"
                onClick={() => setIsOpen(false)}
              >
                {ctaText}
              </a>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Close hint */}
              <p className="text-center text-sm text-neutral-500 mt-8">
                Press ESC or tap outside to close
              </p>
            </nav>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
