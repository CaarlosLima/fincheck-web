import { httpClient } from '../httpClient';

export type CreateTransactionParams = {
  bankAccountId: string;
  categoryId: string;
  date: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;
};

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', params);

  return data;
}
