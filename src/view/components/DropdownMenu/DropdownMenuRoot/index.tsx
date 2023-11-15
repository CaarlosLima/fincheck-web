import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import { DropdownMenuProps } from '..';

type DropdownMenuRootProps = Omit<DropdownMenuProps, 'className'>;

export function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}
