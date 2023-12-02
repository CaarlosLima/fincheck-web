import { ReactNode } from 'react';

import { PopoverContent } from './PopoverContent';
import { PopoverRoot } from './PopoverRoot';
import { PopoverTrigger } from './PopoverTrigger';

export type PopoverProps = { children: ReactNode; className?: string };

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
