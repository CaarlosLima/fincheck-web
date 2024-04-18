import { useQuery } from '@tanstack/react-query';

import { transactionsService } from 'src/app/services/transactionsService';
import { TransactionsFilters } from 'src/app/services/transactionsService/getAll';

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  return { transactions: data ?? [], isFetching, isLoading, refetch };
}
