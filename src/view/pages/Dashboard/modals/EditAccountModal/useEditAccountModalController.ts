import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useDashboard } from 'src/app/hooks/useDashboard';
import { backAccountsService } from 'src/app/services/bankAccountsService';
import { currencyStringToNumber } from 'src/app/utils/currencyStringToNumber';

const schema = z.object({
  color: z.string().min(1, 'Cor é obrigatória'),
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: backAccountsService.update,
  });

  const { isPending: isPendingDelete, mutateAsync: deleteAccount } =
    useMutation({
      mutationFn: backAccountsService.remove,
    });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      await updateAccount({
        ...formData,
        // TODO: Call this function in transform in the zod schema
        initialBalance: currencyStringToNumber(formData.initialBalance),
        id: accountBeingEdited!.id,
      });

      toast.success('Conta foi editada com sucesso!');

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success('Conta foi deletada com sucesso!');

      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao deletar a conta!');
    }
  }

  return {
    control,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isPending,
    isPendingDelete,
    isDeleteModalOpen,
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
  };
}
