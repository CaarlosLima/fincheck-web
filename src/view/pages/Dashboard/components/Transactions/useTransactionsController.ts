import { useState } from 'react';

import { useDashboard } from 'src/app/hooks/useDashboard';

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { areValuesVisible } = useDashboard();

  function handleOpenFiltersModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFilterModalOpen(false);
  }

  return {
    areValuesVisible,
    isFilterModalOpen,
    isInitialLoading: false,
    isLoading: false,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    transactions: [],
  };
}
