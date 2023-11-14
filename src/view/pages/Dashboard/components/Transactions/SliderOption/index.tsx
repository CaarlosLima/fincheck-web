import { useSwiper } from 'swiper/react';

import { cn } from 'src/app/utils/cn';

type SliderOptionProps = {
  index: number;
  isActive: boolean;
  month: string;
};

export function SliderOption({ index, isActive, month }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={cn(
        'text-sm text-gray-800 tracking-[-0.5px] font-medium w-full rounded-full h-12',
        isActive && 'bg-white',
      )}
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  );
}
