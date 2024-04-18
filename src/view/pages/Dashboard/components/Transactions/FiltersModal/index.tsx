import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { cn } from 'src/app/utils/cn';
import { Button } from 'src/view/components/Button';
import { Modal } from 'src/view/components/Modal';

import { useFiltersModalController } from './useFiltersModalController';

type FiltersModalProps = {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: { year: number; bankAccountId?: string }): void;
};

export function FiltersModal({
  onApplyFilters,
  onClose,
  open,
}: FiltersModalProps) {
  const {
    accounts,
    handleChangeYear,
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
  } = useFiltersModalController();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {accounts.map(({ id, name }) => (
            <button
              key={id}
              className={cn(
                'text-gray-800 p-2 rounded-2xl text-left w-full hover:bg-gray-50 transition-colors',
                id === selectedBankAccountId && '!bg-gray-200',
              )}
              type="button"
              onClick={() => handleSelectBankAccount(id)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="text-gray-800 mt-10">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            type="button"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="text-center flex-1">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            className="w-12 h-12 flex items-center justify-center"
            type="button"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            year: selectedYear,
            bankAccountId: selectedBankAccountId,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
