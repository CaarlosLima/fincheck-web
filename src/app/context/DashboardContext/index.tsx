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
  openNewAccountModal(): void;
  toggleValuesVisibility(): void;
};

export const DashboardContext = createContext({} as DashboardContextType);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // TODO: Save value in localStorage
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

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

  const dashboardProviderValue = useMemo<DashboardContextType>(
    () => ({
      areValuesVisible,
      isNewAccountModalOpen,
      closeNewAccountModal,
      openNewAccountModal,
      toggleValuesVisibility,
    }),
    [
      areValuesVisible,
      closeNewAccountModal,
      isNewAccountModalOpen,
      openNewAccountModal,
      toggleValuesVisibility,
    ],
  );

  return (
    <DashboardContext.Provider value={dashboardProviderValue}>
      {children}
    </DashboardContext.Provider>
  );
}
