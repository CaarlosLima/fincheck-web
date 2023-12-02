import { useState } from 'react';

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

  return {
    accounts: [],
    areValuesVisible,
    isLoading: false,
    setSliderState,
    sliderState,
    toggleValuesVisibility,
    openNewAccountModal,
    windowWidth,
  };
}
