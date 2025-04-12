import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'opacity';
  distance?: number;
  duration?: keyof typeof durations;
  delay?: number;
  amount?: number; // 0-1, the amount of element that needs to be visible
  staggerChildren?: number;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  distance = 30,
  duration = 'normal',
  delay = 0,
  amount = 0.2,
  staggerChildren = 0,
  once = true
}: ScrollRevealProps) {
  // Initial animation state based on direction
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'scale':
        return { scale: 0.9, opacity: 0 };
      case 'opacity':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  // Animation target state
  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'scale':
        return { scale: 1, opacity: 1 };
      case 'opacity':
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  // Container variants for staggered animations
  const containerVariants = staggerChildren > 0 ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  } : undefined;

  // For direct children when not using staggered animation
  const itemVariants = staggerChildren > 0 ? {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration: durations[duration],
        ease: easings.easeOut
      }
    }
  } : undefined;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerChildren > 0 ? containerVariants : {
        hidden: getInitialState(),
        visible: {
          ...getAnimateState(),
          transition: {
            duration: durations[duration],
            delay,
            ease: easings.easeOut
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (!staggerChildren || !React.isValidElement(child)) {
          return child;
        }
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}