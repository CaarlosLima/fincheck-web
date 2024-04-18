import { useState } from 'react';

import { cn } from 'src/app/utils/cn';
import { formatDate } from 'src/app/utils/formatDate';
import { Popover } from 'src/view/components/Popover';

import { DatePicker } from './DatePicker';

type DatePickerInputProps = {
  className?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

export function DatePickerInput({
  className,
  error,
  onChange,
  value,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChange(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            className={cn(
              'relative bg-white w-full rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left',
              error && '!border-red-900',
              className,
            )}
            type="button"
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChange} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
