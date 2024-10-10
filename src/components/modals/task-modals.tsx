import { lazy, Suspense } from 'react';
import { MODAL_TYPES } from '../../constants/modal';
import { ModalType } from '../../context/modal-context';
import { Task } from '../../models/task';

const EditTaskModal = lazy(() => import('./add-edit-modal/edit-modal'));
const AddTaskModal = lazy(() => import('./add-edit-modal/add-modal'));
const ConfirmDeleteModal = lazy(() => import('./confirm-delete-modal'));

type TaskModalProps = {
  modalType: ModalType;
  onClose: () => void;
  modalData: Task | null;
};

function TaskModals({ modalType, modalData, onClose }: TaskModalProps) {
  switch (modalType) {
    case MODAL_TYPES.ADD:
      return (
        <Suspense>
          <AddTaskModal onClose={onClose} />
        </Suspense>
      );
    case MODAL_TYPES.EDIT:
      return (
        <Suspense>
          <EditTaskModal
            onClose={onClose}
            taskData={modalData!}
          />
        </Suspense>
      );
    case MODAL_TYPES.DELETE:
      return (
        <Suspense>
          <ConfirmDeleteModal
            onClose={onClose}
            taskData={modalData!}
          />
        </Suspense>
      );
    default:
      return <></>;
  }
}

export default TaskModals;
