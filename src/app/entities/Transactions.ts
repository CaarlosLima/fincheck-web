import { Category } from './Category';

export type Transaction = {
  id: string;
  date: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;

  bankAccountId?: string;
  category?: Category;
};
