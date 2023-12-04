import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useDashboard } from 'src/app/hooks/useDashboard';
import { backAccountsService } from 'src/app/services/bankAccountsService';
import { currencyStringToNumber } from 'src/app/utils/currencyStringToNumber';

const schema = z.object({
  color: z.string().min(1, 'Cor é obrigatória'),
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: backAccountsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      await mutateAsync({
        ...formData,
        // TODO: Call this function in transform in the zod schema
        initialBalance: currencyStringToNumber(formData.initialBalance),
      });

      toast.success('Conta foi cadastrada com sucesso!');

      closeNewAccountModal();

      reset();

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    } catch (error) {
      toast.error('Erro ao cadastrar a conta!');
    }
  });

  return {
    control,
    isPending,
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
  };
}
