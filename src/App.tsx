import { lazy, Suspense, useEffect } from 'react';
import { useTask } from './context/task-context';
import { useModal } from './context/modal-context';
import TaskFilter from './components/task-filter';
import TaskModals from './components/modals/task-modals';
import { FILTER_VALUES, MODAL_TYPES, STORAGE_KEY } from './constants';

const TaskList = lazy(() => import('./components/task-list'));

function App() {
  const { tasks, handleChangeFilter } = useTask();
  const { isOpen, modalType, modalData, handleOpenModal, handleCloseModal } =
    useModal();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      handleChangeFilter(FILTER_VALUES.ALL);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task App</h1>
      <button
        className="w-72 bg-cyan-500 text-white px-4 py-2 mb-4 rounded hover:bg-cyan-600"
        onClick={() => handleOpenModal(MODAL_TYPES.ADD)}
      >
        New task
      </button>
      <TaskFilter />
      {tasks.length ? (
        <Suspense fallback={<p>Loading...</p>}>
          <TaskList tasks={tasks} />
        </Suspense>
      ) : (
        <p>No Data</p>
      )}
      {isOpen && modalType && (
        <TaskModals
          modalType={modalType!}
          modalData={modalData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
