import { httpClient } from '../httpClient';

export type CreateBackAccountParams = {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
};

export async function create(params: CreateBackAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}
