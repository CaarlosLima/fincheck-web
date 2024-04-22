import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Transaction } from 'src/app/entities/Transactions';
import { useBankAccounts } from 'src/app/hooks/useBankAccount';
import { useCategories } from 'src/app/hooks/useCategories';
import { transactionsService } from 'src/app/services/transactionsService';
import { currencyStringToNumber } from 'src/app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([z.string().min(1, 'Informe o valor'), z.number()]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      categoryId: transaction?.category?.id ?? '',
      bankAccountId: transaction?.bankAccountId ?? '',
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: rootCategories } = useCategories();

  const transactionTypeName =
    transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita';

  const categories = useMemo(
    () =>
      rootCategories.filter((category) => category.type === transaction?.type),
    [rootCategories, transaction],
  );

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateTransacion } = useMutation({
    mutationFn: transactionsService.update,
  });

  const { isPending: isPendingDelete, mutateAsync: deleteTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      await updateTransacion({
        ...formData,
        id: transaction!.id,
        date: formData.date.toISOString(),
        type: transaction?.type!,
        // TODO: Call this function in transform in the zod schema
        value: currencyStringToNumber(formData.value),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      toast.success(`${transactionTypeName} cadastrada com sucesso!`);

      onClose();
    } catch (error) {
      toast.error(`Erro ao salvar a ${transactionTypeName.toLowerCase()}!`);
    }
  });

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      toast.success(`${transactionTypeName} foi deletada com sucesso!`);

      onClose();
    } catch (error) {
      toast.error(`Erro ao deletar a ${transactionTypeName.toLowerCase()}!`);
    }
  }

  return {
    accounts,
    isPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isPendingDelete,
    categories,
    handleDeleteTransaction,
    control,
    handleSubmit,
    errors,
    register,
  };
}
