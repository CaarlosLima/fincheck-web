import { ChevronDownIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from 'src/view/components/DropdownMenu';
import { ExpensesIcon } from 'src/view/components/icons/ExpensesIcon';
import { IncomeIcon } from 'src/view/components/icons/IncomeIcon';
import { TransactionsIcon } from 'src/view/components/icons/TransactionsIcon';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex items-center gap-2">
          <TransactionsIcon />

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transações
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[297px]">
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
