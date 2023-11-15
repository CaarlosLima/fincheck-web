import { useContext } from 'react';

import { DashboardContext } from 'src/app/context/DashboardContext';

export function useDashboard() {
  return useContext(DashboardContext);
}
