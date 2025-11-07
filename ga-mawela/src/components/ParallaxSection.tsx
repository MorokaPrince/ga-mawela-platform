'use client';

import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  backgroundImage?: string;
}

/**
 * ParallaxSection - Creates parallax scrolling effect
 * Speed: 0-1 (0 = no movement, 1 = normal scroll speed)
 */
export default function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  backgroundImage,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const bgElement = bgRef.current;
    if (!element || !bgElement) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip parallax if user prefers reduced motion
      return;
    }

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = 1 - (elementTop + elementHeight) / windowHeight;

      // Apply parallax transform
      const offset = scrollProgress * 100 * speed;
      bgElement.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background */}
      {backgroundImage && (
        <div
          ref={bgRef}
          className="parallax-background absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

