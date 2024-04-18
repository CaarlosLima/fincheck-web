import { Controller } from 'react-hook-form';

import { Button } from 'src/view/components/Button';
import { ColorsDropdownInput } from 'src/view/components/ColorsDropdownInput';
import { ConfirmDeleteModal } from 'src/view/components/ConfirmDeleteModal';
import { TrashIcon } from 'src/view/components/icons/TrashIcon';
import { Input } from 'src/view/components/Input';
import { InputCurrency } from 'src/view/components/InputCurrency';
import { Modal } from 'src/view/components/Modal';
import { Select } from 'src/view/components/Select';

import { useEditAccountModalController } from './useEditAccountModalController';

export function EditAccountModal() {
  const {
    control,
    isPending,
    isPendingDelete,
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteAccount,
    handleOpenDeleteModal,
    handleSubmit,
    register,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        isLoading={isPendingDelete}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
        recibo e despesas relacionadas."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button type="button" onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-700 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.type?.message}
                options={[
                  { label: 'Investimentos', value: 'INVESTMENT' },
                  { label: 'Conta Corrente', value: 'CHECKING' },
                  { label: 'Dinheiro Físico', value: 'CASH' },
                ]}
                onChange={onChange}
                placeHolder="Tipo"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button className="w-full mt-6" isLoading={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
