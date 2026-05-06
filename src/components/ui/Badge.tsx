import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    error: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  };

  return (
    <span className={twMerge(
      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
