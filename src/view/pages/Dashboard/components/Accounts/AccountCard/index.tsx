import { BankAccount } from 'src/app/entities/BankAccount';
import { useDashboard } from 'src/app/hooks/useDashboard';
import { cn } from 'src/app/utils/cn';
import { formatCurrency } from 'src/app/utils/formatCurrency';
import { BankAccountTypeIcon } from 'src/view/components/icons/BankAccountTypeIcon';

type AccountCardProps = BankAccount;

export function AccountCard(backAccount: AccountCardProps) {
  const { color, currentBalance, name, type } = backAccount;

  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <button
      className="bg-white rounded-2xl flex flex-col justify-between p-4 h-[200px] border-b-4 border-teal-950 w-full"
      style={{ borderColor: color }}
      type="button"
      onClick={() => openEditAccountModal(backAccount)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !areValuesVisible && 'blur-sm',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </button>
  );
}
