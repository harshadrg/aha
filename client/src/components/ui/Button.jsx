import React from 'react';

const Button = ({ children, className = '', variant = 'primary', size = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    outline: 'border border-neutral-700 hover:bg-neutral-800 text-white',
    ghost: 'hover:bg-neutral-800 text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
