import { PlusIcon } from '@radix-ui/react-icons';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from 'src/app/utils/cn';
import { formatCurrency } from 'src/app/utils/formatCurrency';
import { EyeIcon } from 'src/view/components/icons/EyeIcon';
import { Spinner } from 'src/view/components/Spinner';

import { AccountCard } from './AccountCard';
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';

import 'swiper/css';

export function Accounts() {
  const {
    accounts,
    areValuesVisible,
    isLoading,
    sliderState,
    setSliderState,
    currentBalance,
    toggleValuesVisibility,
    openNewAccountModal,
    windowWidth,
  } = useAccountsController();

  return (
    <div className="flex flex-col text-white bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white h-12 w-12" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="block tracking-[-0.5px]">Saldo Total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px]',
                  !areValuesVisible && 'blur-md',
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
                title="Mostrar valores"
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-2" slot="container-start">
                  <strong className="tracking-[-1px] text-lg font-bold">
                    Minhas Contas
                  </strong>
                </div>

                <button
                  className="h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4"
                  type="button"
                  onClick={openNewAccountModal}
                >
                  <div className="flex items-center justify-center rounded-full border-2 border-dashed border-white h-11 w-11">
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={
                    (windowWidth >= 768 && windowWidth < 1100) ||
                    windowWidth < 500
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

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        ballance={account.currentBalance}
                        color={account.color}
                        name={account.name}
                        type={account.type}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
