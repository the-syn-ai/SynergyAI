import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { durations, easings, variants, transitions } from './config';

type HoverCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'scale' | 'glow' | 'lift' | 'border' | 'combined';
  intensity?: 'subtle' | 'medium' | 'strong';
  duration?: keyof typeof durations;
};

/**
 * HoverCard - A card component with micro-interaction animations on hover
 */
export default function HoverCard({ 
  children, 
  className = '', 
  hoverEffect = 'scale', 
  intensity = 'medium',
  duration = 'fast'
}: HoverCardProps) {
  // Define the animation based on selected effect and intensity
  const getAnimationVariants = () => {
    const intensityValues = {
      subtle: { scale: 1.02, y: -3, shadow: '0 4px 10px rgba(0, 0, 0, 0.1)' },
      medium: { scale: 1.05, y: -5, shadow: '0 8px 15px rgba(0, 0, 0, 0.1)' },
      strong: { scale: 1.08, y: -8, shadow: '0 12px 24px rgba(0, 0, 0, 0.15)' }
    };
    
    const current = intensityValues[intensity];
    
    // Different animation effects
    switch(hoverEffect) {
      case 'scale':
        return {
          initial: { scale: 1 },
          hover: { scale: current.scale }
        };
      case 'glow':
        return {
          initial: { 
            boxShadow: '0 0 0 rgba(var(--primary-rgb), 0)',
            scale: 1
          },
          hover: { 
            boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)',
            scale: 1.01
          }
        };
      case 'lift':
        return {
          initial: { 
            y: 0, 
            boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)',
          },
          hover: { 
            y: current.y, 
            boxShadow: current.shadow,
          }
        };
      case 'border':
        return {
          initial: {
            borderColor: 'rgba(var(--primary-rgb), 0.1)'
          },
          hover: {
            borderColor: 'rgba(var(--primary-rgb), 0.8)'
          }
        };
      case 'combined':
        return {
          initial: { 
            scale: 1,
            y: 0,
            boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(var(--primary-rgb), 0.1)'
          },
          hover: { 
            scale: current.scale * 0.8,
            y: current.y * 0.8,
            boxShadow: current.shadow,
            borderColor: 'rgba(var(--primary-rgb), 0.5)'
          }
        };
      default:
        return variants.hoverScale;
    }
  };

  return (
    <motion.div
      className={`transition-colors ${className}`}
      initial="initial"
      whileHover="hover"
      variants={getAnimationVariants()}
      transition={{
        type: 'tween',
        duration: durations[duration],
        ease: easings.easeOut
      }}
    >
      {children}
    </motion.div>
  );
}