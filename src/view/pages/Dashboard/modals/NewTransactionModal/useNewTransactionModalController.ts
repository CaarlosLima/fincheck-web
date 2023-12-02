import { useDashboard } from 'src/app/hooks/useDashboard';

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  };
}
