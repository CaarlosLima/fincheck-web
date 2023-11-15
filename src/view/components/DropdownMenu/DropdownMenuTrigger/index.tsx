import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from 'src/app/utils/cn';

import { DropdownMenuProps } from '..';

type DropdownMenuTriggerProps = DropdownMenuProps & {};

export function DropdownMenuTrigger({
  children,
  className,
}: DropdownMenuTriggerProps) {
  return (
    <RdxDropdownMenu.Trigger className={cn('outline-none', className)}>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
