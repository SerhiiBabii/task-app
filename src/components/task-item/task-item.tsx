import { MODAL_TYPES } from '../../constants';
import { useModal } from '../../context/modal-context';
import { useTask } from '../../context/task-context';
import { Task } from '../../models/task';

function TaskItem(taskData: Task) {
  const { id, title, description, isCompleted } = taskData;
  const { handleToggleComplete } = useTask();
  const { handleOpenModal } = useModal();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center animate-fadeIn">
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
        >
          {description}
        </p>
      </div>
      <div className="flex space-x-2 max-sm:flex-col max-sm:*:mb-2">
        <button
          className={`px-4 py-2 rounded-md ${
            isCompleted ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
          } hover:bg-opacity-80`}
          onClick={() => handleToggleComplete(id)}
        >
          {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          className={`px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ${
            taskData?.isCompleted ? 'cursor-not-allowed' : ''
          }`}
          disabled={taskData?.isCompleted}
          onClick={() => handleOpenModal(MODAL_TYPES.EDIT, taskData)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => handleOpenModal(MODAL_TYPES.DELETE, taskData)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
