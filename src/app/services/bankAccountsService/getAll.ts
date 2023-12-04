import { httpClient } from '../httpClient';

type BankAccountsResponse = Array<{
  id: string;
  color: string;
  currentBalance: number;
  initialBalance: number;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
