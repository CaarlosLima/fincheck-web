import * as RdxPopover from '@radix-ui/react-dropdown-menu';

import { cn } from 'src/app/utils/cn';

import { PopoverProps } from '..';

type PopoverTriggerProps = PopoverProps & {};

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  return (
    <RdxPopover.Trigger className={cn('outline-none', className)} asChild>
      {children}
    </RdxPopover.Trigger>
  );
}
