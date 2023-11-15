import { ReactNode } from 'react';

import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuRoot } from './DropdownMenuRoot';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

export type DropdownMenuProps = { children: ReactNode; className?: string };

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
