import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({
  children,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center
        cursor-pointer
        rounded-lg bg-black px-4 py-2
        text-white transition
        hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
