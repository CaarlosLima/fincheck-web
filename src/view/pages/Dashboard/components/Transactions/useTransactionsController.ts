import { useEffect, useState } from 'react';

import { useDashboard } from 'src/app/hooks/useDashboard';
import { useTransactions } from 'src/app/hooks/useTransactions';
import { TransactionsFilters } from 'src/app/services/transactionsService/getAll';

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { areValuesVisible } = useDashboard();
  const { transactions, isFetching, isLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleOpenFiltersModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFilterModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({ ...prevState, [filter]: value }));
    };
  }

  function handleApplyFilters({
    year,
    bankAccountId,
  }: {
    year: number;
    bankAccountId?: string;
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    handleCloseFiltersModal();
  }

  return {
    areValuesVisible,
    isFilterModalOpen,
    handleApplyFilters,
    isInitialLoading: isLoading,
    handleChangeFilters,
    filters,
    isLoading: isFetching,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    transactions,
  };
}
