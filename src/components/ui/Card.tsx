import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, animate = true, ...props }, ref) => {
    const Component = animate ? motion.div : 'div';
    
    return (
      <Component
        ref={ref as any}
        initial={animate ? { opacity: 0, y: 10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        className={twMerge(
          "bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
