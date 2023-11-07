import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { localStorageKeys } from '../../config/localStorageKeys';

type AuthContextType = {
  signedIn: boolean;
  signin: (accessToken: string) => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const authProviderValue = useMemo<AuthContextType>(
    () => ({ signedIn, signin }),
    [signedIn, signin],
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}
