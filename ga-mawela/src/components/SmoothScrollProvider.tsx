'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider - Initializes Lenis smooth scroll
 * Provides smooth, momentum-based scrolling experience
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip smooth scroll if user prefers reduced motion
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

