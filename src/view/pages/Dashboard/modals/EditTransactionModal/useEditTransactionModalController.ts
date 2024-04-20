import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useBankAccounts } from 'src/app/hooks/useBankAccount';
import { useCategories } from 'src/app/hooks/useCategories';

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transactionType: 'EXPENSE' | 'INCOME',
) {
  const {
    control,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { accounts } = useBankAccounts();
  const { categories: rootCategories } = useCategories();

  const categories = useMemo(
    () =>
      rootCategories.filter((category) => category.type === transactionType),
    [rootCategories, transactionType],
  );

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    console.log(formData);
  });

  return {
    accounts,
    isPending: false,
    categories,
    control,
    handleSubmit,
    errors,
    register,
  };
}
