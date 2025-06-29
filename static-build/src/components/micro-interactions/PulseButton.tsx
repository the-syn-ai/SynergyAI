import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings } from './config';
import { Button } from '@/components/ui/button';

interface PulseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  pulseColor?: string;
  pulseIntensity?: 'subtle' | 'medium' | 'strong';
  pulseSpeed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export default function PulseButton({
  children,
  variant = 'default',
  size = 'default',
  pulseColor,
  pulseIntensity = 'medium',
  pulseSpeed = 'normal',
  className = '',
  ...props
}: PulseButtonProps) {
  // Configure the pulse animation based on intensity
  const intensityMap = {
    subtle: { scale: 1.03, opacity: 0.3, spread: '15px' },
    medium: { scale: 1.05, opacity: 0.5, spread: '20px' },
    strong: { scale: 1.08, opacity: 0.7, spread: '25px' }
  };
  
  // Configure the pulse speed
  const speedMap = {
    slow: 2.5,
    normal: 1.8,
    fast: 1.2
  };

  const intensity = intensityMap[pulseIntensity];
  const speed = speedMap[pulseSpeed];
  
  // Default color based on variant or use provided color
  const getColor = () => {
    if (pulseColor) return pulseColor;
    
    // Default color mappings based on button variant
    switch (variant) {
      case 'default': return 'rgba(var(--primary-rgb), 0.5)';
      case 'destructive': return 'rgba(239, 68, 68, 0.5)'; // red
      case 'secondary': return 'rgba(148, 163, 184, 0.5)'; // slate
      default: return 'rgba(var(--primary-rgb), 0.5)';
    }
  };

  return (
    <div className="relative inline-block">
      {/* Pulse effect */}
      <motion.span
        className="absolute inset-0 rounded-md"
        style={{ backgroundColor: getColor() }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, intensity.scale, 1],
          opacity: [0, intensity.opacity, 0]
        }}
        transition={{
          duration: speed,
          ease: easings.easeInOut,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0.5
        }}
      />
      
      {/* Actual button */}
      <Button
        variant={variant}
        size={size}
        className={`relative z-10 ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}