import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Task } from '../../../models/task';

type ModalBodyProps = {
  onClose: () => void;
  taskData?: Task;
  onSave?: (task: Task) => void;
  onEdit?: (task: Task) => void;
};

function ModalBody({ taskData, onClose, onSave, onEdit }: ModalBodyProps) {
  const [description, setDescription] = useState(taskData?.description ?? '');
  const [errors, setErrors] = useState({
    description: false,
  });
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const isEditMode = !!taskData?.id;

  useEffect(() => {
    if (descriptionInputRef.current) {
      descriptionInputRef.current?.focus();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {
      description: !description.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (isEditMode) {
      onEdit!({
        id: taskData!.id,
        description,
        isCompleted: taskData!.isCompleted,
      });
    } else {
      onSave!({ id: nanoid(), description, isCompleted: false });
    }

    setDescription('');
    onClose();
  };

  const changeDescriptionHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setErrors((prevState) => ({ ...prevState, description: false }));
    setDescription(event.target.value);
  };

  return (
    <div className="dialog-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditMode ? 'Edit task' : 'Add task'}
          </h2>
          <button
            className="text-gray-500 hover:text-black"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              ref={descriptionInputRef}
              id="description"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              value={description}
              onChange={changeDescriptionHandler}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
            >
              {isEditMode ? 'Edit' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalBody;
