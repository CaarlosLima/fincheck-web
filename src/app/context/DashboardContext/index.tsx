import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

type DashboardContextType = {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
};

export const DashboardContext = createContext({} as DashboardContextType);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // TODO: Save value in localStorage
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const dashboardProviderValue = useMemo<DashboardContextType>(
    () => ({ areValuesVisible, toggleValuesVisibility }),
    [areValuesVisible, toggleValuesVisibility],
  );

  return (
    <DashboardContext.Provider value={dashboardProviderValue}>
      {children}
    </DashboardContext.Provider>
  );
}
