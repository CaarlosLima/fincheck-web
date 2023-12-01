import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from 'src/app/config/constants/months';
import { cn } from 'src/app/utils/cn';
import { formatCurrency } from 'src/app/utils/formatCurrency';
import emptyStateImage from 'src/assets/empty-state.svg';
import { CategoryIcon } from 'src/view/components/icons/categories/CategoryIcon';
import { FilterIcon } from 'src/view/components/icons/FilterIcon';
import { Spinner } from 'src/view/components/Spinner';

import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    areValuesVisible,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFilterModalOpen,
    isInitialLoading,
    isLoading,
    transactions,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button type="button" onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <Spinner className="h-12 w-12" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <img src={emptyStateImage} alt="Empty state" />

                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">12/12/2002</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-red-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    {formatCurrency(-1000)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">12/12/2002</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-green-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    {formatCurrency(1500)}
                  </span>
                </div>
              </>
            )}
          </div>

          <FiltersModal
            open={isFilterModalOpen}
            onClose={handleCloseFiltersModal}
          />
        </>
      )}
    </div>
  );
}
