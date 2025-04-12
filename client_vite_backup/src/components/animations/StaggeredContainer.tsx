import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type StaggeredContainerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
};

const containerVariants = (delay: number, staggerChildren: number) => ({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: delay
    }
  }
});

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

export default function StaggeredContainer({
  children,
  className = '',
  delay = 0.2,
  staggerChildren = 0.1
}: StaggeredContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants(delay, staggerChildren)}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}