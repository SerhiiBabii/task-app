import React from 'react';
import { useTask } from '../../context/task-context';
import { Task } from '../../models/task';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  taskData: Task;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClose,
  taskData,
}) => {
  const { handleDeleteTask } = useTask();
  const onDeleteHandler = () => {
    handleDeleteTask(taskData.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Delete Task</h2>
          <button
            className="text-gray-500 hover:text-black"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <p className="mb-4">Are you sure you want to delete the task?</p>
        <p>This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={onDeleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
