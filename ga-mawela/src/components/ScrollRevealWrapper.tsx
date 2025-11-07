'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
}

/**
 * ScrollRevealWrapper - Wraps content to add scroll-triggered animations
 * Uses Intersection Observer API for performance
 */
export default function ScrollRevealWrapper({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  type = 'fadeUp',
}: ScrollRevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial state
    element.style.opacity = '0';
    
    if (type === 'fadeUp') {
      element.style.transform = 'translateY(30px)';
    } else if (type === 'slideLeft') {
      element.style.transform = 'translateX(30px)';
    } else if (type === 'slideRight') {
      element.style.transform = 'translateX(-30px)';
    } else if (type === 'scale') {
      element.style.transform = 'scale(0.9)';
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is in view
          if (prefersReducedMotion) {
            // Skip animation if user prefers reduced motion
            element.style.opacity = '1';
            element.style.transform = 'none';
          } else {
            // Trigger animation
            element.style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
            element.style.opacity = '1';
            element.style.transform = 'none';
          }
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, duration, type]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

