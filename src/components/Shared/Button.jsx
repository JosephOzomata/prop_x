import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500',
    secondary: 'bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-blue-900 hover:bg-blue-50 focus:ring-blue-500'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;