// GSAP Animation Utilities
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Fade-in and slide-up animation for content sections
 * Triggered when element enters viewport
 */
export const createScrollRevealAnimation = (selector: string, stagger = 0.1) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Staggered animation for card grids
 */
export const createStaggeredRevealAnimation = (
  containerSelector: string,
  itemSelector: string,
  staggerDelay = 0.1
) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll<HTMLElement>(itemSelector);
  
  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Split-text animation for headings
 * Reveals text letter by letter
 */
export const createSplitTextAnimation = (selector: string) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    const split = new SplitText(element, { type: 'chars' });
    
    gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Counter animation for numerical values
 */
export const createCounterAnimation = (selector: string, duration = 2) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    const target = parseInt(element.textContent || '0', 10);
    
    gsap.fromTo(
      { value: 0 },
      { value: target, duration, ease: 'power2.out' },
      {
        onUpdate: function () {
          element.textContent = Math.floor(this.targets()[0].value).toString();
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Parallax effect for background images
 * Speed: 0 = no movement, 1 = normal scroll speed
 */
export const createParallaxAnimation = (selector: string, speed = 0.3) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    gsap.to(element, {
      y: (i, target) => {
        return gsap.getProperty(target, 'offsetHeight') as number * speed * -1;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        scrub: 0.5,
        markers: false,
      },
    });
  });
};

/**
 * Cleanup all ScrollTrigger instances
 * Call this when component unmounts
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh ScrollTrigger calculations
 * Call this after DOM changes
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

