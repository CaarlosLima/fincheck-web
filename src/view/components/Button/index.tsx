import { ComponentProps } from 'react';

import { cn } from '../../../app/utils/cn';
import { Spinner } from '../Spinner';

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
};

export function Button({
  children,
  className,
  disabled,
  isLoading,
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
        'bg-teal-900 px-6 h-12 rounded-2xl font-medium text-white transition-all hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        'flex items-center justify-center',
        className,
      )}
    >
      {!isLoading && children}

      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
