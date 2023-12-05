import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

import { cn } from 'src/app/utils/cn';

type InputCurrencyProps = {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
};

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'text-[32px] tracking-[-1px] font-bold outline-none text-gray-800 w-full',
          error && '!border-red-900',
        )}
      />

      {error && (
        <div className="text-red-900 flex gap-2 items-center mt-2">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
