import { iconsMap } from './iconsMap';

type CategoryIconProps = {
  type: 'INCOME' | 'EXPENSE';
  category?: string;
};

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.EXPENSE | typeof iconsMap.INCOME)) ??
        'default'
    ] ?? iconsMap[type].default;

  return <Icon />;
}
