import { useDashboard } from 'src/app/hooks/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return { areValuesVisible, isLoading: false };
}
