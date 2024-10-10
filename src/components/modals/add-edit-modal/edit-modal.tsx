import { useTask } from '../../../context/task-context';
import { Task } from '../../../models/task';
import ModalBody from './modal-body';

type EditTaskModalProps = {
  onClose: () => void;
  taskData: Task;
};

function EditTaskModal({ onClose, taskData }: EditTaskModalProps) {
  const { handleEditTask } = useTask();

  return (
    <ModalBody
      taskData={taskData}
      onClose={onClose}
      onEdit={handleEditTask}
    />
  );
}

export default EditTaskModal;
