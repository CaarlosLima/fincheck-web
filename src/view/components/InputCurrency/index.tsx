import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className="text-[32px] tracking-[-1px] font-bold outline-none text-gray-800 w-full"
      defaultValue={0.0}
    />
  );
}
