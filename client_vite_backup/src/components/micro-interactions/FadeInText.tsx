import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';

type FadeInTextProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  staggerChildren?: boolean;
  delay?: number;
  duration?: keyof typeof durations;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  once?: boolean;
};

export default function FadeInText({
  children,
  className = '',
  direction = 'up',
  staggerChildren = false,
  delay = 0,
  duration = 'normal',
  as = 'div',
  once = true
}: FadeInTextProps) {
  // Define the animation variants based on direction
  const getDirectionalVariants = () => {
    const distance = 20;
    
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'none':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  // Define the container variants if using staggered animation
  const containerVariants = staggerChildren ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      }
    }
  } : undefined;

  // Handle children if using staggered text animation
  const renderStaggeredText = () => {
    // If it's not a string, just return it
    if (typeof children !== 'string') {
      return children;
    }

    // Split the text into words
    return children.split(' ').map((word, index) => (
      <motion.span
        key={index}
        variants={getDirectionalVariants()}
        className="inline-block mr-1"
      >
        {word}
      </motion.span>
    ));
  };

  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={staggerChildren ? containerVariants : getDirectionalVariants()}
      transition={!staggerChildren ? {
        duration: durations[duration],
        delay,
        ease: easings.easeOut
      } : undefined}
    >
      {staggerChildren ? renderStaggeredText() : children}
    </Component>
  );
}