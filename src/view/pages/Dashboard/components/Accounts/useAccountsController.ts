import { useState } from 'react';

import { useDashboard } from 'src/app/hooks/useDashboard';
import { useWindowWidth } from 'src/app/hooks/useWindowWidth';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    areValuesVisible,
    isLoading: false,
    setSliderState,
    sliderState,
    toggleValuesVisibility,
    windowWidth,
  };
}
