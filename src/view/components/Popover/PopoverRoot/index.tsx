import * as RdxPopover from '@radix-ui/react-dropdown-menu';

import { PopoverProps } from '..';

type PopoverRootProps = Omit<PopoverProps, 'className'>;

export function PopoverRoot({ children }: PopoverRootProps) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}
