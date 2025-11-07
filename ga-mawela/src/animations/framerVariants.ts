// Framer Motion Animation Variants
import { Variants } from 'framer-motion';

/**
 * Fade-in animation
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/**
 * Slide-up animation
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/**
 * Slide-down animation
 */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/**
 * Slide-left animation
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/**
 * Slide-right animation
 */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/**
 * Scale animation
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/**
 * Staggered container for child animations
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Button hover animation
 */
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Card hover animation
 */
export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * Tab transition animation
 */
export const tabTransitionVariants: Variants = {
  enter: { opacity: 0, y: 10 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -10 },
};

/**
 * Ripple effect animation
 */
export const rippleVariants: Variants = {
  initial: { scale: 0, opacity: 1 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/**
 * Pulse animation for emphasis
 */
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Glow animation
 */
export const glowVariants: Variants = {
  rest: { boxShadow: '0 0 0 0px rgba(168, 213, 255, 0.3)' },
  hover: {
    boxShadow: '0 0 20px 8px rgba(168, 213, 255, 0.2)',
    transition: { duration: 0.3 },
  },
};

/**
 * Rotate animation
 */
export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Bounce animation
 */
export const bounceVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

