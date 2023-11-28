import { PlusIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from 'src/view/components/DropdownMenu';
import { BankAccountIcon } from 'src/view/components/icons/BankAccountIcon';
import { CategoryIcon } from 'src/view/components/icons/categories/CategoryIcon';

export function Fab() {
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="text-white h-12 w-12 bg-teal-900 rounded-full flex items-center justify-center ">
            <PlusIcon className="h-6 w-6" />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-[297px]">
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
