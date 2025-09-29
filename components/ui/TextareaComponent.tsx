'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextareaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const TextareaComponent = React.forwardRef<HTMLTextAreaElement, TextareaComponentProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name || 'textarea-' + Math.random();

    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label
            htmlFor={textareaId}
            className="mb-1 block text-sm font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            className={`w-full text-sm px-4 py-3 rounded bg-white border transition focus:outline-none focus:ring-2 focus:ring-blue-900 ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <motion.p
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

TextareaComponent.displayName = 'TextareaComponent';

export default TextareaComponent;
