import { Controller } from 'react-hook-form';

import { Button } from 'src/view/components/Button';
import { DatePickerInput } from 'src/view/components/DatePickerInput';
import { Input } from 'src/view/components/Input';
import { InputCurrency } from 'src/view/components/InputCurrency';
import { Modal } from 'src/view/components/Modal';
import { Select } from 'src/view/components/Select';

import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    accounts,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    categories,
    control,
    isPending,
    errors,
    handleSubmit,
    register,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  function checkType() {
    if (isExpense) {
      return 'Despesa';
    }

    return 'Receita';
  }

  return (
    <Modal
      title={`Nova ${checkType()}`}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-700 tracking-[-0.5px] text-xs">
            Valor da {checkType().toLowerCase()}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder={`Nome da ${checkType()}`}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeHolder="Categoria"
                value={value}
                error={errors.categoryId?.message}
                onChange={onChange}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeHolder={isExpense ? 'Pagar com' : 'Receber com'}
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                options={accounts.map((account) => ({
                  label: account.name,
                  value: account.id,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button className="w-full mt-6" isLoading={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
