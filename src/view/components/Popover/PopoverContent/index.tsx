import * as RdxPopover from '@radix-ui/react-dropdown-menu';

import { cn } from 'src/app/utils/cn';

import { PopoverProps } from '..';

type PopoverContentProps = PopoverProps;

export function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.25)] z-[99]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}
