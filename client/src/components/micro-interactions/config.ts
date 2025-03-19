/**
 * Micro-Interaction Animation Configuration
 * This file defines the core animation parameters for our micro-interaction system
 */

// Duration presets (in seconds)
export const durations = {
  ultraFast: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  ultraSlow: 0.8
};

// Easing functions for natural movement
export const easings = {
  // Standard easings
  easeOut: [0.0, 0.0, 0.2, 1.0],
  easeIn: [0.4, 0.0, 1.0, 1.0],
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  
  // Bounce easings
  bounceOut: [0.22, 1.0, 0.36, 1.0],
  bounceIn: [0.7, -0.3, 0.1, 1.3],
  
  // Spring easings
  spring: [0.3, 1.3, 0.3, 1.0],
  
  // For elastic/snap movements
  elastic: [0.6, 0.1, 0.1, 1.3],
  
  // Linear (no easing)
  linear: [0, 0, 1, 1]
};

// Animation variants for hover, tap, and initial states
export const variants = {
  // Hover variants
  hoverScale: {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  },
  
  hoverGlow: {
    initial: { boxShadow: '0 0 0 rgba(var(--primary-rgb), 0)' },
    hover: { boxShadow: '0 0 15px rgba(var(--primary-rgb), 0.5)' }
  },
  
  // Button variants
  buttonPress: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  },
  
  // Focus variants
  focusOutline: {
    initial: { outlineWidth: '0px', outlineColor: 'rgba(var(--primary-rgb), 0)' },
    focus: { outlineWidth: '2px', outlineColor: 'rgba(var(--primary-rgb), 0.5)' }
  },
  
  // Appear/disappear variants
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
  },
  
  popIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  
  // Exit animations
  fadeOut: {
    exit: { opacity: 0 }
  },
  
  slideOutDown: {
    exit: { opacity: 0, y: 20 }
  }
};

// Default transition settings
export const transitions = {
  hover: {
    type: 'tween',
    duration: durations.fast,
    ease: easings.easeOut
  },
  
  tap: {
    type: 'spring',
    duration: durations.ultraFast,
    ease: easings.easeIn
  },
  
  appear: {
    type: 'tween',
    duration: durations.normal,
    ease: easings.easeOut
  },
  
  springy: {
    type: 'spring',
    stiffness: 400,
    damping: 15
  },
  
  bounce: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 1.2
  }
};