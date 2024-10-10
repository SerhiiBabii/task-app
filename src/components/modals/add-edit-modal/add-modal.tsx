import { useTask } from '../../../context/task-context';
import ModalBody from './modal-body';

type AddTaskModalProps = {
  onClose: () => void;
};

function AddTaskModal({ onClose }: AddTaskModalProps) {
  const { createTask } = useTask();

  return (
    <ModalBody
      onClose={onClose}
      onSave={createTask}
    />
  );
}

export default AddTaskModal;
