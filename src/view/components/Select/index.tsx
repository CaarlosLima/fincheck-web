import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import * as RdxSelect from '@radix-ui/react-select';
import { useState } from 'react';

import { cn } from 'src/app/utils/cn';

type SelectProps = {
  options: { label: string; value: string }[];

  className?: string;
  error?: string;
  placeHolder?: string;
  value?: string;
  onChange?(value: string): void;
};

export function Select({
  className,
  error,
  placeHolder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  // eslint-disable-next-line no-shadow
  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className={cn(
            'absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-700 z-[10]',
            selectedValue &&
              'text-xs left-[13px] top-2 transition-all -translate-y-0',
          )}
        >
          {placeHolder}
        </label>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'relative bg-white w-full rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white border border-gray-100 rounded-xl shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    className="p-2 text-gray-800 text-sm outline-none data-[state=checked]:font-bold data-[highlighted]:bg-gray-100 rounded-lg transition-colors"
                    value={option.value}
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>

                    <RdxSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center" />
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="text-red-900 flex gap-2 items-center mt-2">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
