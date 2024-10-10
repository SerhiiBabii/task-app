import { ChangeEvent } from 'react';
import { useTask } from '../../context/task-context';
import { TaskFilter as TaskFilterValue } from '../../models/filter';

function TaskFilter() {
  const { filter, changeFilter } = useTask();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    changeFilter(name as TaskFilterValue);
  };

  return (
    <div className="w-72">
      <div className="space-y-2 p-6  border border-slate-300 rounded-lg">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="all"
            checked={filter === 'all'}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 font-medium accent-cyan-600"
          />
          <span>All</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={filter === 'active'}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 font-medium accent-cyan-600"
          />
          <span className={filter === 'active' ? 'text-cyan-600' : ''}>
            Active
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={filter === 'completed'}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 font-medium accent-cyan-600"
          />
          <span className={filter === 'completed' ? 'text-cyan-600' : ''}>
            Completed
          </span>
        </label>
      </div>
    </div>
  );
}

export default TaskFilter;
