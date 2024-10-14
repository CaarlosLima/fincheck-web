/* eslint-disable import/no-duplicates */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

import { capitalizeFirstLetter } from 'src/app/utils/capitalizeFirstLetter';

type DatePickerProps = {
  value: Date;
  onChange(date: Date): void;
};

export function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        caption: 'flex items-center justify-between',
        nav: 'rdp-nav flex gap-1',
        chevron: 'rdp-chevron fill-teal-800',
        button_next: 'rdp-button_next !bg-transparent',
        button_previous: 'rdp-button_previous !bg-transparent',
        weekday: 'uppercase text-xs text-gray-500 font-medium pt-1 pb-2',
        today: 'bg-gray-100 font-bold text-gray-900',
        selected: '!bg-teal-900 text-white font-medium',
        day: 'hover:bg-teal-100 rounded-full',
        caption_label:
          'rdp-caption_label font-sans text-base text-gray-900 tracking-[-0.408px] font-medium',
      }}
      formatters={{
        formatCaption: (date, options) =>
          capitalizeFirstLetter(format(date, 'LLLL yyyy', options)),
      }}
    />
  );
}
