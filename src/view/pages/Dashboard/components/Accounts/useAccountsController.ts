import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useDashboard } from 'src/app/hooks/useDashboard';
import { useWindowWidth } from 'src/app/hooks/useWindowWidth';
import { backAccountsService } from 'src/app/services/bankAccountsService';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: backAccountsService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    accounts: data ?? [],
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
