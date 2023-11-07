import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export function Button({ type, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="bg-teal-900 px-6 h-12 rounded-2xl font-medium text-white cursor-not-allowed transition-all hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400"
    />
  );
}
