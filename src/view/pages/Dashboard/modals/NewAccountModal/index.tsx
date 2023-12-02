import { Button } from 'src/view/components/Button';
import { ColorsDropdownInput } from 'src/view/components/ColorsDropdownInput';
import { Input } from 'src/view/components/Input';
import { InputCurrency } from 'src/view/components/InputCurrency';
import { Modal } from 'src/view/components/Modal';
import { Select } from 'src/view/components/Select';

import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form action="">
        <div>
          <span className="text-gray-700 tracking-[-0.5px] text-xs">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="initialBallance"
            placeholder="Nome da Conta"
          />

          <Select
            name="type"
            placeHolder="Tipo"
            options={[
              { label: 'Investimentos', value: 'INVESTMENT' },
              { label: 'Conta Corrente', value: 'CHECKING' },
              { label: 'Dinheiro Físico', value: 'CASH' },
            ]}
          />

          <ColorsDropdownInput />
        </div>

        <Button className="w-full mt-6">Criar</Button>
      </form>
    </Modal>
  );
}
