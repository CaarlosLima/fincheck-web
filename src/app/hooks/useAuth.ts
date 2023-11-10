import { useContext } from 'react';

import { AuthContext } from 'src/app/context/Auth';

export function useAuth() {
  return useContext(AuthContext);
}
