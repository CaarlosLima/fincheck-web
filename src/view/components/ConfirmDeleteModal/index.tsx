import { Button } from 'src/view/components//Button';
import { TrashIcon } from 'src/view/components/icons/TrashIcon';
import { Modal } from 'src/view/components/Modal';

type ConfirmDeleteModalProps = {
  onClose(): void;
  onConfirm(): void;
  title: string;

  description?: string;
  isLoading?: boolean;
};

export function ConfirmDeleteModal({
  title,
  description,
  onConfirm,
  onClose,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div>
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center ">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>

          <p className="text-gray-800 font-bold tracking-[-0.5px] w-[180px]">
            {title}
          </p>

          {description && (
            <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          disabled={isLoading}
          variant="ghost"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
