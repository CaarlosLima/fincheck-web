import { httpClient } from '../httpClient';

export type BackAccountParams = {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
};

export async function create(params: BackAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}
