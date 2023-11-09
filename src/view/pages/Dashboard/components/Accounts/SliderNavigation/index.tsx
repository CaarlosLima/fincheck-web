import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

type SliderNavigationProps = {
  isBeginning: boolean;
  isEnd: boolean;
};

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        type="button"
        className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        type="button"
        className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
