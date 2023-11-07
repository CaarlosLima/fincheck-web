import { ComponentProps } from 'react';

import { cn } from '../../../app/utils/cn';

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
};

export function Button({
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
        className,
      )}
    />
  );
}
