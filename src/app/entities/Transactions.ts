import { Category } from './Category';

export type Transactions = {
  id: string;
  date: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;

  category?: Category;
};
