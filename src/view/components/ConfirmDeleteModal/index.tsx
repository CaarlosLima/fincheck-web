import { TrashIcon } from 'src/view/components/icons/TrashIcon';
import { Modal } from 'src/view/components/Modal';

type ConfirmDeleteModalProps = {
  onClose?(): void;
};

export function ConfirmDeleteModal({ onClose }: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div>
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center ">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </div>

          <p className="text-gray-800 font-bold tracking-[-0.5px] w-[180px]">
            Tem certeza que deseja excluir esta conta?
          </p>

          <p className="text-gray-800 tracking-[-0.5px]">
            Ao excluir a conta, também serão excluídos todos os registros de
            recibo e despesas relacionadas.
          </p>
        </div>
      </div>
    </Modal>
  );
}
