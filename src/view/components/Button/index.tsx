import { ComponentProps } from 'react';

import { cn } from 'src/app/utils/cn';
import { Spinner } from 'src/view/components/Spinner';

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
};

export function Button({
  children,
  className,
  disabled,
  isLoading,
  variant,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'flex items-center justify-center bg-teal-900 px-6 h-12 rounded-2xl font-medium text-white transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        variant === 'danger' &&
          'bg-red-900 focus-visible:ring-red-800 hover:bg-red-800',
        variant === 'ghost' &&
          'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-100',
        className,
      )}
    >
      {!isLoading && children}

      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
