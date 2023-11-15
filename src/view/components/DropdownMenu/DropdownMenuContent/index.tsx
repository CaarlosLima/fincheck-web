import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from 'src/app/utils/cn';

import { DropdownMenuProps } from '..';

type DropdownMenuContentProps = DropdownMenuProps & {
  showArrow?: boolean;
};

export function DropdownMenuContent({
  children,
  className,
  showArrow = false,
}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.25)] data-[side=bottom]:animate-slide-up-and-fade z-50',
          className,
        )}
        sideOffset={2}
      >
        {showArrow && <RdxDropdownMenu.Arrow className="fill-white" />}

        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}
