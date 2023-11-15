import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from 'src/app/utils/cn';

import { DropdownMenuProps } from '..';

type DropdownMenuItemProps = DropdownMenuProps & {
  onSelect?(): void;
};

export function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      className={cn(
        'min-h-[48px] outline-none flex items-center p-4 text-sm text-gray-800 rounded-2xl transition-colors cursor-pointer data-[highlighted]:bg-teal-50',
        className,
      )}
      onSelect={onSelect}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}
