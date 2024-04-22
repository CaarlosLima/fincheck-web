import { httpClient } from '../httpClient';

type UpdateTransactionParams = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  date: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;
};

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
