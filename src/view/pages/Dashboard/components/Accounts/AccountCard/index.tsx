import { formatCurrency } from '../../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../../components/icons/BankAccountTypeIcon';

type AccountCardProps = {
  ballance: number;
  color: string;
  name: string;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
};

export function AccountCard({ ballance, color, name, type }: AccountCardProps) {
  return (
    <div
      className="bg-white rounded-2xl flex flex-col justify-between p-4 h-[200px] border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">
          {formatCurrency(ballance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo Atual</small>
      </div>
    </div>
  );
}
