import { useState } from 'react';

import { useWindowWidth } from 'src/app/hooks/useWindowWidth';

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
  };
}
