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

import { localStorageKeys } from 'src/app/config/localStorageKeys';
import { User } from 'src/app/entities/User';
import { usersService } from 'src/app/services/usersService';
import { LaunchScreen } from 'src/view/components/LaunchScreen';

type AuthContextType = {
  signedIn: boolean;
  user: User | undefined;
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

  const { isError, isFetching, isSuccess, data } = useQuery({
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
    () => ({ signedIn: isSuccess && signedIn, signin, signout, user: data }),
    [isSuccess, signedIn, signin, signout, data],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
