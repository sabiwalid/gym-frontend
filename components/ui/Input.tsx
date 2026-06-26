import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}

      <input
        {...props}
        className={`
          w-full rounded-lg border border-gray-300
          px-4 py-2 outline-none
          transition focus:border-lime-400
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
