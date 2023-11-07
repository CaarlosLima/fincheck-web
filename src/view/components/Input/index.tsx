import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '../../../app/utils/cn';

type InputProps = ComponentProps<'input'> & {
  name: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, id, name, placeholder, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
            error && '!border-red-900',
            className,
          )}
          id={inputId}
          name={name}
          placeholder=" "
        />

        <label
          // className="absolute left-3.5 top-3.5 pointer-events-none text-gray-700"
          className="absolute text-xs left-3.5 top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
          htmlFor={inputId}
        >
          {placeholder}
        </label>

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
