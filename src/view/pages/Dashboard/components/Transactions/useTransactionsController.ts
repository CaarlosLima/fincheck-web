import { useEffect, useState } from 'react';

import { Transaction } from 'src/app/entities/Transactions';
import { useDashboard } from 'src/app/hooks/useDashboard';
import { useTransactions } from 'src/app/hooks/useTransactions';
import { TransactionsFilters } from 'src/app/services/transactionsService/getAll';

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null);

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

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
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
    transactionBeingEdited,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    filters,
    isLoading: isFetching,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    transactions,
  };
}
