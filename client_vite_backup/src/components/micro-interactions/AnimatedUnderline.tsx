import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';

type AnimatedUnderlineProps = {
  children: ReactNode;
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  underlineRadius?: number;
  onlyOnHover?: boolean;
  duration?: keyof typeof durations;
  showUnderline?: boolean;
};

export default function AnimatedUnderline({
  children,
  className = '',
  underlineColor = 'bg-primary',
  underlineHeight = 2,
  underlineRadius = 2,
  onlyOnHover = false,
  duration = 'normal',
  showUnderline = true
}: AnimatedUnderlineProps) {
  // Animation variants
  const underlineVariants = {
    hidden: { 
      width: '0%', 
      left: '50%',
      right: '50%'
    },
    visible: { 
      width: '100%',
      left: '0%',
      right: '0%'
    }
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      
      {showUnderline && (
        <motion.span
          className={`absolute bottom-0 ${underlineColor}`}
          style={{
            height: `${underlineHeight}px`,
            borderRadius: `${underlineRadius}px`
          }}
          initial="hidden"
          animate={onlyOnHover ? undefined : "visible"}
          whileHover="visible"
          variants={underlineVariants}
          transition={{
            duration: durations[duration],
            ease: easings.easeInOut
          }}
        />
      )}
    </span>
  );
}