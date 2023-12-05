import { BankAccount } from 'src/app/entities/BankAccount';
import { httpClient } from 'src/app/services/httpClient';

type BankAccountsResponse = Array<BankAccount>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
