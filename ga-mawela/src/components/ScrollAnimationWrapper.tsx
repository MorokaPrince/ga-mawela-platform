'use client';

import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animationType?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in';
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  delay?: number;
}

/**
 * Wrapper component for scroll-triggered animations
 * Inspired by Microsoft Azure pricing page
 */
export default function ScrollAnimationWrapper({
  children,
  animationType = 'slide-up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  className = '',
  delay = 0,
}: ScrollAnimationWrapperProps) {
  const ref = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const animationClass = {
    'fade-in': 'scroll-animate',
    'slide-up': 'scroll-animate',
    'slide-left': 'scroll-animate-left',
    'slide-right': 'scroll-animate-right',
    'scale-in': 'scroll-animate',
  }[animationType];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animationClass} ${className}`}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}

