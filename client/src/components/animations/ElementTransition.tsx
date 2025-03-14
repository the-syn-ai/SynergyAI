import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type ElementTransitionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  type?: 'fade' | 'slide' | 'scale';
  duration?: number;
};

const getFadeVariants = (delay: number, duration: number): Variants => ({
  hidden: {
    opacity: 0,
    transition: { duration: 0 }
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      ease: 'easeOut',
      delay
    }
  }
});

const getSlideVariants = (direction: 'up' | 'down' | 'left' | 'right', delay: number, duration: number): Variants => {
  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
      transition: { duration: 0 }
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  };
};

const getScaleVariants = (delay: number, duration: number): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  }
});

export default function ElementTransition({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  type = 'fade',
  duration = 0.5
}: ElementTransitionProps) {
  let variants: Variants;

  switch (type) {
    case 'slide':
      variants = getSlideVariants(direction, delay, duration);
      break;
    case 'scale':
      variants = getScaleVariants(delay, duration);
      break;
    case 'fade':
    default:
      variants = getFadeVariants(delay, duration);
      break;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}