import { useTask } from './context/task-context';
import TaskList from './components/task-list/task-list';
import './App.css';

function App() {
  const { tasks } = useTask();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task App</h1>
      <button
        className="w-72 bg-cyan-500 text-white px-4 py-2 mb-4 rounded hover:bg-cyan-600"
        onClick={() => {}}
      >
        New task
      </button>
      {tasks.length ? <TaskList tasks={tasks} /> : <p>No Data</p>}
    </div>
  );
}

export default App;
