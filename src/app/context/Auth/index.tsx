import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { LaunchScreen } from '../../../view/components/LaunchScreen';
import { localStorageKeys } from '../../config/localStorageKeys';
import { usersService } from '../../services/usersService';

type AuthContextType = {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    queryClient.removeQueries({ queryKey: ['users', 'me'], exact: true });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');

      signout();
    }
  }, [isError, signout]);

  const authProviderValue = useMemo<AuthContextType>(
    () => ({ signedIn: isSuccess && signedIn, signin, signout }),
    [isSuccess, signedIn, signin, signout],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
