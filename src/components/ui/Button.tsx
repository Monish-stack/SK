import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className, 
  ...props 
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 active:scale-95",
    ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95",
    outline: "bg-transparent border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2",
  };

  return (
    <button 
      className={twMerge(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
