import { useMemo, useState } from 'react';

import { useBankAccounts } from 'src/app/hooks/useBankAccount';
import { useDashboard } from 'src/app/hooks/useDashboard';
import { useWindowWidth } from 'src/app/hooks/useWindowWidth';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(
    () =>
      accounts.reduce((total, account) => total + account.currentBalance, 0),
    [accounts],
  );

  return {
    accounts,
    areValuesVisible,
    isLoading: isFetching,
    setSliderState,
    currentBalance,
    sliderState,
    toggleValuesVisibility,
    openNewAccountModal,
    windowWidth,
  };
}
