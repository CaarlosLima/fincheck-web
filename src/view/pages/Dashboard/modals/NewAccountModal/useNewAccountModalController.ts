import { useDashboard } from 'src/app/hooks/useDashboard';

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return { isNewAccountModalOpen, closeNewAccountModal };
}
