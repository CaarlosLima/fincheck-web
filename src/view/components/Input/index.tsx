import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & {
  name: string;
};

export function Input({ id, name, placeholder, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
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
    </div>
  );
}
