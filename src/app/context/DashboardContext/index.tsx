import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

type DashboardContextType = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  closeNewAccountModal(): void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  toggleValuesVisibility(): void;
};

export const DashboardContext = createContext({} as DashboardContextType);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // TODO: Save value in localStorage
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);

  // TODO: Create hook "useToggle"
  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);

    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);

    setIsNewTransactionModalOpen(false);
  }, []);

  const dashboardProviderValue = useMemo<DashboardContextType>(
    () => ({
      areValuesVisible,
      isNewAccountModalOpen,
      closeNewAccountModal,
      newTransactionType,
      openNewAccountModal,
      isNewTransactionModalOpen,
      closeNewTransactionModal,
      openNewTransactionModal,
      toggleValuesVisibility,
    }),
    [
      areValuesVisible,
      newTransactionType,
      closeNewAccountModal,
      isNewAccountModalOpen,
      openNewAccountModal,
      isNewTransactionModalOpen,
      closeNewTransactionModal,
      openNewTransactionModal,
      toggleValuesVisibility,
    ],
  );

  return (
    <DashboardContext.Provider value={dashboardProviderValue}>
      {children}
    </DashboardContext.Provider>
  );
}
