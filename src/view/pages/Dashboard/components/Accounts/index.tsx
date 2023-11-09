import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '../../../../components/icons/EyeIcon';

import { AccountCard } from './AccountCard';
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';

import 'swiper/css';

export function Accounts() {
  const { sliderState, setSliderState, windowWidth } = useAccountsController();

  return (
    <div className="flex flex-col text-white bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <div>
        <span className="block tracking-[-0.5px]">Saldo Total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px]">R$ 1000,00</strong>

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center"
          >
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={
              (windowWidth >= 768 && windowWidth < 1100) || windowWidth < 500
                ? 1.1
                : 2.1
            }
            onSlideChange={({ isBeginning, isEnd }) =>
              setSliderState({ isBeginning, isEnd })
            }
            modules={[Autoplay]}
          >
            <div
              className="flex items-center justify-between mb-2"
              slot="container-start"
            >
              <strong className="tracking-[-1px] text-lg font-bold">
                Minhas Contas
              </strong>

              <SliderNavigation {...sliderState} />
            </div>

            <SwiperSlide>
              <AccountCard
                ballance={1000.55}
                color="#fa0"
                name="Inter"
                type="CHECKING"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                ballance={1000.55}
                color="#333"
                name="Inter Invest"
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                ballance={1000.55}
                color="#0f0"
                name="Carteira"
                type="CASH"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
