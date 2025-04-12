import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';

type BouncingIconProps = {
  children: ReactNode;
  className?: string;
  bounceHeight?: 'subtle' | 'medium' | 'high';
  bounceSpeed?: 'slow' | 'normal' | 'fast';
  continuous?: boolean;
  delay?: number;
  onClick?: () => void;
};

export default function BouncingIcon({
  children,
  className = '',
  bounceHeight = 'medium',
  bounceSpeed = 'normal',
  continuous = true,
  delay = 0,
  onClick
}: BouncingIconProps) {
  // Configure the bounce height
  const bounceHeightMap = {
    subtle: 3,
    medium: 6,
    high: 10
  };
  
  // Configure the bounce speed (duration in seconds)
  const bounceSpeedMap = {
    slow: 1.5,
    normal: 1,
    fast: 0.6
  };

  const height = bounceHeightMap[bounceHeight];
  const speed = bounceSpeedMap[bounceSpeed];
  
  // Define animation variants
  const variants = {
    initial: { y: 0 },
    animate: { 
      y: [-height, 0, -height/2, 0],
      transition: {
        duration: speed,
        times: [0, 0.4, 0.7, 1], // control timing of each keyframe
        ease: easings.easeInOut,
        repeat: continuous ? Infinity : 0,
        repeatDelay: continuous ? 0.5 : 0,
        delay
      }
    }
  };
  
  // For hover-only variant
  const hoverVariants = {
    initial: { y: 0 },
    hover: { 
      y: [-height, 0, -height/2, 0],
      transition: {
        duration: speed * 0.7,
        times: [0, 0.4, 0.7, 1],
        ease: easings.easeInOut
      }
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="initial"
      animate={continuous ? "animate" : undefined}
      whileHover={!continuous ? "hover" : undefined}
      variants={continuous ? variants : hoverVariants}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
}