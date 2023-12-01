import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';

import { cn } from 'src/app/utils/cn';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  title: string;

  className?: string;
  onClose?(): void;
  rightAction?: ReactNode;
};

export function Modal({
  children,
  className,
  onClose,
  open,
  rightAction,
  title,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
            ' data-[state=open]:animate-overlay-show',
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl w-full max-w-[400px] z-[51]',
            'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
            'data-[state=open]:animate-content-show',
            className,
          )}
        >
          <header className="text-gray-800 h-12 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-12 h-12 outline-none"
              type="button"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <span className="text-lg tracking-[-1px] font-bold">{title}</span>

            <div className="flex items-center justify-center w-12 h-12">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
