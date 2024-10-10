import { useEffect } from 'react';
import { useTask } from './context/task-context';
import TaskList from './components/task-list/task-list';
import TaskFilter from './components/task-filter/task-filter';
import { FILTER_VALUES, STORAGE_KEY } from './constants';

function App() {
  const { tasks, changeFilter } = useTask();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      changeFilter(FILTER_VALUES.all);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task App</h1>
      <button
        className="w-72 bg-cyan-500 text-white px-4 py-2 mb-4 rounded hover:bg-cyan-600"
        onClick={() => {}}
      >
        New task
      </button>
      <TaskFilter />
      {tasks.length ? <TaskList tasks={tasks} /> : <p>No Data</p>}
    </div>
  );
}

export default App;
