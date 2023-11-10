import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'src/app/hooks/useAuth';

type AuthGuardProps = {
  isPrivate?: boolean;
};

export function AuthGuard({ isPrivate = false }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
