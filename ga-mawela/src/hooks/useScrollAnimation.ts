'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to trigger animations when elements enter the viewport
 * Inspired by Microsoft Azure pricing page scroll animations
 */
export function useScrollAnimation(
  options: ScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: add animation class immediately
      if (ref.current) {
        ref.current.classList.add('in-view');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // If triggerOnce is true, stop observing after animation triggers
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // Remove animation class when element leaves viewport
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
}

/**
 * Hook to apply staggered animations to multiple elements
 */
export function useStaggeredAnimation(
  containerRef: React.RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    if (!('IntersectionObserver' in window) || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all children with animation classes
            const children = entry.target.querySelectorAll(
              '[class*="animate-"], [class*="scroll-animate"]'
            );

            children.forEach((child, index) => {
              const delay = index * 100; // 100ms stagger between items
              (child as HTMLElement).style.animationDelay = `${delay}ms`;
              child.classList.add('in-view');
            });

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            const children = entry.target.querySelectorAll(
              '[class*="animate-"], [class*="scroll-animate"]'
            );
            children.forEach((child) => {
              child.classList.remove('in-view');
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, threshold, rootMargin, triggerOnce]);
}

/**
 * Hook to create parallax scroll effect
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const scrollY = window.scrollY;
      const elementTop = ref.current.getBoundingClientRect().top + scrollY;
      const distance = scrollY - elementTop;

      ref.current.style.transform = `translateY(${distance * speed}px)`;
    };

    // Check if prefers-reduced-motion is set
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
}

