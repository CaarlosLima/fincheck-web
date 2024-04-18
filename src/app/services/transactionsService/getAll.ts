import { Transactions } from 'src/app/entities/Transactions';
import { httpClient } from 'src/app/services/httpClient';

type TransactionsResponse = Array<Transactions>;

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transactions['type'];
};

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });

  return data;
}
