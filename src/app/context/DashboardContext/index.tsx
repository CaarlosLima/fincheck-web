import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { BankAccount } from 'src/app/entities/BankAccount';

type DashboardContextType = {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  closeNewAccountModal(): void;
  closeEditAccountModal(): void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openNewAccountModal(): void;
  openEditAccountModal(bankAccount: BankAccount): void;
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  toggleValuesVisibility(): void;
  accountBeingEdited: BankAccount | null;
};

export const DashboardContext = createContext({} as DashboardContextType);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // TODO: Save value in localStorage
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);
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

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
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
      isEditAccountModalOpen,
      closeNewAccountModal,
      closeEditAccountModal,
      newTransactionType,
      openNewAccountModal,
      openEditAccountModal,
      accountBeingEdited,
      isNewTransactionModalOpen,
      closeNewTransactionModal,
      openNewTransactionModal,
      toggleValuesVisibility,
    }),
    [
      areValuesVisible,
      isNewAccountModalOpen,
      isEditAccountModalOpen,
      closeNewAccountModal,
      closeEditAccountModal,
      newTransactionType,
      openNewAccountModal,
      openEditAccountModal,
      accountBeingEdited,
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
