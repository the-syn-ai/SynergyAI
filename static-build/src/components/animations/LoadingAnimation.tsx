import { motion } from 'framer-motion';

type LoadingAnimationProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  type?: 'spinner' | 'dots' | 'pulse';
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear'
    }
  }
};

const dotsVariants = {
  animate: {
    scale: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.6, 1, 0.6],
    transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: 'easeInOut'
    }
  }
};

export default function LoadingAnimation({
  className = '',
  size = 'md',
  color = 'primary',
  type = 'spinner'
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    white: 'text-white',
    dark: 'text-gray-800'
  };

  const sizes = sizeClasses[size];
  const colors = typeof color === 'string' && color in colorClasses ? colorClasses[color as keyof typeof colorClasses] : color;

  if (type === 'dots') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${sizes} ${colors}`}
            variants={dotsVariants}
            animate="animate"
            initial="animate"
            custom={i * 0.2}
            style={{
              background: 'currentColor',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <motion.div
        className={`${sizes} ${colors} ${className} rounded-full`}
        style={{ background: 'currentColor' }}
        variants={pulseVariants}
        animate="animate"
        initial="animate"
      />
    );
  }

  // Default spinner
  return (
    <motion.div
      className={`${sizes} ${colors} ${className}`}
      style={{
        borderRadius: '50%',
        borderTop: '3px solid currentColor',
        borderRight: '3px solid transparent',
        borderBottom: '3px solid currentColor',
        borderLeft: '3px solid transparent'
      }}
      variants={spinnerVariants}
      animate="animate"
      initial="animate"
    />
  );
}