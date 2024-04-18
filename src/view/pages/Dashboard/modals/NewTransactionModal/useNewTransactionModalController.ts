import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useBankAccounts } from 'src/app/hooks/useBankAccount';
import { useCategories } from 'src/app/hooks/useCategories';
import { useDashboard } from 'src/app/hooks/useDashboard';
import { transactionsService } from 'src/app/services/transactionsService';
import { currencyStringToNumber } from 'src/app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

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

  const { accounts } = useBankAccounts();
  const { categories: rootCategories } = useCategories();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      await mutateAsync({
        ...formData,
        date: formData.date.toISOString(),
        type: newTransactionType!,
        // TODO: Call this function in transform in the zod schema
        value: currencyStringToNumber(formData.value),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      toast.success(
        `${
          newTransactionType === 'EXPENSE' ? 'Despesa' : 'Receita'
        } cadastrada com sucesso!`,
      );

      closeNewTransactionModal();

      reset({
        value: '0',
        name: '',
        categoryId: '',
        bankAccountId: '',
        date: new Date(),
      });
    } catch (error) {
      toast.error(
        `Erro ao cadastrar a ${
          newTransactionType === 'EXPENSE' ? 'despesa' : 'receita'
        }!`,
      );
    }
  });

  const categories = useMemo(
    () =>
      rootCategories.filter((category) => category.type === newTransactionType),
    [rootCategories, newTransactionType],
  );

  return {
    accounts,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    isPending,
    categories,
    newTransactionType,
    control,
    handleSubmit,
    errors,
    register,
  };
}
