import React from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';

type PingDotProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  pingColor?: string;
  pingOpacity?: number;
  pingSize?: number;
  pingDuration?: number;
  count?: number;
};

export default function PingDot({
  className = '',
  size = 'md',
  color = 'bg-primary',
  pingColor,
  pingOpacity = 0.6,
  pingSize = 2.5,
  pingDuration = 1.5,
  count = Infinity
}: PingDotProps) {
  // Size mappings
  const sizeMap = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  // Animation for the ping effect
  const pingVariants = {
    initial: { 
      opacity: pingOpacity,
      scale: 1
    },
    animate: { 
      opacity: 0,
      scale: pingSize,
      transition: {
        duration: pingDuration,
        ease: easings.easeOut,
        repeat: count,
        repeatType: 'loop',
        repeatDelay: 0.5
      }
    }
  };

  return (
    <span className={`relative flex ${className}`}>
      <span className={`${sizeMap[size]} rounded-full ${color}`}></span>
      <motion.span
        className={`absolute inset-0 rounded-full ${pingColor || color}`}
        style={{ opacity: pingOpacity }}
        initial="initial"
        animate="animate"
        variants={pingVariants}
      ></motion.span>
    </span>
  );
}