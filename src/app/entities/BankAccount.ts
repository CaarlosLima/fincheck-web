export type BankAccount = {
  id: string;
  color: string;
  currentBalance: number;
  initialBalance: number;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
};
