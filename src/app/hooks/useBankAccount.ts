import { useQuery } from '@tanstack/react-query';

import { backAccountsService } from 'src/app/services/bankAccountsService';

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: backAccountsService.getAll,
    staleTime: Infinity,
  });

  return { accounts: data ?? [], isFetching };
}
