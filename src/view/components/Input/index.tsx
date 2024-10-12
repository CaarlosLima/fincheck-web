import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';

import { cn } from 'src/app/utils/cn';

export type InputProps = ComponentProps<'input'> & {
  name: string;

  error?: string;
  label?: string;
  labelClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, id, name, label, labelClassName, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="py-2 relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            'bg-white w-full rounded-lg border border-gray-500 px-3 py-2.5 text-sm h-10 text-gray-800 transition-all outline-none peer',
            'placeholder-shown:pt-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            'focus:border-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-teal-600',
            error && 'focus-visible:ring-red-800',
            className,
          )}
          id={inputId}
          name={name}
        />

        {label && (
          <label
            className={cn(
              'absolute top-0 left-0 -translate-y-5',
              'p-[2px] text-sm font-medium transition-all duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-disabled:text-gray-600',
              error && 'text-red-900',
              labelClassName,
            )}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}

        {error && (
          <div className="text-red-900 flex gap-2 items-center mt-2">
            <CrossCircledIcon />

            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
