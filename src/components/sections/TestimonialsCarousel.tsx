/**
 * Testimonials Carousel Section - Online Nexus Marketing
 * 
 * Interactive testimonials carousel (React for interactivity)
 */

import { useState, useEffect } from 'react';
import type { TestimonialItem } from '@/lib/contentful';

interface TestimonialsCarouselProps {
  title?: string;
  testimonials: TestimonialItem[];
  autoAdvance?: boolean;
  intervalMs?: number;
}

export default function TestimonialsCarousel({
  title = 'What Our Clients Say',
  testimonials,
  autoAdvance = true,
  intervalMs = 6000,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoAdvance || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoAdvance, intervalMs, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];
  const photoUrl = currentTestimonial.authorPhoto?.fields?.file?.url;

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="heading-2 text-center mb-12">
          {title}
        </h2>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors z-10"
                aria-label="Previous testimonial"
              >
                <span className="i-lucide-chevron-left text-neutral-900" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary-50 transition-colors z-10"
                aria-label="Next testimonial"
              >
                <span className="i-lucide-chevron-right text-neutral-900" />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 relative animate-fade-in">
            {/* Quote Mark */}
            <span
              className="text-6xl text-primary-200 absolute -top-4 -left-2 font-serif"
              aria-hidden="true"
            >
              "
            </span>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-6 relative z-10">
              {currentTestimonial.quote}
            </blockquote>

            {/* Star Rating */}
            <div className="flex gap-1 text-secondary-500 mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`i-lucide-star ${
                    i < currentTestimonial.rating ? 'fill-current' : ''
                  }`}
                />
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {photoUrl && (
                <img
                  src={`https:${photoUrl}`}
                  alt={currentTestimonial.authorName}
                  className="w-14 h-14 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-neutral-900">
                  {currentTestimonial.authorName}
                </div>
                <div className="text-sm text-neutral-500">
                  {currentTestimonial.authorTitle}
                  {currentTestimonial.authorCompany && `, ${currentTestimonial.authorCompany}`}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-500 w-8'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
