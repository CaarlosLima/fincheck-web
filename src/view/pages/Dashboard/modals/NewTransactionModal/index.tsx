import { Button } from 'src/view/components/Button';
import { DatePickerInput } from 'src/view/components/DatePickerInput';
import { Input } from 'src/view/components/Input';
import { InputCurrency } from 'src/view/components/InputCurrency';
import { Modal } from 'src/view/components/Modal';
import { Select } from 'src/view/components/Select';

import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
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
      <form action="">
        <div>
          <span className="text-gray-700 tracking-[-0.5px] text-xs">
            Valor da {checkType().toLowerCase()}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 tracking-[-0.5px] text-lg">R$</span>

            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="initialBallance"
            placeholder={`Nome da ${checkType()}`}
          />

          <Select
            name="category"
            placeHolder="Categoria"
            options={[
              { label: 'Investimentos', value: 'INVESTMENT' },
              { label: 'Conta Corrente', value: 'CHECKING' },
              { label: 'Dinheiro Físico', value: 'CASH' },
            ]}
          />

          <Select
            name="bankAccount"
            placeHolder={isExpense ? 'Pagar com' : 'Receber com'}
            options={[
              { label: 'Investimentos', value: 'INVESTMENT' },
              { label: 'Conta Corrente', value: 'CHECKING' },
              { label: 'Dinheiro Físico', value: 'CASH' },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button className="w-full mt-6">Criar</Button>
      </form>
    </Modal>
  );
}
